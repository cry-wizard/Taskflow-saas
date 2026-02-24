import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "taskflow-saas-backend",
    uptime: process.uptime(),
    timestamp: new Date()
  });
});

export default router;