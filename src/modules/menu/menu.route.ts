import authMiddleWare from "@/middleware/auth-middleware";
import { UserRole } from "@/types/user-role";
import express from "express";
import { menuController } from "./menu.controller";
const router = express.Router();

// ! create menu
router.post("/", authMiddleWare(UserRole.provider), menuController.createMenu);

export const menuRouter = router;
