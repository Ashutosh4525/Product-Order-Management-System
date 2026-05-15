import { ApiError, asyncHandler } from "../middlewares/error.middleware.js";
import Cart from "../models/cart.model.js";
import Products from "../models/products.model.js";


export const addToCart=asyncHandler(async (req,res) => {
    const {id}=req.user;

    const {productId,quantity}=req.body;

    if (!productId||quantity<=0) {
        throw new ApiError("Inavlid Item",403)
    }

    const cart= await Cart.findById({})
    
})