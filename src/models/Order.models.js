import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    OrderNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    productIds: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    TotalAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", OrderSchema);
