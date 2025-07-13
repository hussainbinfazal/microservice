import jwt from "jsonwebtoken";
import User from "../model/productModel";
import { Response } from "express"; // <-- Add this import

import { IUser } from "../model/productModel"; // Import IUser interface
export const generateToken = (
  _id: string,
  user: IUser ,
  res: Response
): string => {
  const token = jwt.sign({ _id: _id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.cookie("token", token, {
    httpOnly: true,
    // secure: true,
    sameSite: "none",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
  res.setHeader("Authorization", `Bearer ${token}`);
  return token;
};
