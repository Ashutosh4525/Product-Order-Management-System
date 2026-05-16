import mongoose from "mongoose";
import {cart_itemsSchema} from "./cart_items.model.js";

const cartschema= new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    items:[cart_itemsSchema],

},{timestamps:true})

const Cart = mongoose.model("Cart",cartschema);
export default Cart; 