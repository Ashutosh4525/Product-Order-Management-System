import mongoose from "mongoose";
import Cart_items from "./cart_items.model.js";

const cartschema= new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    items:[Cart_items],

},{timestamps:true})

const Cart = mongoose.model("Cart",cartschema);
export default Cart; 