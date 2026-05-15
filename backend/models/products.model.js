import mongoose from "mongoose";

const productSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    quantity:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    isDisabled:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

const Products = mongoose.model("Product",productSchema);
export default Products; 