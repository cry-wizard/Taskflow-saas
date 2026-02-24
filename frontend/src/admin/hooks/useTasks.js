import { useEffect, useState } from "react";
import { fetchTasks } from "../api/task.api";

export default function useTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks().then((data) => {
      setTasks(data || []);
    });
  }, []);

  return tasks;
}