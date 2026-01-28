import authMiddleWare from "@/middleware/auth-middleware";
import { UserRole } from "@/types/user-role";
import express from "express";
import { categoryController } from "./category.controller";

const router = express.Router();
// ! get all category
router.get("/", categoryController.getAllCategories);

//! create category
router.post(
  "/",
  authMiddleWare(UserRole.admin),
  categoryController.createCategory,
);

export const categoryRouter = router;
