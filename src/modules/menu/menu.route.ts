import authMiddleWare from "@/middleware/auth-middleware";
import { UserRole } from "@/types/user-role";
import express from "express";
import { menuController } from "./menu.controller";
const router = express.Router();

// !get all menu
router.get("/", menuController.getAllMenu);

// ! create menu
router.post("/", authMiddleWare(UserRole.provider), menuController.createMenu);


export const menuRouter = router;
