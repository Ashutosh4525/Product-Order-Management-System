import { validationResult } from "express-validator";
import { ApiError } from "./error.middleware.js";
export const valdidate=(req,res,next)=>{
    const error=validationResult(req)
    if (error.isEmpty()) {
        return next();
    }

    return res.status(400).json({
        error:error.array()
    })
}
