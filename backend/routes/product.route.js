import express from "express";
import { createProduct,updateProduct,deleteProduct,disableProduct,enableProduct,getAllProduct } from "../controllers/products.controller.js";
import { authware,isAdmin } from "../middlewares/auth.middleware.js";
import { Productvalidator, Productparams } from "../validators/product.validators.js";
import { valdidate } from "../middlewares/validator.middleware.js";

const productRouter=express.Router();

productRouter.post("/create",authware,isAdmin,createProduct);
productRouter.get("/all",getAllProduct);
productRouter.put("/update/:id",authware,isAdmin,updateProduct);
productRouter.patch("/:id/disable",authware,isAdmin,disableProduct);
productRouter.patch("/:id/enable",authware,isAdmin,enableProduct);
productRouter.delete("/:id/delete",authware,isAdmin,deleteProduct)

export default productRouter;
