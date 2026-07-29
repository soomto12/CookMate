"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRecipeHandler = exports.listRecipesHandler = void 0;
const prisma_1 = require("../lib/prisma");
const recipeGeneration_1 = require("../services/recipeGeneration");
const normalize = (name) => name.trim().toLowerCase();
const listRecipesHandler = async (req, res) => {
    try {
        const recipes = await prisma_1.prisma.recipe.findMany({
            where: { createdById: req.userId },
            orderBy: { createdAt: "desc" },
            include: {
                ingredients: true,
                steps: { orderBy: { order: "asc" } },
                shoppingLists: { include: { items: true } },
            },
        });
        return res.status(200).json({ recipes });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to fetch recipes" });
    }
};
exports.listRecipesHandler = listRecipesHandler;
const generateRecipeHandler = async (req, res) => {
    const { mealName, availableIngredients } = req.body;
    if (typeof mealName !== "string" || mealName.trim().length === 0) {
        return res.status(400).json({ error: "mealName is required" });
    }
    if (!Array.isArray(availableIngredients) ||
        !availableIngredients.every((item) => typeof item === "string")) {
        return res.status(400).json({ error: "availableIngredients must be an array of strings" });
    }
    try {
        const generated = await (0, recipeGeneration_1.generateRecipe)(mealName, availableIngredients);
        const availableSet = new Set(availableIngredients.map(normalize));
        const missingIngredients = generated.ingredients.filter((ingredient) => !availableSet.has(normalize(ingredient.name)));
        const recipe = await prisma_1.prisma.$transaction(async (tx) => {
            const created = await tx.recipe.create({
                data: {
                    title: generated.title,
                    description: generated.description,
                    cuisine: generated.cuisine,
                    servings: generated.servings,
                    cookTimeMinutes: generated.cookTimeMinutes,
                    difficulty: generated.difficulty,
                    createdById: req.userId,
                    ingredients: {
                        create: generated.ingredients.map((ingredient) => ({
                            name: normalize(ingredient.name),
                            quantity: ingredient.quantity,
                            unit: ingredient.unit,
                        })),
                    },
                    steps: {
                        create: generated.steps.map((instruction, index) => ({
                            order: index + 1,
                            instruction,
                        })),
                    },
                },
            });
            if (missingIngredients.length > 0) {
                await tx.shoppingList.create({
                    data: {
                        userId: req.userId,
                        recipeId: created.id,
                        items: {
                            create: missingIngredients.map((ingredient) => ({
                                name: normalize(ingredient.name),
                                quantity: ingredient.quantity,
                                unit: ingredient.unit,
                            })),
                        },
                    },
                });
            }
            return tx.recipe.findUniqueOrThrow({
                where: { id: created.id },
                include: {
                    ingredients: true,
                    steps: { orderBy: { order: "asc" } },
                    shoppingLists: { include: { items: true } },
                },
            });
        }, { maxWait: 10000, timeout: 15000 });
        return res.status(201).json({ recipe });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to generate recipe" });
    }
};
exports.generateRecipeHandler = generateRecipeHandler;
//# sourceMappingURL=recipe.js.map