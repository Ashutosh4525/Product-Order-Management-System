import Cart from "../models/cart.model.js";
import Products from "../models/products.model.js";
import {asyncHandler,ApiError} from "../middlewares/error.middleware.js";

export const addToCart = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    console.log(userId);
    
    const { productId, quantity } = req.body;

    const product = await Products.findOne({_id: productId,isDisabled: false});

    if (!product) {
        throw new ApiError("Product not found",404);
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
        cart = await Cart.create({
            userId,
            items: []
        });
    }

    const existingItem = cart.items.find(item =>item.productId.toString() === productId );

    if (existingItem) {
        let newQuantity = existingItem.quantity + quantity;
        if (newQuantity > product.quantity) {
            // throw new ApiError("Insufficient inventory",400);
            newQuantity=product.quantity
        }
        existingItem.quantity = newQuantity;
    } else {
        // if (quantity > product.quantity) {
        //     throw new ApiError("Insufficient inventory",400);
        // }
        cart.items.push({
            productId,
            quantity,
            price: product.price * quantity
        });
    }

    const total = cart.items.reduce((acc, item) =>acc + (item.price * item.quantity),0);
    await cart.save();

    return res.status(200).json({
        success: true,
        message: "Added to cart",
        data: cart,
        total
    });

});

export const getCart = asyncHandler(async (req, res) => {

    const userId = req.user.id;

    const cart = await Cart.findOne({ userId })
        .populate("items.productId");

    if (!cart) {
        return res.status(200).json({
            success: true,
            data: []
        });
    }
    const items = cart.items.map(item => ({

        ...item.toObject(),

        subtotal:
            item.price * item.quantity

    }));

    const total = items.reduce(
        (acc, item) =>
            acc + item.subtotal,
        0
    );


    return res.status(200).json({
        success: true,
        data: cart,
        total
    });

});

export const updateCartItem = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
        throw new ApiError("Cart not found", 404);
    }

    const item = cart.items.find(item =>item.productId.toString() === productId);

    if (!item) {
        throw new ApiError("Item not found in cart",404);
    }

    item.quantity = quantity;

    await cart.save();

    return res.status(200).json({
        success: true,
        message: "Cart updated",
        data: cart
    });

});

export const removeCartItem = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { productId } = req.params;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
        throw new ApiError("Cart not found", 404);
    }

    const initialLength = cart.items.length;
    cart.items = cart.items.filter(item => item.productId.toString() !== productId);

    if (cart.items.length === initialLength) {
        throw new ApiError("Item not found in cart", 404);
    }

    
    await cart.save();

    return res.status(200).json({
        success: true,
        message: "Item removed"
    });

});
