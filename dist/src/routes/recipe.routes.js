"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const recipe_1 = require("../controllers/recipe");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get("/", auth_1.requireAuth, recipe_1.listRecipesHandler);
router.post("/generate", auth_1.requireAuth, recipe_1.generateRecipeHandler);
exports.default = router;
//# sourceMappingURL=recipe.routes.js.map