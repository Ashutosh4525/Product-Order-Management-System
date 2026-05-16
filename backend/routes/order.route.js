import express from "express"
import { placeOrder,getMyOrders,getSingleOrder } from "../controllers/order.controller.js";
import { isAdmin, authware } from "../middlewares/auth.middleware.js";

const orderRouter=express.Router();

orderRouter.post("/placeorder",authware,placeOrder);
orderRouter.get("/allorder",authware,getMyOrders);
orderRouter.get("/:id",authware,getSingleOrder);

export default orderRouter;