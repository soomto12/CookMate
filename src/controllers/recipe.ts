import { NextFunction, Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { generateRecipe, suggestMeals } from "../services/recipeGeneration";

const normalize = (name: string) => name.trim().toLowerCase();

export const listRecipesHandler = async (req: Request, res: Response, next: NextFunction) => {
  const user =  await prisma.user.findUnique({ where: { id: req.userId}})
   if(!user){
    return res.status(404).json( {message: "user not found"})

   }
  try {
    const recipes = await prisma.recipe.findMany({
      where: { createdById: user?.id},
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
  const { mealName, availableIngredients, excludeCommonAllergens, quickMealOnly } = req.body;

   const user =  await prisma.user.findUnique({ where: { id: req.userId}})
   if(!user){
    return res.status(404).json( {message: "user not found"})

   }

  try {
    const generated = await generateRecipe(mealName,  availableIngredients,  user?.id ,{
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
            userId: user?.id as string,
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

// Suggests meal names (just an array of strings, no recipes) from the user's ingredients.
export const suggestMealsHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { availableIngredients, quickMealOnly } = req.body;

  try {
    const allergen = await prisma.allergen.findUnique({
      where: { userId: req.userId },
      include: { foods: true },
    });

    const meals = await suggestMeals(availableIngredients, {
      allergens: allergen?.foods.map((food) => food.name) ?? [],
      quickMealOnly,
    });

    return res.status(200).json({ meals });
  } catch (err) {
    return next(err);
  }
};
