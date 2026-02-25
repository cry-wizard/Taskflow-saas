import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        /* 🔥 CHANGE ENDPOINT IF NEEDED */
        const res = await api.get("/employees"); 
        setUsers(res.data || []);
      } catch (err) {
        console.log("Users fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, loading };
}