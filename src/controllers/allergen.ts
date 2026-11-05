import { NextFunction, Request, Response } from "express";
import { prisma } from "./lib/prisma";



const normalize = (name: string) => name.trim().toLowerCase();

const allergenFoods = { foods: { orderBy: { name: "asc" as const } } };

// The foods the logged-in user is allergic to.
export const listAllergensHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await prisma.user.findUnique({where: { id: req.userId}})
    if (!user){
       return res.status(404).json({error: "user does not exist"})

    }
    const allergen = await prisma.allergen.findUnique({
      where: { userId: user.id as string },
      include: allergenFoods,
    });
    return res.status(200).json({ foods: allergen?.foods ?? [] });
  } catch (err) {
    return next(err);
  }
};

// Adds a list of foods (by name) to the user's allergen list, creating the list
// and any foods that don't exist yet. Foods already on the list are left as they are.
export const addAllergensHandler = async (req: Request, res: Response, next: NextFunction) => {
    const user = await prisma.user.findUnique({where: { id: req.userId}})
    if (!user){
       return res.status(404).json({error: "user does not exists"})

    }
  const userId = user.id as string;
  const names = [...new Set<string>(req.body.allergens.map(normalize))];
  const foods = {
    connectOrCreate: names.map((name) => ({ where: { name }, create: { name } })),
  };

  try {
    const allergen = await prisma.allergen.upsert({
      where: { userId },
      update: { foods },
      create: { userId, foods },
      include: allergenFoods,
    });
    return res.status(201).json({allergens : allergen.foods });
  } catch (err) {
    return next(err);
  }
};

export const removeAllergenHandler = async (req: Request, res: Response, next: NextFunction) => {
    const user = await prisma.user.findUnique({where: { id: req.userId}})
    if (!user){
       return res.status(404).json({message: "user does not exist"})

    }
  try {
    await prisma.allergen.update({
      where: { userId: user.id as string },
      data: { foods: { disconnect: { id: req.params.foodId as string } } },
    });
    return res.status(204).send();
  } catch (err: any) {
    if (err?.code === "P2025") {
      return next(Object.assign(new Error("Allergen list not found"), { status: 404 }));
    }
    return next(err); 
  }
};
 