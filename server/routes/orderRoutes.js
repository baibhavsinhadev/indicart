import { Router } from "express";
import { getSellerOrders, getUserOrders, placeOrderCOD, placeOrderStripe, updateOrderStatus } from "../controllers/orderController.js";
import authUser from "../middlewares/authUser.js";
import authSeller from "../middlewares/authSeller.js";

const orderRouter = new Router();

orderRouter.post("/cod", authUser, placeOrderCOD);
orderRouter.post("/stripe", authUser, placeOrderStripe);
orderRouter.post("/update", authSeller, updateOrderStatus);

orderRouter.get("/user", authUser, getUserOrders);
orderRouter.get("/seller", authSeller, getSellerOrders);

export default orderRouter;