import express from "express";
import { protect } from "../../middleware/auth.middleware.js";
import { authorize } from "../../middleware/role.middleware.js";
import {
  getAdminDashboard,
  getEmployeeDashboard
} from "../../controller/dashboard.controller.js";

const router = express.Router();

router.get("/admin", protect, authorize("admin"), getAdminDashboard);

router.get("/employee", protect, authorize("employee"), getEmployeeDashboard);

export default router;