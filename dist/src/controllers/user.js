"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.me = exports.signUp = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_1 = require("../lib/prisma");
const jwt_1 = require("../lib/jwt");
const SALT_ROUNDS = 10;
const signUp = async (req, res) => {
    const { name, email, password } = req.body;
    if (typeof name !== "string" || typeof email !== "string" || typeof password !== "string") {
        return res.status(400).json({ error: "name, email and password are required" });
    }
    if (password.length < 8) {
        return res.status(400).json({ error: "password must be at least 8 characters" });
    }
    const normalizedEmail = email.trim().toLowerCase();
    try {
        const existing = await prisma_1.prisma.user.findUnique({ where: { email: normalizedEmail } });
        if (existing) {
            return res.status(409).json({ error: "An account with this email already exists" });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, SALT_ROUNDS);
        const user = await prisma_1.prisma.user.create({
            data: { name, email: normalizedEmail, password: hashedPassword },
        });
        const token = (0, jwt_1.signToken)({ userId: user.id });
        return res.status(201).json({
            user: { id: user.id, name: user.name, email: user.email },
            token,
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to create account" });
    }
};
exports.signUp = signUp;
const me = async (req, res) => {
    const user = await prisma_1.prisma.user.findUnique({ where: { id: req.userId } });
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({
        user: { id: user.id, name: user.name, email: user.email },
    });
};
exports.me = me;
const login = async (req, res) => {
    const { email, password } = req.body;
    if (typeof email !== "string" || typeof password !== "string") {
        return res.status(400).json({ error: "email and password are required" });
    }
    const normalizedEmail = email.trim().toLowerCase();
    try {
        const user = await prisma_1.prisma.user.findUnique({ where: { email: normalizedEmail } });
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        const passwordMatches = await bcryptjs_1.default.compare(password, user.password);
        if (!passwordMatches) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        const token = (0, jwt_1.signToken)({ userId: user.id });
        return res.status(200).json({
            user: { id: user.id, name: user.name, email: user.email },
            token,
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to log in" });
    }
};
exports.login = login;
//# sourceMappingURL=user.js.map