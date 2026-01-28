import { NextFunction, Request, Response } from "express";
import { categoryService } from "./category.service";

// ! create category controller
const createCategory = async (
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
    const result = await categoryService.createCategory(req.body, user?.id!);

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const categoryController = {
  createCategory,
};
