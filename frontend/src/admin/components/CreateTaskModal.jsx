import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, Calendar, Flag, User } from "lucide-react"; // Icons add visual cues
import api from "../../api/axios";

export default function CreateTaskModal({ isOpen, onClose, onCreated }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    deadline: "",
    assignedTo: "",
  });

  useEffect(() => {
    if (!isOpen) return;

    const fetchEmployees = async () => {
      setFetching(true);
      try {
        const res = await api.get("/employees");
        setEmployees(res.data);
      } catch (err) {
        setError("Could not load employees. Please try again.");
      } finally {
        setFetching(false);
      }
    };

    fetchEmployees();
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError(""); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.post("/tasks", form);
      onCreated();
      handleClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create task.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setForm({
      title: "",
      description: "",
      priority: "Medium",
      deadline: "",
      assignedTo: "",
    });
    setError("");
    onClose();
  };

  // Reusable Tailwind classes for consistency
  const inputClasses =
    "w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-gray-700";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-1 ml-1";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b">
              <h2 className="text-xl font-bold text-gray-800">New Task</h2>
              <button
                onClick={handleClose}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg">
                  {error}
                </div>
              )}

              <div>
                <label className={labelClasses}>Task Title</label>
                <input
                  name="title"
                  placeholder="e.g. Design System Update"
                  value={form.title}
                  onChange={handleChange}
                  className={inputClasses}
                  required
                />
              </div>

              <div>
                <label className={labelClasses}>Description</label>
                <textarea
                  name="description"
                  placeholder="What needs to be done?"
                  value={form.description}
                  onChange={handleChange}
                  rows="3"
                  className={`${inputClasses} resize-none`}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClasses}>Priority</label>
                  <div className="relative">
                    <Flag className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <select
                      name="priority"
                      value={form.priority}
                      onChange={handleChange}
                      className={`${inputClasses} pl-10 appearance-none`}
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className={labelClasses}>Deadline</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <input
                      type="date"
                      name="deadline"
                      value={form.deadline}
                      onChange={handleChange}
                      className={`${inputClasses} pl-10`}
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className={labelClasses}>Assignee</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <select
                    name="assignedTo"
                    value={form.assignedTo}
                    onChange={handleChange}
                    className={`${inputClasses} pl-10 appearance-none`}
                    required
                    disabled={fetching}
                  >
                    <option value="">
                      {fetching ? "Loading team..." : "Select Employee"}
                    </option>
                    {employees.map((emp) => (
                      <option key={emp._id} value={emp._id}>
                        {emp.name} — {emp.role}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  Discard
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center min-w-[120px] px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-95"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    "Create Task"
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
