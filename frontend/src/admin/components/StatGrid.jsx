import StatCard from "./StatCard";

export default function StatGrid({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard title="Total Tasks" value={stats?.totalTasks ?? 0} />
      <StatCard title="Completed Tasks" value={stats?.completedTasks ?? 0} />
      <StatCard title="Pending Tasks" value={stats?.pendingTasks ?? 0} />
      <StatCard title="Total Employees" value={stats?.totalUsers ?? 0} />
    </div>
  );
}