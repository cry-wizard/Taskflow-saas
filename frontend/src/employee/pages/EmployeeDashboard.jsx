import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function EmployeeDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      const res = await api.get("/dashboard/employee");
      setData(res.data);
    };

    fetchDashboard();
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <>
      {/* HEADER */}
      <header className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-3xl font-bold">
            Welcome, {data.user?.name || "Employee"}
          </h2>
        </div>
      </header>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-600 p-6 rounded-2xl text-white">
          <p>Total Assigned Tasks</p>
          <h3 className="text-4xl font-bold">{data.totalTasks}</h3>
        </div>

        <div className="bg-emerald-500 p-6 rounded-2xl text-white">
          <p>Tasks Completed</p>
          <h3 className="text-4xl font-bold">{data.completedTasks}</h3>
        </div>

        <div className="bg-orange-500 p-6 rounded-2xl text-white">
          <p>Pending Tasks</p>
          <h3 className="text-4xl font-bold">{data.pendingTasks}</h3>
        </div>
      </div>

      {/* TASK TABLE */}
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 text-xs uppercase">
            <tr>
              <th className="px-6 py-4">Task</th>
              <th className="px-6 py-4">Deadline</th>
              <th className="px-6 py-4">Priority</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {data.tasks.map((task) => (
              <tr key={task._id} className="border-t">
                <td className="px-6 py-4">{task.title}</td>
                <td className="px-6 py-4">
                  {new Date(task.deadline).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">{task.priority}</td>
                <td className="px-6 py-4">{task.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}