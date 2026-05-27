import mongoose from "mongoose";
import Cart from "../models/cart.model.js";
import Orders from "../models/orders.model.js";
import Products from "../models/products.model.js";
import { asyncHandler,ApiError } from "../middlewares/error.middleware.js";

export const placeOrder = asyncHandler(async (req, res) => {

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const userId = req.user.id;
        console.log(req.user);
        
        const { address } = req.body;
        const cart = await Cart.findOne({userId}).session(session);

        if (!cart || cart.items.length === 0) {
            throw new ApiError("Cart is empty",400);
        }

        let total = 0;

        for (const item of cart.items) {
            const product = await Products.findById(item.productId).session(session);

            if (!product) {
                throw new ApiError("Product not found",404);
            }

            if (product.quantity < item.quantity) {
                // throw new ApiError(`${product.name} insufficient inventory`,400);
                // for( const item of cart.items){
                    await Products.findByIdAndUpdate(
                        item.productId,
                        {
                            $inc:{
                                quantity:-product.quantity
                            }
                        }
                    )
                // }
                
            }

            total += item.price * item.quantity;
        }

        for (const item of cart.items) {
            await Products.findByIdAndUpdate(
                item.productId,
                {
                    $inc: {
                        quantity: -item.quantity
                    }
                },
                { session }
            );
        }

        
        // for (const item of cart.items){
        //     if (product.quantity < item.quantity) {
        //        await Products.findByIdAndUpdate(
        //                 productId,
        //                 {
        //                     $inc:{
        //                         quantity:-product.quantity
        //                     }
        //                 },
        //                 {session}
        //             ) 
        //     }
        // }
        const order = await Orders.create([{
            userId,
            allOrder: cart.items,
            total,
            address,
            status: "PLACED"
        }], { session });

        cart.items = [];

        await cart.save({ session });

        await session.commitTransaction();

        session.endSession();

        return res.status(201).json({
            success: true,
            message: "Order placed successfully",
            data: order[0]
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.log(error);
        
        throw new ApiError(error,500);
    }

});

export const getMyOrders = asyncHandler(async (req, res) => {

    const userId = req.user.id;

    const orders = await Orders.find({
        userId
    });

    return res.status(200).json({
        success: true,
        data: orders
    });

});

export const getSingleOrder = asyncHandler(async (req, res) => {

    const userId = req.user.id;

    const { id } = req.params;

    const order = await Orders.findOne({
        _id: id,
        userId
    });

    if (!order) {
        throw new ApiError(
            "Order not found",
            404
        );
    }

    return res.status(200).json({
        success: true,
        data: order
    });

});