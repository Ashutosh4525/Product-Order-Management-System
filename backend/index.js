import express from "express"
import dotenv from "dotenv"
dotenv.config();
import connectDB from "./DB/db.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import userRouter from "./routes/user.route.js";
import productRouter from "./routes/product.route.js";
const PORT = 8000;
const app = express();

app.use(express.json());

app.get('/',(req,res)=>{
    return res.send("Server Working")
})
app.use("/api/users",userRouter);
app.use("/api/products",productRouter)

app.use(errorHandler);
connectDB()
.then(()=>{
    app.listen(PORT,()=>{
        console.log("Server is running");
    })
})
.catch((err)=>{console.log("Something went wrong with server: ",err)
})