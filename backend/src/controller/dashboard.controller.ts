import type { Request, Response } from "express";
import Task from "../models/Task.model.js";
import User from "../models/User.model.js";


export const getAdminDashboard = async (req: Request, res: Response) => {

  const totalTasks = await Task.countDocuments();

  const completedTasks = await Task.countDocuments({
    status: "Completed",
  });

  const pendingTasks = await Task.countDocuments({
    status: { $ne: "Completed" },
  });

  const totalUsers = await User.countDocuments({
    role: "employee",
  });

  res.json({
    totalTasks,
    completedTasks,
    pendingTasks,
    totalUsers,
  });
};


// 👨‍💻 Employee Dashboard
export const getEmployeeDashboard = async (req: Request, res: Response) => {

  const userId = req.user.id;

  const myTasks = await Task.countDocuments({
    assignedTo: userId,
  });

  const completedTasks = await Task.countDocuments({
    assignedTo: userId,
    status: "Completed",
  });

  const pendingTasks = await Task.countDocuments({
    assignedTo: userId,
    status: { $ne: "Completed" },
  });

  res.json({
    myTasks,
    completedTasks,
    pendingTasks,
  });
};