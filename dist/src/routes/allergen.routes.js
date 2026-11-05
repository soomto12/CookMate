"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const allergen_1 = require("../controllers/allergen");
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
const addAllergensValidation = [
    (0, express_validator_1.body)("allergens")
        .isArray({ min: 1, max: 100 })
        .withMessage("allergens must be a non-empty array of food names"),
    (0, express_validator_1.body)("allergens.*")
        .isString()
        .withMessage("allergens must contain only strings")
        .trim()
        .notEmpty()
        .withMessage("each allergen name must be non-empty")
        .isLength({ max: 100 })
        .withMessage("each allergen name must be at most 100 characters"),
];
router.get("/", auth_1.requireAuth, allergen_1.listAllergensHandler);
router.post("/", auth_1.requireAuth, addAllergensValidation, validateRequest, allergen_1.addAllergensHandler);
router.delete("/:foodId", auth_1.requireAuth, allergen_1.removeAllergenHandler);
exports.default = router;
//# sourceMappingURL=allergen.routes.js.map