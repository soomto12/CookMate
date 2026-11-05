"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeAllergenHandler = exports.addAllergensHandler = exports.listAllergensHandler = void 0;
const prisma_1 = require("./lib/prisma");
const normalize = (name) => name.trim().toLowerCase();
const allergenFoods = { foods: { orderBy: { name: "asc" } } };
// The foods the logged-in user is allergic to.
const listAllergensHandler = async (req, res, next) => {
    try {
        const user = await prisma_1.prisma.user.findUnique({ where: { id: req.userId } });
        if (!user) {
            return res.status(404).json({ error: "user does not exist" });
        }
        const allergen = await prisma_1.prisma.allergen.findUnique({
            where: { userId: user.id },
            include: allergenFoods,
        });
        return res.status(200).json({ foods: allergen?.foods ?? [] });
    }
    catch (err) {
        return next(err);
    }
};
exports.listAllergensHandler = listAllergensHandler;
// Adds a list of foods (by name) to the user's allergen list, creating the list
// and any foods that don't exist yet. Foods already on the list are left as they are.
const addAllergensHandler = async (req, res, next) => {
    const user = await prisma_1.prisma.user.findUnique({ where: { id: req.userId } });
    if (!user) {
        return res.status(404).json({ error: "user does not exists" });
    }
    const userId = user.id;
    const names = [...new Set(req.body.allergens.map(normalize))];
    const foods = {
        connectOrCreate: names.map((name) => ({ where: { name }, create: { name } })),
    };
    try {
        const allergen = await prisma_1.prisma.allergen.upsert({
            where: { userId },
            update: { foods },
            create: { userId, foods },
            include: allergenFoods,
        });
        return res.status(201).json({ foods: allergen.foods });
    }
    catch (err) {
        return next(err);
    }
};
exports.addAllergensHandler = addAllergensHandler;
const removeAllergenHandler = async (req, res, next) => {
    const user = await prisma_1.prisma.user.findUnique({ where: { id: req.userId } });
    if (!user) {
        return res.status(404).json({ message: "user does not exist" });
    }
    try {
        await prisma_1.prisma.allergen.update({
            where: { userId: user.id },
            data: { foods: { disconnect: { id: req.params.foodId } } },
        });
        return res.status(204).send();
    }
    catch (err) {
        if (err?.code === "P2025") {
            return next(Object.assign(new Error("Allergen list not found"), { status: 404 }));
        }
        return next(err);
    }
};
exports.removeAllergenHandler = removeAllergenHandler;
//# sourceMappingURL=allergen.js.map