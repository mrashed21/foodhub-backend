import paginationFuction from "@/helper/pagination-function";
import { UserRole } from "@generated/prisma/enums";
import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";

// !get alluser  controller
const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { search } = req.query;
    const searchTerm = typeof search === "string" ? search : undefined;

    const { page, limit, skip } = paginationFuction(req.query);

    const params = {
      page,
      limit,
      skip,
      role: req.query.role as UserRole,
    };

    if (searchTerm) {
      Object.assign(params, { search: searchTerm });
    }

    const result = await userService.getAllUsers(params);

    res.status(201).json({
      success: true,
      message: "Users fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// ! update user status controller
const updateUserStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id, status } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "User id is required",
      });
    }

    const result = await userService.updateUserStatus(id, { status });

    res.status(200).json({
      success: true,
      message: "User status updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const userController = {
  getAllUsers,
  updateUserStatus,
};
