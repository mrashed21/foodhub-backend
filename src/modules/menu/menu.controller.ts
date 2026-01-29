import { prisma } from "@/lib/prisma";
import { NextFunction, Request, Response } from "express";
import { menuService } from "./menu.service";
import paginationFuction from "@/helper/pagination-function";

// //! create menu

const createMenu = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  // ! check user role
  if (user.role !== "provider") {
    return res.status(403).json({
      success: false,
      message: "Only provider can create menu",
    });
  }

  try {
    // ! check provider exists or not
    let provider = await prisma.provider.findUnique({
      where: { userId: user.id },
    });

    // ! create provider if not exists
    if (!provider) {
      provider = await prisma.provider.create({
        data: { userId: user.id },
      });
    }

    const result = await menuService.createMenu(req.body, provider.id);

    res.status(201).json({
      success: true,
      message: "Menu created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// ! get all menu
const getAllMenu = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { search } = req.query;
    const searchTerm = typeof search === "string" ? search : undefined;

    const { page, limit, skip } = paginationFuction(req.query);
    const result = await menuService.getAllMenu({
      search: searchTerm,
      page,
      limit,
      skip,
    });

    res.status(200).json({
      success: true,
      message: "Menu fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// ! get menu for provider (own menus)
const getMenuByProvider = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  if (user.role !== "provider") {
    return res.status(403).json({
      success: false,
      message: "Only provider can get menu",
    });
  }

  try {
    const provider = await prisma.provider.findUnique({
      where: { userId: user.id },
    });

    if (!provider) {
      return res.status(404).json({
        success: false,
        message: "Provider profile not found",
      });
    }

    const { search } = req.query;
    const searchTerm = typeof search === "string" ? search : undefined;

    const { page, limit, skip } = paginationFuction(req.query);

    const result = await menuService.getMenuByProvider({
      providerId: provider.id,
      search: searchTerm,
      page,
      limit,
      skip,
    });

    res.status(200).json({
      success: true,
      message: "Menu fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const menuController = {
  createMenu,
  getAllMenu,
  getMenuByProvider,
};
