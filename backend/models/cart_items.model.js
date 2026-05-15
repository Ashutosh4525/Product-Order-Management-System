import mongoose from "mongoose";

const cart_itemsSchema= new mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Products"
    },
    quantity:{
        type:Number,
        min:1,
        required:true
    },
    price:{
        type:Number,
        required:true,
    }
},{timestamps:true})

const Cart_items = mongoose.model("Cart_items",cart_itemsSchema);
export default Cart_items; 