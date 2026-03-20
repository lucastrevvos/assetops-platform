import { NextFunction, Response, Request } from "express";
import { ZodType, z } from "zod";
import { AppError } from "../errors/app-error";

export function validateBody(schema: ZodType) {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);

        if(!result.success) {
            return next(
                new AppError('Validation failed', 400, z.flattenError(result.error))
            )
        }

        req.body = result.data; 
        return next();
    }
}