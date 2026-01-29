import { prisma } from "@/lib/prisma";
import { NextFunction, Request, Response } from "express";
import { menuService } from "./menu.service";

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

export const menuController = {
  createMenu,
};
