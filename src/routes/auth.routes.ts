import { Router } from "express";
import { body, validationResult } from "express-validator";
import { signUp, login, me } from "../controllers/user";
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

const signupValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("name must be between 2 and 100 characters"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("email must be a valid email address"),
  body("password")
    .isString()
    .withMessage("password must be a string")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters"),
];

const loginValidation = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("email must be a valid email address"),
  body("password")
    .isString()
    .withMessage("password must be a string")
    .notEmpty()
    .withMessage("password is required"),
];

router.post("/signup", signupValidation, validateRequest, signUp);
router.post("/login", loginValidation, validateRequest, login);
router.get("/me", requireAuth, me);

export default router;
