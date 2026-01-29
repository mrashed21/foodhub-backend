import authMiddleWare from "@/middleware/auth-middleware";
import { UserRole } from "@/types/user-role";
import express from "express";
import { userController } from "./user.controller";
const router = express.Router();
// ! get all category
router.get("/", authMiddleWare(UserRole.admin), userController.getAllUsers);

export const userRouter = router;
