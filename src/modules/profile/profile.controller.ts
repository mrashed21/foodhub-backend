import { UserRole } from "@/types/user-role";
import { NextFunction, Request, Response } from "express";
import { profileService } from "./profile.service";

const updateMyProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.id;
    const { name, phone, providerName, image } = req.body;

    const result = await profileService.updateMyProfile(
      userId as string,
      req.user?.role as UserRole,
      {
        name,
        phone,
        providerName,
        image,
      },
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const profileController = { updateMyProfile };
