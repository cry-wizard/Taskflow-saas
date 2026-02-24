import { useState, useMemo } from "react";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

import useTasks from "../hooks/useTasks";
import PriorityBadge from "../components/PriorityBadge";
import StatusBadge from "../components/StatusBadge";
import EditTaskModal from "../components/EditTaskModal";
import DeleteTaskModal from "../components/DeleteTaskModal";
import CreateTaskModal from "../components/CreateTaskModal";

export default function AdminTaskList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteTask, setDeleteTask] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // ✅ Dynamic data from API
  const tasks = useTasks();

  // ✅ Filter logic
  const filteredTasks = useMemo(() => {
    return tasks.filter(
      (task) =>
        task.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.assignedTo?.name
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()),
    );
  }, [tasks, searchQuery]);

  return (
    <>
      {/* HEADER */}
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-[#1B2559]">
          Admin Task Management List
        </h2>
      </header>

      {/* FILTER BAR */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[300px]">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <button
            onClick={() => setIsCreateOpen(true)}
            className="ml-auto bg-[#1D68D5] hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2"
          >
            <Plus size={18} />
            Add New Task
          </button>
        </div>
      </div>

      {/* TABLE */}
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

                <td className="px-6 py-4 text-slate-500">{task.description}</td>

                <td className="px-6 py-4">
                  <PriorityBadge priority={task.priority} />
                </td>

                <td className="px-6 py-4 text-sm">
                  {new Date(task.deadline).toLocaleDateString()}
                </td>

                <td className="px-6 py-4">{task.assignedTo?.name || "N/A"}</td>

                <td className="px-6 py-4">
                  <StatusBadge status={task.status} />
                </td>

                <td className="px-6 py-4 flex gap-2">
                  <Pencil
                    size={16}
                    className="cursor-pointer"
                    onClick={() => {
                      setSelectedTask(task);
                      setIsEditOpen(true);
                    }}
                  />
                  <Trash2
                    size={16}
                    className="cursor-pointer text-red-500"
                    onClick={() => {
                      setDeleteTask(task);
                      setIsDeleteOpen(true);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
      <EditTaskModal
        isOpen={isEditOpen}
        task={selectedTask}
        onClose={() => {
          setIsEditOpen(false);
          setSelectedTask(null);
        }}
      />
      <DeleteTaskModal
        isOpen={isDeleteOpen}
        task={deleteTask}
        onClose={() => setIsDeleteOpen(false)}
        onDeleted={() => window.location.reload()} // later use refetch
      />
      <CreateTaskModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreated={() => window.location.reload()}
      />
    </>
  );
}
