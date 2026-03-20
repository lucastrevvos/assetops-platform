import { NextFunction, Request, Response } from "express";
import { assetService } from "../services";

export async function listAssets(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const items = await assetService.findAll();

    return res.status(200).json({
      success: true,
      data: items,
    });
  } catch (error) {
    return next(error);
  }
}
