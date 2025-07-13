import express, { Router } from "express";
import {
  registerProduct,
  updateProduct,
  getProduct,
} from "../controller/productController";
import { protect } from "../middlewares/auth";

const router: Router = express.Router();

router.post("/register-product", protect, registerProduct);
router.put("/update-product", protect, updateProduct);
router.get("/get-product/:id", protect, getProduct);

export default router;
