import authMiddleWare from "@/middleware/auth-middleware";
import { UserRole } from "@/types/user-role";
import express from "express";
const router = express.Router();

// ! get my profile
// router.get("/", authMiddleWare(UserRole.provider));

export const providerRouter = router;
