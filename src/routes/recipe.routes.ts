import { Router } from "express";
import { generateRecipeHandler, listRecipesHandler } from "../controllers/recipe";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.get("/", requireAuth, listRecipesHandler);
router.post("/generate", requireAuth, generateRecipeHandler);

export default router;
