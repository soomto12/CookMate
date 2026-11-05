"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const recipe_1 = require("../controllers/recipe");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
const validateRequest = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array().map((error) => ({
                field: error.type === "field" ? error.path : "request",
                message: error.msg,
            })),
        });
    }
    return next();
};
const generateRecipeValidation = [
    (0, express_validator_1.body)("mealName")
        .trim()
        .notEmpty()
        .withMessage("mealName is required")
        .isLength({ min: 2, max: 200 })
        .withMessage("mealName must be between 2 and 200 characters"),
    (0, express_validator_1.body)("availableIngredients")
        .optional()
        .isArray()
        .withMessage("availableIngredients must be an array of strings")
        .custom((value) => Array.isArray(value) && value.every((item) => typeof item === "string"))
        .withMessage("availableIngredients must contain only strings"),
    (0, express_validator_1.body)("excludeCommonAllergens")
        .optional()
        .isBoolean()
        .withMessage("excludeCommonAllergens must be a boolean")
        .toBoolean(),
    (0, express_validator_1.body)("quickMealOnly")
        .optional()
        .isBoolean()
        .withMessage("quickMealOnly must be a boolean")
        .toBoolean(),
];
const suggestMealsValidation = [
    (0, express_validator_1.body)("availableIngredients")
        .optional()
        .isArray({ max: 50 })
        .withMessage("availableIngredients must be an array of strings")
        .custom((value) => Array.isArray(value) && value.every((item) => typeof item === "string" && item.trim().length > 0))
        .withMessage("availableIngredients must contain only non-empty strings"),
];
const generateIngredientsValidation = [
    (0, express_validator_1.body)("mealName")
        .trim()
        .notEmpty()
        .withMessage("mealName is required")
        .isLength({ min: 2, max: 200 })
        .withMessage("mealName must be between 2 and 200 characters"),
];
router.get("/", auth_1.requireAuth, recipe_1.listRecipesHandler);
router.post("/ingredients", auth_1.requireAuth, generateIngredientsValidation, validateRequest, recipe_1.generateIngredientsHandler);
router.post("/generate", auth_1.requireAuth, generateRecipeValidation, validateRequest, recipe_1.generateRecipeHandler);
router.post("/suggest", auth_1.requireAuth, suggestMealsValidation, validateRequest, recipe_1.suggestMealsHandler);
exports.default = router;
//# sourceMappingURL=recipe.routes.js.map