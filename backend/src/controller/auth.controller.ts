import type { Request, Response } from "express";
import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

export const register = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  const hash = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hash,
    role,
  });

  res.json(user);
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const match = await bcrypt.compare(password, user.password as  string);
  if (!match) return res.status(400).json({ message: "Invalid credentials" });

  const token = generateToken(user._id.toString(), user.role);

  res.json({ token, user });
};