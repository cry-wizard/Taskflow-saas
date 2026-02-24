import express from "express";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  updateTaskStatus
} from "../../controller/task.controller.js";
import { protect } from "../../middleware/auth.middleware.js";
import { authorize } from "../../middleware/role.middleware.js";

const router = express.Router();

// Get all tasks
router.get("/", protect, getTasks);
// Admin create task
router.post("/", protect, authorize("admin"), createTask);
// Admin edit task
router.patch("/:id", protect, authorize("admin"), updateTask);

// Admin delete task
router.delete("/:id", protect, authorize("admin"), deleteTask);

// Employee or admin update status
router.patch("/:id/status", protect, updateTaskStatus);

export default router;