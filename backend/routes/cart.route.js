import express from "express"
import { addToCart,getCart, updateCartItem,removeCartItem } from "../controllers/cart.controller.js"
import { isAdmin, authware } from "../middlewares/auth.middleware.js";

const cartRouter=express.Router();

cartRouter.post("/addtocart",authware,addToCart)
cartRouter.get("/getcart",authware,getCart);
cartRouter.put("/updatecart",authware,updateCartItem)
cartRouter.delete("/removeitem/:productId",authware,removeCartItem)

export default cartRouter;