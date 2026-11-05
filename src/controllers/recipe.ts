import { NextFunction, Request, Response } from "express";
import { prisma } from "./lib/prisma";
import { generateIngredients, generateRecipe, suggestMeals } from "../services/recipeGeneration";
import { findRecipeImage } from "../services/unsplash";

const normalize = (name: string) => name.trim().toLowerCase();

export const listRecipesHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.userId }, select: { id: true } });
    if (!user) {
      return res.status(404).json({ error: "user does not exist" });
    }
    const userId = user.id;

    const recipes = await prisma.recipe.findMany({
      where: { createdById: userId },
      orderBy: { createdAt: "desc" },
      include: {
        ingredients: true,
        steps: { orderBy: { order: "asc" } },
        shoppingLists: { include: { items: true } },
      },
    });

    return res.status(200).json({ recipes });
  } catch (err) {
    return next(err);
  }
};

export const generateRecipeHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { mealName, availableIngredients = [], excludeCommonAllergens, quickMealOnly } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { id: req.userId }, select: { id: true } });
    if (!user) {
      return res.status(404).json({ error: "user does not exist" });
    }
    const userId = user.id;

    const generated = await generateRecipe(mealName, availableIngredients, userId, {
      excludeCommonAllergens,
      quickMealOnly,
    });

    const availableSet = new Set(availableIngredients.map(normalize));
    const missingIngredients = generated.ingredients.filter(
      (ingredient) => !availableSet.has(normalize(ingredient.name)),
    );

    // Resolved before the transaction so the Unsplash call can't hold it open.
    const image = await findRecipeImage(generated.title);

    const recipe = await prisma.$transaction(async (tx) => {
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
    }, { maxWait: 10_000, timeout: 15_000 });

    return res.status(201).json({ recipe });
  } catch (err) {
    return next(err);
  }
};

// Returns the full ingredient list for a meal. Nothing is saved.
export const generateIngredientsHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { mealName } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { id: req.userId }, select: { id: true } });
    if (!user) {
      return res.status(404).json({ error: "user does not exist" });
    }

    const ingredients = await generateIngredients(mealName);

    return res.status(200).json({ mealName, ingredients });
  } catch (err) {
    return next(err);
  }
};

// Suggests meal names (just an array of strings, no recipes) from the user's ingredients.
export const suggestMealsHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { availableIngredients = [] } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { id: req.userId }, select: { id: true } });
    if (!user) {
      return res.status(404).json({ error: "user does not exist" });
    }

    const mealNames = await suggestMeals(availableIngredients);

    const meals = await Promise.all(
      mealNames.map(async (name) => {
        const image = await findRecipeImage(name);
        return {
          name,
          imageUrl: image?.imageUrl ?? null,
          imageCredit: image?.imageCredit ?? null,
          imageCreditUrl: image?.imageCreditUrl ?? null,
        };
      }),
    );

    return res.status(200).json({ meals });
  } catch (err) {
    return next(err);
  }
};
