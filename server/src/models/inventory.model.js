import mongoose from "mongoose";

const InventorySchema = new mongoose.Schema({
   sku: {
      type: String,
      required: true,
   },
   description: {
      type: String,
      required: true,
   },
   inStock: {
      type: Number,
      require: true,
   },
   createdAt: {
      type: Date,
      default: Date.now(),
   },
});

const InventoryModel = mongoose.model("inventory", InventorySchema);
export default InventoryModel;
