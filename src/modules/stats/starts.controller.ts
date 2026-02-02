import { NextFunction, Request, Response } from "express";
import { statsService } from "./stats.service";

const getStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const stats = await statsService.getStats();
    res.status(200).json({
      success: true,
      message: "Stats fetched successfully",
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

const getStatsForProvider = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const providerId = req.user?.id;
  try {
    const stats = await statsService.getStatsForProvider(providerId!);
    res.status(200).json({
      success: true,
      message: "Stats fetched successfully",
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

export const statsController = { getStats, getStatsForProvider };
