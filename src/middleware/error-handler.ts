import { Prisma } from "@generated/prisma/client";
import { NextFunction, Request, Response } from "express";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 500;
  let message = "Something went wrong";
  let error: any = null;

  // Prisma validation error
  if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = 400;
    message = "Invalid data provided";
    error = err.message;
  }

  // Prisma known request error
  else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    statusCode = 400;

    if (err.code === "P2002") {
      const target = err.meta?.target;

      message = "Duplicate value error";

      if (Array.isArray(target)) {
        error = `${target.join(", ")} already exists`;
      } else {
        error = "Unique field already exists";
      }
    } else if (err.code === "P2003") {
      message = "Invalid reference";
      error = "Related record not found";
    } else {
      message = "Database error";
      error = err.message;
    }
  }

  // Normal JS error
  else if (err instanceof Error) {
    statusCode = 400;
    message = err.message;
    error = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    error,
  });
};

export default errorHandler;
