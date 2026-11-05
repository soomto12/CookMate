"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.suggestMealsHandler = exports.generateIngredientsHandler = exports.generateRecipeHandler = exports.listRecipesHandler = void 0;
const prisma_1 = require("./lib/prisma");
const recipeGeneration_1 = require("../services/recipeGeneration");
const unsplash_1 = require("../services/unsplash");
const normalize = (name) => name.trim().toLowerCase();
const listRecipesHandler = async (req, res, next) => {
    try {
        const user = await prisma_1.prisma.user.findUnique({ where: { id: req.userId }, select: { id: true } });
        if (!user) {
            return res.status(404).json({ error: "user does not exist" });
        }
        const userId = user.id;
        const recipes = await prisma_1.prisma.recipe.findMany({
            where: { createdById: userId },
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
        return next(err);
    }
};
exports.listRecipesHandler = listRecipesHandler;
const generateRecipeHandler = async (req, res, next) => {
    const { mealName, availableIngredients = [], excludeCommonAllergens, quickMealOnly } = req.body;
    try {
        const user = await prisma_1.prisma.user.findUnique({ where: { id: req.userId }, select: { id: true } });
        if (!user) {
            return res.status(404).json({ error: "user does not exist" });
        }
        const userId = user.id;
        const generated = await (0, recipeGeneration_1.generateRecipe)(mealName, availableIngredients, userId, {
            excludeCommonAllergens,
            quickMealOnly,
        });
        const availableSet = new Set(availableIngredients.map(normalize));
        const missingIngredients = generated.ingredients.filter((ingredient) => !availableSet.has(normalize(ingredient.name)));
        // Resolved before the transaction so the Unsplash call can't hold it open.
        const image = await (0, unsplash_1.findRecipeImage)(generated.title);
        const recipe = await prisma_1.prisma.$transaction(async (tx) => {
            const created = await tx.recipe.create({
                data: {
                    imageUrl: image?.imageUrl ?? null,
                    imageCredit: image?.imageCredit ?? null,
                    imageCreditUrl: image?.imageCreditUrl ?? null,
                    title: generated.title,
                    description: generated.description,
                    cuisine: generated.cuisine,
                    servings: generated.servings,
                    cookTimeMinutes: generated.cookTimeMinutes,
                    difficulty: generated.difficulty,
                    createdById: userId,
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
                        userId,
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
        return next(err);
    }
};
exports.generateRecipeHandler = generateRecipeHandler;
// Returns the full ingredient list for a meal. Nothing is saved.
const generateIngredientsHandler = async (req, res, next) => {
    const { mealName } = req.body;
    try {
        const user = await prisma_1.prisma.user.findUnique({ where: { id: req.userId }, select: { id: true } });
        if (!user) {
            return res.status(404).json({ error: "user does not exist" });
        }
        const ingredients = await (0, recipeGeneration_1.generateIngredients)(mealName);
        return res.status(200).json({ mealName, ingredients });
    }
    catch (err) {
        return next(err);
    }
};
exports.generateIngredientsHandler = generateIngredientsHandler;
// Suggests meal names (just an array of strings, no recipes) from the user's ingredients.
const suggestMealsHandler = async (req, res, next) => {
    const { availableIngredients = [] } = req.body;
    try {
        const user = await prisma_1.prisma.user.findUnique({ where: { id: req.userId }, select: { id: true } });
        if (!user) {
            return res.status(404).json({ error: "user does not exist" });
        }
        const mealNames = await (0, recipeGeneration_1.suggestMeals)(availableIngredients);
        const meals = await Promise.all(mealNames.map(async (name) => {
            const image = await (0, unsplash_1.findRecipeImage)(name);
            return {
                name,
                imageUrl: image?.imageUrl ?? null,
                imageCredit: image?.imageCredit ?? null,
                imageCreditUrl: image?.imageCreditUrl ?? null,
            };
        }));
        return res.status(200).json({ meals });
    }
    catch (err) {
        return next(err);
    }
};
exports.suggestMealsHandler = suggestMealsHandler;
//# sourceMappingURL=recipe.js.map