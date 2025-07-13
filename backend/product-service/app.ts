import dotenv from "dotenv";
import express, { Application } from "express";
import connectDB from "./config/db";
import { protect } from "./middlewares/auth";
import cookieParser from "cookie-parser";
import cors from "cors";
import productRoutes from "./routes/productRoutes";

dotenv.config();

const app: Application = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

connectDB();

app.use("/api/products", productRoutes);

const PORT: number = parseInt(process.env.PORT || "3001", 10);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
