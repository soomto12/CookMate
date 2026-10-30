"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const user_1 = require("../controllers/user");
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
const signupValidation = [
    (0, express_validator_1.body)("name")
        .trim()
        .notEmpty()
        .withMessage("name is required")
        .isLength({ min: 2, max: 100 })
        .withMessage("name must be between 2 and 100 characters"),
    (0, express_validator_1.body)("email")
        .trim()
        .notEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("email must be a valid email address"),
    (0, express_validator_1.body)("password")
        .isString()
        .withMessage("password must be a string")
        .isLength({ min: 8 })
        .withMessage("password must be at least 8 characters"),
];
const loginValidation = [
    (0, express_validator_1.body)("email")
        .trim()
        .notEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("email must be a valid email address"),
    (0, express_validator_1.body)("password")
        .isString()
        .withMessage("password must be a string")
        .notEmpty()
        .withMessage("password is required"),
];
router.post("/signup", signupValidation, validateRequest, user_1.signUp);
router.post("/login", loginValidation, validateRequest, user_1.login);
router.get("/me", auth_1.requireAuth, user_1.me);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map