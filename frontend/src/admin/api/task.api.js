import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const fetchTasks = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(`${BASE_URL}/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Tasks API:", res.data);

    return res.data;
  } catch (err) {
    console.error(err);
  }
};