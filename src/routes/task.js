import express from "express";
import { createTask, getTask } from "../controllers/task.js";
import authMiddleware from "../middlewares/user.js";

const router = express.Router();

router.post("/", authMiddleware, createTask);
router.get("/", authMiddleware, getTask);

export default router;
