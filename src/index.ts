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

  const status = typeof err?.status === "number" ? err.status : 500;
  const message = typeof err?.message === "string" && err.message.trim().length > 0
    ? err.message
    : "Internal server error";

  return res.status(status).json({ error: message });
});

app.listen(PORT, () => {
  console.log(`CookMate API listening on port ${PORT}`);
});
