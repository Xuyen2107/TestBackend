import asyncHandler from "express-async-handler";
import InventoryModel from "../models/inventory.model.js";

const createInventory = asyncHandler(async (req, res) => {
   const { sku, description, inStock } = req.body;

   const existingSku = await InventoryModel.findOne({ sku });

   if (existingSku) {
      res.status(400);
      throw new Error("Sản phẩm đã tồn tại");
   }

   const newInventory = new InventoryModel({
      sku,
      description,
      inStock,
   });

   await newInventory.save();

   res.status(201).json({
      message: "Sản phẩm đã thêm thành công",
   });
});

const getAllInventory = asyncHandler(async (req, res) => {
   const inventory = await InventoryModel.find();

   res.json({
      data: inventory,
   });
});

const getInventoryInStockUnder100 = asyncHandler(async (req, res) => {
   const inventoryUnder100 = await InventoryModel.find({ inStock: { $lt: 100 } });
   res.json({
      data: inventoryUnder100,
   });
});

const InventoryController = {
   createInventory,
   getAllInventory,
   getInventoryInStockUnder100,
};

export default InventoryController;
