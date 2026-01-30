import authMiddleWare from "@/middleware/auth-middleware";
import { UserRole } from "@/types/user-role";
import express from "express";
import { categoryController } from "./category.controller";

const router = express.Router();

// ! get all category
router.get("/", categoryController.getAllCategories);

// ! get all category for admin
router.get("/admin", authMiddleWare(UserRole.admin), categoryController.getAllCategoriesForAdmin);

//! create category
router.post(
  "/",
  authMiddleWare(UserRole.admin),
  categoryController.createCategory,
);

//! update category
router.patch(
  "/",
  authMiddleWare(UserRole.admin),
  categoryController.updateCategory,
);

// ! delete category
router.delete(
  "/",
  authMiddleWare(UserRole.admin),
  categoryController.deleteCategory,
);
export const categoryRouter = router;
