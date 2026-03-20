import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/app-error";
import z, { ZodError } from "zod";
import { env } from "../config/env";

export function errorHandler(error: Error, _req: Request, res: Response, _next: NextFunction){
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            message: error.message,
            details: error.details ?? null
        })
    }

    if(error instanceof ZodError) {
        return res.status(400).json({
            message: 'Validation failed',
            details:  z.flattenError(error)
        })
    }

    console.error(error)

    return res.status(500).json({
        message: 'Internal server error',
        details: env.NODE_ENV === 'development' ? error.message : null
    })
}