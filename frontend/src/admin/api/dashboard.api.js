import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

// 👉 API function
export const fetchDashboard = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(`${BASE_URL}/dashboard/admin`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Dashboard API Response:", res.data);

    return res.data;
  } catch (err) {
    console.error("API Error:", err);
  }
};