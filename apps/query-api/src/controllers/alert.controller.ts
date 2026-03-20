import { NextFunction, Request, Response } from "express";
import { alertService } from "../services";

export async function listAlerts(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const items = await alertService.findAll();

    return res.status(200).json({
      success: true,
      data: items,
    });
  } catch (error) {
    return next(error);
  }
}
