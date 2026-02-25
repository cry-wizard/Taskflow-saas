import { useState, useMemo } from "react";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import api from "../../api/axios";

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

  const [statusDrafts, setStatusDrafts] = useState({});
  const [confirmTaskId, setConfirmTaskId] = useState(null);

  const token = localStorage.getItem("token");
  const userRole = token ? JSON.parse(atob(token.split(".")[1])).role : null;

  /* 🔥 FETCH TASKS */
  const tasks = useTasks();

  /* 🔥 FILTER */
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
        <h2 className="text-2xl font-bold text-[#1B2559]">Task Management</h2>
      </header>

      {/* SEARCH + ADD */}
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

          {userRole === "admin" && (
            <button
              onClick={() => setIsCreateOpen(true)}
              className="ml-auto bg-[#1D68D5] hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2"
            >
              <Plus size={18} />
              Add New Task
            </button>
          )}
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
                  {task.deadline
                    ? new Date(task.deadline).toLocaleDateString()
                    : "N/A"}
                </td>

                <td className="px-6 py-4">{task.assignedTo?.name || "N/A"}</td>

                {/* STATUS COLUMN */}
                <td className="px-6 py-4 relative">
                  {userRole === "admin" ? (
                    <StatusBadge status={task.status} />
                  ) : (
                    <>
                      <select
                        value={statusDrafts[task._id] ?? task.status}
                        onChange={(e) => {
                          setStatusDrafts((prev) => ({
                            ...prev,
                            [task._id]: e.target.value,
                          }));
                          setConfirmTaskId(task._id);
                        }}
                        className="border rounded-lg px-3 py-1 text-sm"
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>

                      {confirmTaskId === task._id && (
                        <div className="mt-2 inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg shadow px-3 py-2">
                          <button
                            className="bg-green-600 hover:bg-green-700 text-white text-xs font-semibold px-3 py-1 rounded-md"
                            onClick={async () => {
                              try {
                                await api.patch(`/tasks/${task._id}/status`, {
                                  status: statusDrafts[task._id],
                                });

                                setConfirmTaskId(null);
                                window.location.reload();
                              } catch (err) {
                                console.log(err);
                              }
                            }}
                          >
                            Confirm
                          </button>

                          <button
                            className="text-xs text-gray-500"
                            onClick={() => {
                              setConfirmTaskId(null);
                              setStatusDrafts((prev) => {
                                const copy = { ...prev };
                                delete copy[task._id];
                                return copy;
                              });
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </td>

                {/* ACTION COLUMN (ADMIN ONLY) */}
                <td className="px-6 py-4">
                  {userRole === "admin" && (
                    <div className="flex gap-2">
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
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* MODALS */}
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
        onDeleted={() => window.location.reload()}
      />

      <CreateTaskModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreated={() => window.location.reload()}
      />
    </>
  );
}
