import { Plus } from "lucide-react";

export default function Header() {
  return (
    <header className="flex justify-between items-center mb-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2">
        <Plus size={20} />
        Create Task
      </button>
    </header>
  );
}