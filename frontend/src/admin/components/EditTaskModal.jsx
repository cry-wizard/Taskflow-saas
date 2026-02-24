import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import api from "../../api/axios";

export default function EditTaskModal({ isOpen, task, onClose }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "Pending",
    deadline: "",
    assignedTo: "",
  });

  /* ✅ Autofill selected task */
  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || "",
        description: task.description || "",
        priority: task.priority || "medium",
        status: task.status || "Pending",
        deadline: task.deadline?.slice(0, 10) || "",
        assignedTo: task.assignedTo?._id || "",
      });
    }
  }, [task]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /* ✅ Update API */
  const handleSave = async () => {
    try {
      await api.patch(`/tasks/${task._id}`, form);
      onClose();
      window.location.reload(); // later use refetch()
    } catch (err) {
      console.log("Update failed", err);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">

          <motion.div
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.94, opacity: 0 }}
            className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* ===== HEADER ===== */}
            <div className="flex justify-between items-center px-8 py-6 border-b">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Edit Task
                </h2>
                <p className="text-sm text-slate-500">
                  Update task information
                </p>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            {/* ===== BODY ===== */}
            <div className="p-8 space-y-6 max-h-[65vh] overflow-y-auto">

              {/* TITLE */}
              <div>
                <label className="text-sm font-semibold text-slate-600">
                  Title
                </label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="text-sm font-semibold text-slate-600">
                  Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded-lg px-4 py-3 min-h-[110px] focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* GRID SECTION */}
              <div className="grid grid-cols-2 gap-4">

                {/* PRIORITY */}
                <div>
                  <label className="text-sm font-semibold text-slate-600">
                    Priority
                  </label>
                  <select
                    name="priority"
                    value={form.priority}
                    onChange={handleChange}
                    className="mt-1 w-full border rounded-lg px-4 py-3"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                {/* STATUS (ADMIN CONTROL) */}
                <div>
                  <label className="text-sm font-semibold text-slate-600">
                    Status
                  </label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="mt-1 w-full border rounded-lg px-4 py-3"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              {/* DEADLINE */}
              <div>
                <label className="text-sm font-semibold text-slate-600">
                  Deadline
                </label>
                <input
                  type="date"
                  name="deadline"
                  value={form.deadline}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded-lg px-4 py-3"
                />
              </div>
            </div>

            {/* ===== FOOTER ===== */}
            <div className="flex justify-end gap-3 px-8 py-6 border-t bg-slate-50">
              <button
                onClick={onClose}
                className="px-6 py-2 border rounded-lg font-medium hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="px-8 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 shadow"
              >
                Save Changes
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}