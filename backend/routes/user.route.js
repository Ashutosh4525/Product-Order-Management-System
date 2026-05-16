import express from "express"
import { createUser ,login} from "../controllers/users.controller.js";
import { authware,isAdmin } from "../middlewares/auth.middleware.js";
import { registerValidation,loginValidation } from "../validators/user.validators.js";
import { valdidate } from "../middlewares/validator.middleware.js";

const userRouter=express.Router();

userRouter.post("/register",createUser);
userRouter.post("/login",login)

export default userRouter;