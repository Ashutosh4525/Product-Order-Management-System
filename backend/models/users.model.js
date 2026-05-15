import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    roles:{
        type:[String],
        enum:["admin","user"],
        default:["user"]
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    address:{
        type:String,
    },
    password:{
        type:String,
        required:true
    },
},{timestamps:true})

const Users = mongoose.model("User",userSchema);
export default Users; 