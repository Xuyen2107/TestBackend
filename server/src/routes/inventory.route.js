import express from "express";
import InventoryController from "../controller/inventory.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const inventoryRouter = express.Router();

inventoryRouter.post("/", InventoryController.createInventory);
inventoryRouter.get("/all", authMiddleware, InventoryController.getAllInventory);
inventoryRouter.get("/under-100", authMiddleware, InventoryController.getInventoryInStockUnder100);

export default inventoryRouter;
