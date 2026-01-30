import authMiddleWare from "@/middleware/auth-middleware";
import { UserRole } from "@/types/user-role";
import express from "express";
import { menuController } from "./menu.controller";
const router = express.Router();

// !get all menu
router.get("/", menuController.getAllMenu);

//! get menu for provider
router.get(
  "/provider",
  authMiddleWare(UserRole.provider),
  menuController.getMenuByProvider,
);

// ! create menu
router.post("/", authMiddleWare(UserRole.provider), menuController.createMenu);

// ! update menu
router.patch("/", authMiddleWare(UserRole.provider), menuController.updateMenu);

// ! delete menu
router.delete("/", authMiddleWare(UserRole.provider), menuController.deleteMenu);

export const menuRouter = router;
