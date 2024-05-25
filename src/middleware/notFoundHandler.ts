import { Request, Response, NextFunction } from "express";

function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
}

export default notFoundHandler;
