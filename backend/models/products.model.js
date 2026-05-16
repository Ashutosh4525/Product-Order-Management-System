import mongoose from "mongoose";

const productSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        index:true
    },
    description:{
        type:String,
    },
    quantity:{
        type:Number,
        min:0,
        required:true
    },
    price:{
        type:Number,
        min:0,
        required:true
    },
    isDisabled:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

const Products = mongoose.model("Products",productSchema);
export default Products; 