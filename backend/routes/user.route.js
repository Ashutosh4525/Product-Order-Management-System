import express from "express"
import { createUser ,login} from "../controllers/users.controller.js";
import { authware,isAdmin } from "../middlewares/auth.middleware.js";
import { registerValidation,loginValidation } from "../validators/user.validators.js";
import { valdidate } from "../middlewares/validator.middleware.js";

const userRouter=express.Router();

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - address
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Validation error
 *       409:
 *         description: Email already exists
 */
userRouter.post("/register",registerValidation,valdidate,createUser);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
userRouter.post("/login",loginValidation,valdidate,login)

export default userRouter;