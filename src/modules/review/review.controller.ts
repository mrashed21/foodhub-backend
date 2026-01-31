import { NextFunction, Request, Response } from "express";
import { reviewService } from "./review.service";

const createReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = req.user;

  if (!user) {
    return res.status(500).json({
      success: false,
      message: "Unauthorized",
    });
  }
  try {
    const result = await reviewService.createReview(req.body, user?.id!);

    res.status(201).json({
      success: true,
      message: "review added successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// !get review for home 
const getReviewForHome = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await reviewService.getReviewForHome();

    res.status(200).json({
      success: true,
      message: "Review fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// ! get all review for admin
const getAllReviewsForAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await reviewService.getAllReviewsForAdmin();

    res.status(200).json({
      success: true,
      message: "Review fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// !get review for user
const getReviewForUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = req.user;

  if (!user) {
    return res.status(500).json({
      success: false,
      message: "Unauthorized",
    });
  }
  try {
    const result = await reviewService.getReviewForUser(user?.id!);

    res.status(200).json({
      success: true,
      message: "Review fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// !get review for provider
const getReviewForProvider = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = req.user;

  if (!user) {
    return res.status(500).json({
      success: false,
      message: "Unauthorized",
    });
  }
  try {
    const result = await reviewService.getReviewForProvider(user?.id!);

    res.status(200).json({
      success: true,
      message: "Review fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const reviewController = {
  createReview,
  getReviewForHome,
  getAllReviewsForAdmin,
  getReviewForUser,
  getReviewForProvider,
};
