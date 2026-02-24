import User from "../models/User.model.js";

export const getEmployees = async (req, res) => {
  try {
    const employees = await User.find({ role: "employee" }).select(
      "_id name role department"
    );

    res.status(200).json(employees);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};