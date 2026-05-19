import Users from "../models/users.model.js";
import { asyncHandler,ApiError } from "../middlewares/error.middleware.js";
import jwt from "jsonwebtoken" 
import bcrypt from "bcrypt";
import dotenv from "dotenv"
dotenv.config();


export const createUser=asyncHandler(async(req,res)=>{
    const {name,email,password,address}=req.body;

    const user=await Users.findOne({email});
    if(user){
        throw new ApiError("Email already exists",401)
    }

    const P_Salt=Number(process.env.PASS_SALT);
    const hashedPass=bcrypt.hashSync(password,P_Salt);

    const newUser=await Users.create({name,password:hashedPass,email,address})

    const createdUser = await Users.findById(newUser._id).select("-password")
    return res.status(201).json({
        success:true,
        message:"User Created",
        data:createdUser
    })
})

export const login=asyncHandler(async (req,res) => {
    const {email,password}=req.body;

    const user = await Users.findOne({email});

    if(!user){
        throw new ApiError("User not found",404)
    }

    const verify=bcrypt.compareSync(password,user.password)

    if(!verify){
        throw new ApiError("Incorrect Password",401);
    }

    const token = jwt.sign({id:user._id,roles:user.roles},process.env.TOKEN_KEY,{expiresIn:"2d"})

    return res.status(200).json({
        success:true,
        message:"logged-in",
        token
    })
})

export const getAll=asyncHandler(async (req,res) => {
    const users = await Users.find().select("-password");

    if (users.length===0) {
        throw new ApiError("Empty Users",401)
    }

    return res.status(200).json({
        success:true,
        message:"All user fetched",
        data:users
    })

})