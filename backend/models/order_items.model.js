import mongoose from "mongoose";

const order_itemsSchema= new mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Products"
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        min:1,
        required:true
    },



},{timestamps:true})

const Order_items = mongoose.model("Order_items",order_itemsSchema);
export default Order_items; 