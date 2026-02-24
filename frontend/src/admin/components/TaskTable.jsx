import { Search, Filter, MoreHorizontal } from "lucide-react";
import PriorityBadge from "./PriorityBadge";
import StatusBadge from "./StatusBadge";

export default function TaskTable({ tasks, searchQuery, setSearchQuery }) {
  const filteredTasks = tasks.filter(
    (task) =>
      task.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.assignedTo?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
      <div className="p-6 border-b flex justify-between items-center">
        <h2 className="text-lg font-bold">Recent Tasks</h2>

        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-slate-50 border rounded-xl text-sm"
            />
          </div>

          <button className="flex items-center gap-2 px-4 py-2 border rounded-xl text-sm">
            <Filter size={16} />
            Filter
          </button>
        </div>
      </div>

      <table className="w-full text-left">
        <tbody>
          {filteredTasks.map((task) => (
            <tr key={task._id} className="hover:bg-slate-50">
              <td className="px-6 py-4 font-semibold">{task.title}</td>
              <td className="px-6 py-4">{task.assignedTo?.name}</td>
              <td className="px-6 py-4">
                <PriorityBadge priority={task.priority} />
              </td>
              <td className="px-6 py-4">
                {new Date(task.deadline).toLocaleDateString()}
              </td>
              <td className="px-6 py-4">
                <StatusBadge status={task.status} />
              </td>
              <td className="px-6 py-4 text-right">
                <MoreHorizontal size={18} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}