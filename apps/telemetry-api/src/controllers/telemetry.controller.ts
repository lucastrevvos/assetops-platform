import { NextFunction, Request, Response } from "express";
import { TelemetryInput } from "@assetops/shared-types";
import { telemetryService } from "../services";

export async function createTelemetry(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const telemetry = req.body as TelemetryInput;

    const createdTelemetry = await telemetryService.create(telemetry);

    return res.status(201).json({
      success: true,
      message: "Telemetry data received successfully",
      data: createdTelemetry,
    });
  } catch (error) {
    return next(error);
  }
}

export async function listTelemetry(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const telemetryTimes = await telemetryService.findAll();

    return res.status(200).json({
      success: true,
      data: telemetryTimes,
    });
  } catch (error) {
    return next(error);
  }
}
