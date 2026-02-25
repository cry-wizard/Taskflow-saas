import { useState, useMemo } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import useUsers from "../hooks/useUsers";

export default function AdminEmployees() {
  const [searchQuery, setSearchQuery] = useState("");

  const { users, loading } = useUsers();

  /* ✅ FILTER SAFE */
  const filteredTeam = useMemo(() => {
    return users.filter((member) =>
      (member.name || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      (member.role || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }, [users, searchQuery]);

  return (
    <div>
      {/* HEADER */}
      <header className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold text-slate-800">
          Team Management
        </h2>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg flex items-center gap-2">
          <Plus size={20} />
          Add New User
        </button>
      </header>

      {/* SEARCH */}
      <div className="relative mb-8 max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white border rounded-xl shadow-sm"
        />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50">
              <th className="px-8 py-5 text-sm font-semibold">Name</th>
              <th className="px-8 py-5 text-sm font-semibold">Role</th>
              <th className="px-8 py-5 text-sm font-semibold">Department</th>
              <th className="px-8 py-5 text-sm font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {loading ? (
              <tr>
                <td colSpan={4} className="px-8 py-10 text-center text-slate-400">
                  Loading members...
                </td>
              </tr>
            ) : filteredTeam.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-8 py-10 text-center text-slate-400">
                  No users found
                </td>
              </tr>
            ) : (
              filteredTeam.map((member) => (
                <motion.tr
                  key={member._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-slate-50"
                >
                  <td className="px-8 py-5 font-medium">
                    {member.name || "Unnamed"}
                  </td>

                  <td className="px-8 py-5 capitalize">
                    {member.role}
                  </td>

                  <td className="px-8 py-5">
                    {member.department || "N/A"}
                  </td>

                  <td className="px-8 py-5 flex gap-6">
                    <button className="flex items-center gap-1 text-blue-600">
                      <Pencil size={16} /> Edit
                    </button>

                    <button className="flex items-center gap-1 text-rose-500">
                      <Trash2 size={16} /> Deactivate
                    </button>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>

        {/* PAGINATION UI */}
        <div className="px-8 py-5 flex justify-end gap-6 border-t">
          <button className="p-1.5 border rounded">
            <ChevronLeft size={20} />
          </button>
          <button className="p-1.5 border rounded">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}