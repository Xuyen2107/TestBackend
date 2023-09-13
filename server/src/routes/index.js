import express from "express";
import authRouter from "./auth.route.js";
import orderRouter from "./order.route.js";
import inventoryRouter from "./inventory.route.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import logAPI from "../middleware/logAPI.js";

const router = express.Router();

const routerConfig = () => {
   router.use(logAPI);
   router.use("/auth", authRouter);
   router.use("/order", authMiddleware, orderRouter);
   router.use("/inventory", inventoryRouter);
   return router;
};

export default routerConfig;
