import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: String,
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", ProductSchema);
