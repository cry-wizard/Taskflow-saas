import express from "express";
import { protect } from "../../middleware/auth.middleware.js";
import { authorize } from "../../middleware/role.middleware.js";
import { getEmployees } from "../../controller/user.controller.js";

const router = express.Router();

router.get("/employees", protect, authorize("admin"), getEmployees);

export default router;