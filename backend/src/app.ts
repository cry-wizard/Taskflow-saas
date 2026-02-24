import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import healthRoutes from "./routes/v1/health.routes.js";
import authRoutes from "./routes/v1/auth.routes.js";
import taskRoutes from "./routes/v1/task.routes.js";
import dashboardRoutes from "./routes/v1/dashboard.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/health", healthRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tasks", taskRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

export default app;