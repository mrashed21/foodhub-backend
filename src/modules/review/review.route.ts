import authMiddleWare from "@/middleware/auth-middleware";
import { UserRole } from "@/types/user-role";
import express from "express";
import { reviewController } from "./review.controller";

const router = express.Router();

//! get  review for homepage
router.get("/home", reviewController.getReviewForHome);

// ! get all review for admin
router.get("/admin", authMiddleWare(UserRole.admin), reviewController.getAllReviewsForAdmin);

// !get review for user
router.get("/user", authMiddleWare(UserRole.customer), reviewController.getReviewForUser);

// ! get review for provider
router.get("/provider", authMiddleWare(UserRole.provider), reviewController.getReviewForProvider);
// ! ccreate reciew
router.post(
  "/",
  authMiddleWare(UserRole.customer),
  reviewController.createReview,
);

export const reviewRouter = router;
