import mongoose from "mongoose";
import {order_itemsSchema} from "./order_items.model.js";

const orderSchema= new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    allOrder:[order_itemsSchema],
    total:{
        type:Number,
        required:true,
    },
    address:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["PLACED","CANCELLED"],
        default:"PLACED"
    }
},{timestamps:true})

const Orders = mongoose.model("Order",orderSchema);
export default Orders; 