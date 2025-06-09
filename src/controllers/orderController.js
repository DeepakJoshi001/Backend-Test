import { Order } from "../models/Order.models.js";

export const createOrder = async (req, res) => {
  try {
    const { userId, productIds, totalAmount } = req.body;
    const newOrder = await Order.create({ userId, productIds, totalAmount });
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("userId")
      .populate("productIds");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const { userId, productIds, totalAmount } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { userId, productIds, totalAmount },
      { new: true }
    );
    if (!updatedOrder)
      return res.status(404).json({ message: "Order not found" });
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder)
      return res.status(404).json({ message: "Order not found" });
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
