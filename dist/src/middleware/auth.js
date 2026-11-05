"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const jwt_1 = require("../controllers/lib/jwt");
const prisma_1 = require("../controllers/lib/prisma");
const requireAuth = async (req, res, next) => {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Missing or invalid Authorization header" });
    }
    const token = header.slice("Bearer ".length);
    let userId;
    try {
        userId = (0, jwt_1.verifyToken)(token).userId;
    }
    catch {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
    try {
        // A valid token isn't enough: the account may have been deleted since it was issued.
        const user = await prisma_1.prisma.user.findUnique({ where: { id: userId }, select: { id: true } });
        if (!user) {
            return res.status(401).json({ error: "User no longer exists" });
        }
        req.userId = user.id;
        return next();
    }
    catch (err) {
        return next(err);
    }
};
exports.requireAuth = requireAuth;
//# sourceMappingURL=auth.js.map