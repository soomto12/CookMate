"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post("/signup", user_1.signUp);
router.post("/login", user_1.login);
router.get("/me", auth_1.requireAuth, user_1.me);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map