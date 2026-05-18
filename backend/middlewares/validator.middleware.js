import { validationResult } from "express-validator";
import { ApiError } from "./error.middleware.js";
export const valdidate=(req,res,next)=>{
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return next(
            new ApiError(errors.array()[0].msg,400)
        );
    }

    next();
}
