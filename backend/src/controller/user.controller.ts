import type { Request, Response } from "express";
import User from "../models/User.model.js";

export const getEmployees = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("_id name role department");

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};