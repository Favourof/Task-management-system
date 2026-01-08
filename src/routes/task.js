import express from "express";
import {
  createTask,
  deleteTask,
  getTask,
  updateTask,
} from "../controllers/task.js";
import authMiddleware from "../middlewares/user.js";

const router = express.Router();

router.use(authMiddleware);
router.post("/", createTask);
router.get("/", getTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
