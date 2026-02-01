import { NextFunction, Request, Response } from "express";
import { providerService } from "./provider.service";

const getProviderForHome = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await providerService.getProviderForHome();

    res.status(200).json({
      success: true,
      message: "Provider fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleProvider = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await providerService.getSingleProvider(
      req.params.id as string,
    );

    res.status(200).json({
      success: true,
      message: "Provider fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const providerController = {
  getProviderForHome,
  getSingleProvider,
};
