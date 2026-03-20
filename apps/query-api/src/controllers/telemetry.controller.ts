import { NextFunction, Request, Response } from "express";
import { telemetryService } from "../services";

export async function listTelemetry(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const items = await telemetryService.findAll();

    return res.status(200).json({
      success: true,
      data: items,
    });
  } catch (error) {
    return next(error);
  }
}
