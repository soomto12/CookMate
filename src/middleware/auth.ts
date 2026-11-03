import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../controllers/lib/jwt";
import { prisma } from "../controllers/lib/prisma";

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or invalid Authorization header" });
  }

  const token = header.slice("Bearer ".length);

  let userId: string;
  try {
    userId = verifyToken(token).userId;
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }

  try {
    // A valid token isn't enough: the account may have been deleted since it was issued.
    const user = await prisma.user.findUnique({ where: { id: userId }, select: { id: true } });
    if (!user) {
      return res.status(401).json({ error: "User no longer exists" });
    }
    req.userId = user.id;
    return next();
  } catch (err) {
    return next(err);
  }
};
