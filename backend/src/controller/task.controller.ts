import type { Request, Response } from "express";
import Task from "../models/Task.model.js";

export const createTask = async (req: Request, res: Response) => {
  const { title, description, priority, assignedTo } = req.body;

  const task = await Task.create({
    title,
    description,
    priority,
    assignedTo,
    createdBy: req.user.id,
  });

  res.json(task);
};

export const getTasks = async (req: Request, res: Response) => {

  let query: any = {};

  // employee sees only assigned tasks
  if (req.user.role === "employee") {
    query = { assignedTo: req.user.id };
  }

  const tasks = await Task.find(query)
    .populate("assignedTo", "name email");

  res.json(tasks);
};

export const updateTask = async (req: Request, res: Response) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(task);
};

export const deleteTask = async (req: Request, res: Response) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted successfully" });
};

export const updateTaskStatus = async (req: Request, res: Response) => {

  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  // employee can only update their own task
 if (
  req.user.role === "employee" &&
  (!task.assignedTo ||
   task.assignedTo.toString() !== req.user.id)
) {
  return res.status(403).json({ message: "Forbidden" });
}

  task.status = req.body.status;
  await task.save();

  res.json(task);
};