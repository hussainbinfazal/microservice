
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../model/userModel";
import { Response, Request, NextFunction } from "express";
import { Document } from "mongoose";

declare module "express-serve-static-core" {
  interface Request {
    user?: Document;
  }
}

const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let token: string | undefined;

    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies?.token) {
      token = req.cookies.token;
    }

    if (!token) {
      res.status(401).json({ message: "Not authorized, no token" });
      return;
    }

    const decodedUser = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload & { _id?: string };
    const authenticatedUser = await User.findById(decodedUser._id).select("-password");
    if (!authenticatedUser) {
      res.status(401).json({ message: "Not authorized, user not found" });
      return;
    }
    req.user = authenticatedUser;
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

export { protect };
