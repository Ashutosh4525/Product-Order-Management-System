import { validationResult } from "express-validator";
import { ApiError } from "./error.middleware.js";
export const valdidate=(req,res,next)=>{
    const error=validationResult(req)
    if (error.isEmpty()) {
        const message = errors.array()[0].msg;

        return next(
            new ApiError(message, 400)
        );

    }

    next();
}
