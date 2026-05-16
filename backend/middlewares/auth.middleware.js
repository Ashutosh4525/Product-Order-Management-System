import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import { asyncHandler,ApiError } from "./error.middleware.js";

dotenv.config();

export const authware=asyncHandler(async (req,res,next) => {
    const header = req.headers.authorization;

    // console.log(header);
    
    if (!header) {
        throw new ApiError("header not found",404)
    }

    const token=header.split(" ").pop();
    // console.log(token)

    if (!token) {
        throw new ApiError("token not found", 404)
    }

    try {

        const decoded = jwt.verify(
            token,
            process.env.TOKEN_KEY
        );

        req.user = {
            id: decoded.id,
            roles: decoded.roles
        };

        next();

    } catch (error) {

        throw new ApiError("Invalid or expired token", 401);

    }
})

export const isAdmin=asyncHandler(async(req,res,next)=>{
    const {id,roles}=req.user;
    // console.log(req.user);
    
    if (!Array.isArray(roles) || !roles.includes('admin')) {
        throw new ApiError("Only Admin Access", 401);
    }

    next();
})