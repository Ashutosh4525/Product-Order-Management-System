import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

const DB_URL=process.env.MONGODB_URI;
const DB_NAME=process.env.DB_NAME;

const connectDB=async()=>{
    mongoose.connect(`${DB_URL}`,{dbName:DB_NAME})
    .then(()=>console.log("Db is connected"))
    .catch(err=>console.log("Something went wrong with DB: ",err))
}
export default connectDB;