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

    const result = await userService.getAllUsers({
      search: searchTerm,
      page,
      limit,
      skip,
      role: req.query.role as UserRole,
    });

    res.status(201).json({
      success: true,
      message: "Users fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const userController = {
  getAllUsers,
};
