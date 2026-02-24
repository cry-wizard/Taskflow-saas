import { useState, useMemo } from "react";

import useTasks from "../hooks/useTasks";
import PriorityBadge from "../components/PriorityBadge";
import StatusBadge from "../components/StatusBadge";

import TaskListHeader from "../components/TaskListHeader";
import TaskFilterBar from "../components/TaskFilterBar";

import { Pencil, Trash2 } from "lucide-react";

export default function AdminTaskList() {
  const [searchQuery, setSearchQuery] = useState("");

  const tasks = useTasks();

  const filteredTasks = useMemo(() => {
    return tasks.filter(
      (task) =>
        task.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.assignedTo?.name
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase())
    );
  }, [tasks, searchQuery]);

  return (
    <>
      <TaskListHeader />

      <TaskFilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm overflow-hidden"
      >
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50">
              <th className="px-6 py-4 text-xs font-bold text-slate-500">
                Title
              </th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500">
                Description
              </th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500">
                Priority
              </th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500">
                Deadline
              </th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500">
                Assigned User
              </th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500">
                Status
              </th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {filteredTasks.map((task) => (
              <tr key={task._id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-semibold">{task.title}</td>

                <td className="px-6 py-4 text-slate-500">
                  {task.description}
                </td>

                <td className="px-6 py-4">
                  <PriorityBadge priority={task.priority} />
                </td>

                <td className="px-6 py-4 text-sm">
                  {new Date(task.deadline).toLocaleDateString()}
                </td>

                <td className="px-6 py-4">
                  {task.assignedTo?.name || "N/A"}
                </td>

                <td className="px-6 py-4">
                  <StatusBadge status={task.status} />
                </td>

                <td className="px-6 py-4 flex gap-2">
                  <Pencil size={16} />
                  <Trash2 size={16} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </>
  );
}