"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const recipe_routes_1 = __importDefault(require("./routes/recipe.routes"));
const allergen_routes_1 = __importDefault(require("./routes/allergen.routes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express_1.default.json());
app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
});
app.use("/api/auth", auth_routes_1.default);
app.use("/api/recipes", recipe_routes_1.default);
app.use("/api/allergens", allergen_routes_1.default);
app.use((err, _req, res, _next) => {
    console.error(err);
    const hasExplicitStatus = typeof err?.status === "number";
    const status = hasExplicitStatus ? err.status : 500;
    // Only errors we deliberately flagged with a status carry a safe,
    // intentional message. Anything else (DB/Prisma errors, JSON parse
    // failures, upstream API errors, etc.) must not leak internal details.
    const message = hasExplicitStatus && typeof err?.message === "string" && err.message.trim().length > 0
        ? err.message
        : "Internal server error";
    return res.status(status).json({ error: message });
});
app.listen(PORT, () => {
    console.log(`Mealio API listening on port ${PORT}`);
});
//# sourceMappingURL=index.js.map