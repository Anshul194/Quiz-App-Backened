import { Request, Response, NextFunction } from "express";

const catchAsyncError =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
      next(error);
    });
  };

export default catchAsyncError;
