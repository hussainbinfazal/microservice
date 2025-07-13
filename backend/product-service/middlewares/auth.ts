import jwt, { JwtPayload } from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";
import axios from "axios";

declare module "express-serve-static-core" {
  interface Request {
    user?: any; // You can define a better type if you know the user shape
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

    const decodedUser = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload & { _id?: string };

    const user = await axios.get(
      `${process.env.AUTH_SERVICE_URL}/api/users/${decodedUser._id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!user.data) {
      res.status(401).json({ message: "Not authorized, user not found" });
      return;
    }
    req.user = user.data;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

export { protect };
