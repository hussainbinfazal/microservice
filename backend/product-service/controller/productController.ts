import mongoose from "mongoose";
import { Request, Response } from "express";
import Product from "../model/productModel";
import { IProduct } from "../model/productModel";

const registerProduct = async (req: Request, res: Response) => {
  try {
    const { name, size, price } = req.body;
    if (!name || !size || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newProduct = new Product({ name, size, price });
    await newProduct.save();
    res.status(201).json({ message: "Product registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error registering product" });
  }
};
const updateProduct = async (req: Request, res: Response) => {
  const { id, name, size, price } = req.body;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    product.name = name || product.name;
    product.size = size || product.size;
    product.price = price || product.price;
    await product.save();
    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error updating product" });
  }
};
const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Error getting product" });
  }
};

export { registerProduct, updateProduct, getProduct };
