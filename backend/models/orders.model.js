import mongoose from "mongoose";
import Order_items from "./order_items.model.js";

const orderSchema= new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    allOrder:[Order_items],
    total:{
        type:Number,
        required:true,
    },
    address:{
        type:true,
        required:true
    },
},{timestamps:true})

const Orders = mongoose.model("Order",orderSchema);
export default Orders; 