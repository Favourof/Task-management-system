import express from "express";
import authMiddleware from "../middlewares/user.js";
import { optimizeTask } from "../controllers/aiController.js";

const router = express.Router();

router.post("/optimize", authMiddleware, optimizeTask);

export default router;
