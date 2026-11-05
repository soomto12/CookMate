"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAllergen = void 0;
const prisma_1 = require("../controllers/lib/prisma");
// The names of the foods the user is allergic to.
const userAllergen = async (id) => {
    if (!id)
        return [];
    const allergen = await prisma_1.prisma.allergen.findUnique({
        where: { userId: id },
        include: { foods: true },
    });
    return allergen?.foods.map((food) => food.name) ?? [];
};
exports.userAllergen = userAllergen;
//# sourceMappingURL=userallergen.js.map