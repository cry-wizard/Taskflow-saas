import api from "../../api/axios";

/* GET ALL EMPLOYEES */
export const fetchUsers = async () => {
  try {
    const res = await api.get("/users"); // adjust endpoint if needed
    return res.data.data || res.data;
  } catch (err) {
    console.error("Fetch users failed", err);
    return [];
  }
};