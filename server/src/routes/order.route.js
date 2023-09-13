import express from "express";
import OrderController from "../controller/order.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const orderRouter = express.Router();

orderRouter.post("/", authMiddleware, OrderController.createdOrder);

export default orderRouter;
