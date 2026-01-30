import paginationFuction from "@/helper/pagination-function";
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

// ! get all categories controller
const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { search } = req.query;
    const searchTerm = typeof search === "string" ? search : undefined;

    const { page, limit, skip } = paginationFuction(req.query);
    const result = await categoryService.getAllCategories({
      search: searchTerm,
      page,
      limit,
      skip,
    });

    res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// ! get all categories for admin controller
const getAllCategoriesForAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { search } = req.query;
    const searchTerm = typeof search === "string" ? search : undefined;

    const { page, limit, skip } = paginationFuction(req.query);
    const result = await categoryService.getAllCategoriesForAdmin({
      search: searchTerm,
      page,
      limit,
      skip,
    });

    res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// ! update category controller
const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = req.user;

  const categoryId = req.body.id;
  if (!user) {
    return res.status(500).json({
      success: false,
      message: "Unauthorized",
    });
  }
  try {
    const result = await categoryService.updateCategory(req.body, categoryId);

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// ! delete category controller
const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = req.user;

  const categoryId = req.body.id;
  if (!user) {
    return res.status(500).json({
      success: false,
      message: "Unauthorized",
    });
  }
  try {
    const result = await categoryService.deleteCategory(categoryId);

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const categoryController = {
  createCategory,
  getAllCategories,
  getAllCategoriesForAdmin,
  updateCategory,
  deleteCategory,
};
