import jwt, { decode } from "jsonwebtoken";
import { asyncHandler,ApiError } from "./error.middleware";
import { header } from "express-validator";
import dotenv from "dotenv"
dotenv.config();

export const authware=asyncHandler(async (req,res,next) => {
    const header = req.headers.authorization;

    if (!header) {
        throw new ApiError("header not found",404)
    }

    const token=header.split(" ").pop();

    if (!token) {
        throw new ApiError("token not found", 404)
    }

    jwt.verify(token,process.env.TOKEN_KEY,(err,decoded)=>{
        if (err) {
            throw new ApiError("something went wrong when verifying",401)
        }
        const {id,role}=decoded;
        req.user={id,role}
    })
    
    next();
})

export const isAdmin=asyncHandler(async(req,res,next)=>{
    const {id,role}=req.user;

    if(role.includes('admin')===false){
        throw new ApiError("Only Admin Access", 401);
    }

    next();
})