import express from "express";
import {
  createTask,
  deleteTask,
  getSingleTask,
  getTask,
  updateTask,
} from "../controllers/task.js";
import authMiddleware from "../middlewares/user.js";

const router = express.Router();

router.use(authMiddleware);
router.post("/", createTask);
router.get("/", getTask);
router.get("/:id", getSingleTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
