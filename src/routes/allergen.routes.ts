import { Router } from "express";
import { body, validationResult } from "express-validator";
import { addAllergensHandler, listAllergensHandler, removeAllergenHandler } from "../controllers/allergen";
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

const addAllergensValidation = [
  body("foods")
    .isArray({ min: 1, max: 100 })
    .withMessage("foods must be a non-empty array of food names"),
  body("foods.*")
    .isString()
    .withMessage("foods must contain only strings")
    .trim()
    .notEmpty()
    .withMessage("each food name must be non-empty")
    .isLength({ max: 100 })
    .withMessage("each food name must be at most 100 characters"),
];

router.get("/", requireAuth, listAllergensHandler);
router.post("/", requireAuth, addAllergensValidation, validateRequest, addAllergensHandler);
router.delete("/:foodId", requireAuth, removeAllergenHandler);

export default router;
