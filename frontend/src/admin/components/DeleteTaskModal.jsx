import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import api from "../../api/axios";

export default function DeleteTaskModal({ isOpen, task, onClose, onDeleted }) {
  if (!task) return null;

  const handleDelete = async () => {
    try {
      await api.delete(`/tasks/${task._id}`);

      onDeleted(); // refetch tasks
      onClose();
    } catch (err) {
      console.log("Delete failed", err);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">

          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border"
          >
            <div className="p-6">

              {/* HEADER */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                  <AlertTriangle size={26} />
                </div>

                <div>
                  <h2 className="text-xl font-bold">Confirm Deletion</h2>
                  <p className="text-sm text-slate-500">
                    This action is permanent
                  </p>
                </div>
              </div>

              {/* CONTENT */}
              <p className="text-slate-700 mb-3">
                Are you sure you want to delete:
              </p>

              <div className="bg-slate-50 p-4 rounded-lg border">
                <span className="font-semibold text-lg">
                  {task.title}
                </span>
              </div>

              <p className="mt-4 text-sm text-slate-500">
                This will remove the task permanently. This action cannot be undone.
              </p>

              {/* ACTIONS */}
              <div className="flex gap-3 mt-8">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2.5 rounded-lg border font-semibold hover:bg-slate-100"
                >
                  Cancel
                </button>

                <button
                  onClick={handleDelete}
                  className="flex-1 px-4 py-2.5 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 shadow-lg"
                >
                  Delete Task
                </button>
              </div>
            </div>

            {/* FOOTER */}
            <div className="bg-slate-50 px-6 py-3 border-t text-xs text-slate-400 flex items-center gap-2">
              🔒 Authorized administrator action required
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}