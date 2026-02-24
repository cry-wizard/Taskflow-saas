import { useEffect, useState } from "react";
import { fetchDashboard } from "../api/dashboard.api";

export default function useDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchDashboard().then((data) => {
      setStats(data);
    });
  }, []);

  return stats;
}