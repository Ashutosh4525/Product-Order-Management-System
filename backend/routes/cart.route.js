import express from "express"
import { addToCart,getCart, updateCartItem,removeCartItem } from "../controllers/cart.controller.js"
import { isAdmin, authware } from "../middlewares/auth.middleware.js";

const cartRouter=express.Router();

/**
 * @swagger
 * /api/cart/addtocart:
 *   post:
 *     summary: Add item to cart
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Item added to cart
 *       400:
 *         description: Insufficient inventory
 */
cartRouter.post("/addtocart",authware,addToCart)

/**
 * @swagger
 * /api/cart/getcart:
 *   get:
 *     summary: Get user cart
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart fetched successfully
 */
cartRouter.get("/getcart",authware,getCart);

/**
 * @swagger
 * /api/cart/updatecart:
 *   put:
 *     summary: Update cart item quantity
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Cart updated
 */
cartRouter.put("/updatecart",authware,updateCartItem)

/**
 * @swagger
 * /api/cart/removeitem/{productId}:
 *   delete:
 *     summary: Remove item from cart
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item removed
 */
cartRouter.delete("/removeitem/:productId",authware,removeCartItem)

export default cartRouter;