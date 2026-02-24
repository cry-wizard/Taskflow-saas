export default function StatusBadge({ status }) {
  const styles = {
    "In Progress": "bg-blue-50 text-blue-600 border-blue-100",
    Pending: "bg-orange-50 text-orange-600 border-orange-100",
    Completed: "bg-green-50 text-green-600 border-green-100",
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs border ${styles[status]}`}>
      {status}
    </span>
  );
}