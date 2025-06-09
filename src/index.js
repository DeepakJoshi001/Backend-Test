import express from "express";
import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import db from "./db/db.js";
import authRoutes from "./routes/authRoutes.js";
// import productRoutes from "./routes/productRoutes.js";

// const cors = require("cors");
// require("dotenv").config({ path: "./env" });

dotenv.config();

// const productRoutes = require("./routes/productRoutes");

db.getConnection()
  .then((connection) => {
    console.log("MySQL connected successfully!");
    connection.release(); // Release the connection back to the pool
  })
  .catch((err) => {
    console.error("MySQL connection failed:", err.message);
  });

const app = express();
app.use(cors());
app.use(express.json());

console.log(`${process.env.MONGODB_URI}`);

mongoose
  .connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
  .then((connection) =>
    console.log("MongoDB connected successfully>>", connection.connection.host)
  )
  .catch((err) => console.log("MongoDB connection failed:<<", err));

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
