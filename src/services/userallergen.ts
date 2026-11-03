import { prisma } from "../controllers/lib/prisma";

// The names of the foods the user is allergic to.
export const userAllergen = async (id: string | undefined): Promise<string[]> => {
  if (!id) return [];

  const allergen = await prisma.allergen.findUnique({
    where: { userId: id },
    include: { foods: true },
  });

  return allergen?.foods.map((food) => food.name) ?? [];
};
