import express, { Router } from "express";
import { registerUser, loginUser } from "../controller/userController";
// import { protect } from "../middlewares/isAuthenticated";
import { getUserById } from "../controller/userController";
const router: Router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:id", getUserById);

export default router;
