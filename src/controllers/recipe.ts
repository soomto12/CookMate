import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { generateRecipe } from "../services/recipeGeneration";

const normalize = (name: string) => name.trim().toLowerCase();

export const listRecipesHandler = async (req: Request, res: Response) => {
  try {
    const recipes = await prisma.recipe.findMany({
      where: { createdById: req.userId },
      orderBy: { createdAt: "desc" },
      include: {
        ingredients: true,
        steps: { orderBy: { order: "asc" } },
        shoppingLists: { include: { items: true } },
      },
    });

    return res.status(200).json({ recipes });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch recipes" });
  }
};

export const generateRecipeHandler = async (req: Request, res: Response) => {
  const { mealName, availableIngredients, excludeCommonAllergens, quickMealOnly } = req.body;

  try {
    const generated = await generateRecipe(mealName, availableIngredients, {
      excludeCommonAllergens,
      quickMealOnly,
    });

    const availableSet = new Set(availableIngredients.map(normalize));
    const missingIngredients = generated.ingredients.filter(
      (ingredient) => !availableSet.has(normalize(ingredient.name)),
    );

    const recipe = await prisma.$transaction(async (tx) => {
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
            userId: req.userId as string,
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
    }, { maxWait: 10_000, timeout: 15_000 });

    return res.status(201).json({ recipe });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to generate recipe" });
  }
};
