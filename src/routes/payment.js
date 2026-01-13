import express from "express";
import authMiddleware from "../middlewares/user.js";
import { initializePayment, verifyPayment } from "../controllers/payment.js";
const router = express.Router();

router.post("/initialize", authMiddleware, initializePayment);
router.get("/verify", authMiddleware, verifyPayment);

export default router;
