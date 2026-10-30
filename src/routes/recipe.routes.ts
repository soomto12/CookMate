import { Router } from "express";
import { body, validationResult } from "express-validator";
import { generateRecipeHandler, listRecipesHandler, suggestMealsHandler } from "../controllers/recipe";
import { requireAuth } from "../middleware/auth";

const router = Router();

const validateRequest = (req: any, res: any, next: any) => {
  const errors = validationResult(req);

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
  body("mealName")
    .trim()
    .notEmpty()
    .withMessage("mealName is required")
    .isLength({ min: 2, max: 200 })
    .withMessage("mealName must be between 2 and 200 characters"),
  body("availableIngredients")
    .isArray({ min: 1 })
    .withMessage("availableIngredients must be a non-empty array of strings")
    .custom((value) => Array.isArray(value) && value.every((item) => typeof item === "string"))
    .withMessage("availableIngredients must contain only strings"),
  body("excludeCommonAllergens")
    .optional()
    .isBoolean()
    .withMessage("excludeCommonAllergens must be a boolean")
    .toBoolean(),
  body("quickMealOnly")
    .optional()
    .isBoolean()
    .withMessage("quickMealOnly must be a boolean")
    .toBoolean(),
];

const suggestMealsValidation = [
  body("availableIngredients")
    .isArray({ min: 1, max: 50 })
    .withMessage("availableIngredients must be a non-empty array of strings")
    .custom((value) => Array.isArray(value) && value.every((item) => typeof item === "string" && item.trim().length > 0))
    .withMessage("availableIngredients must contain only non-empty strings"),
  body("quickMealOnly")
    .optional()
    .isBoolean()
    .withMessage("quickMealOnly must be a boolean")
    .toBoolean(),
];

router.get("/", requireAuth, listRecipesHandler);
router.post("/generate", requireAuth, generateRecipeValidation, validateRequest, generateRecipeHandler);
router.post("/suggest", requireAuth, suggestMealsValidation, validateRequest, suggestMealsHandler);

export default router;
