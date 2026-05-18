import express from "express"
import { placeOrder,getMyOrders,getSingleOrder } from "../controllers/order.controller.js";
import { isAdmin, authware } from "../middlewares/auth.middleware.js";

const orderRouter=express.Router();

/**
 * @swagger
 * /api/order/placeorder:
 *   post:
 *     summary: Place order
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - address
 *             properties:
 *               address:
 *                 type: string
 *     responses:
 *       201:
 *         description: Order placed successfully
 */
orderRouter.post("/placeorder",authware,placeOrder);

/**
 * @swagger
 * /api/order/allorder:
 *   get:
 *     summary: Get all orders of logged in user
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Orders fetched
 */
orderRouter.get("/allorder",authware,getMyOrders);

/**
 * @swagger
 * /api/order/{id}:
 *   get:
 *     summary: Get single order
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order fetched
 *       404:
 *         description: Order not found
 */
orderRouter.get("/:id",authware,getSingleOrder);

export default orderRouter;