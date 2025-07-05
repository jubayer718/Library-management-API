// middlewares/errorHandler.ts
import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 400;

  res.status(statusCode).json({
    message: err.message || "Something went wrong",
    success: false,
    error: err,
  });
};
