import { Router } from "express";
import { signUp, login, me } from "../controllers/user";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/me", requireAuth, me);

export default router;
