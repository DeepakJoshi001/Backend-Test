import express from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.route("/").get(getAllProducts).post(createProduct);
router.post("/delete/:id", deleteProduct);
router.route("/:id").put(updateProduct);

export default router;
