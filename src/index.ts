import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import recipeRoutes from "./routes/recipe.routes";
import allergenRoutes from "./routes/allergen.routes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/allergens", allergenRoutes);

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
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
