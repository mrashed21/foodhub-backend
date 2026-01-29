import authMiddleWare from "@/middleware/auth-middleware";
import { UserRole } from "@/types/user-role";
import express from "express";
import { userController } from "./user.controller";
const router = express.Router();

// ! get all users
router.get("/", authMiddleWare(UserRole.admin), userController.getAllUsers);

//! update user status
router.patch(
  "/",
  authMiddleWare(UserRole.admin),
  userController.updateUserStatus,
);

export const userRouter = router;
