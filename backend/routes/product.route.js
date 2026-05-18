import express from "express";
import { createProduct,updateProduct,deleteProduct,disableProduct,enableProduct,getAllProduct } from "../controllers/products.controller.js";
import { authware,isAdmin } from "../middlewares/auth.middleware.js";
import { Productvalidator, Productparams } from "../validators/product.validators.js";
import { valdidate } from "../middlewares/validator.middleware.js";

const productRouter=express.Router();

/**
 * @swagger
 * /api/products/create:
 *   post:
 *     summary: Create product
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - quantity
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               quantity:
 *                 type: number
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Product created successfully
 */
productRouter.post("/create",authware,isAdmin,createProduct);

/**
 * @swagger
 * /api/products/all:
 *   get:
 *     summary: Get all active products
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: Products fetched successfully
 */
productRouter.get("/all",getAllProduct);

/**
 * @swagger
 * /api/products/update/{id}:
 *   put:
 *     summary: Update product
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               quantity:
 *                 type: number
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product updated
 *       404:
 *         description: Product not found
 */
productRouter.put("/update/:id",authware,isAdmin,updateProduct);

/**
 * @swagger
 * /api/products/{id}/disable:
 *   patch:
 *     summary: Disable product
 *     tags:
 *       - Products
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
 *         description: Product disabled
 */
productRouter.patch("/:id/disable",authware,isAdmin,disableProduct);

/**
 * @swagger
 * /api/products/{id}/enable:
 *   patch:
 *     summary: Enable product
 *     tags:
 *       - Products
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
 *         description: Product enabled
 */
productRouter.patch("/:id/enable",authware,isAdmin,enableProduct);

/**
 * @swagger
 * /api/products/{id}/delete:
 *   delete:
 *     summary: Delete product
 *     tags:
 *       - Products
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
 *         description: Product deleted
 */
productRouter.delete("/:id/delete",authware,isAdmin,deleteProduct)

export default productRouter;
