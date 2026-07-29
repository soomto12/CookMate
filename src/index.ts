import "dotenv/config";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import recipeRoutes from "./routes/recipe.routes";

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

app.listen(PORT, () => {
  console.log(`CookMate API listening on port ${PORT}`);
});
