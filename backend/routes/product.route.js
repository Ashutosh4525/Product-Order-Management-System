import express from "express";
import { createProduct,updateProduct,deleteProduct,disableProduct,enableProduct,getAllProduct } from "../controllers/products.controller.js";

const productRouter=express.Router();

productRouter.post("/create",createProduct);
productRouter.get("/all",getAllProduct);
productRouter.put("/update/:id",updateProduct);
productRouter.patch("/disable/:id",disableProduct);
productRouter.patch("/enable/:id",enableProduct);
productRouter.delete("/delete/:id",deleteProduct)

export default productRouter
