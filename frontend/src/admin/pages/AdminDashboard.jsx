import { useState } from "react";
import Header from "../components/Header";
import StatGrid from "../components/StatGrid";
import TaskTable from "../components/TaskTable";
import useDashboard from "../hooks/useDashboard";
import useTasks from "../hooks/useTasks";

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  const stats = useDashboard();
  const tasks = useTasks();

  return (
    <div className="flex h-screen bg-[#F8F9FB]">
      <main className="flex-1 overflow-y-auto p-8">
        <Header />
        <StatGrid stats={stats} />
        <TaskTable
          tasks={tasks}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </main>
    </div>
  );
}