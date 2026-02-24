export default function PriorityBadge({ priority }) {
  const styles = {
    High: "bg-red-50 text-red-600 border-red-100",
    Medium: "bg-orange-50 text-orange-600 border-orange-100",
    Low: "bg-blue-50 text-blue-600 border-blue-100",
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-md text-xs border ${styles[priority]}`}>
      {priority}
    </span>
  );
}