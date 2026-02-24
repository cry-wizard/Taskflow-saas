import {
  LayoutDashboard,
  CheckSquare,
  Users,
  BarChart3,
  Settings,
  LogOut,
  UserCircle,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

/* ⭐ reusable sidebar item */
const SidebarItem = ({ icon, label, onClick }) => (
  <div
    onClick={onClick}
    className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer text-slate-400 hover:text-white hover:bg-white/5 transition"
  >
    {icon}
    <span className="font-medium text-sm">{label}</span>
  </div>
);

export default function Sidebar() {
  const navigate = useNavigate();

  /* ✅ REAL LOGOUT */
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside className="w-64 bg-[#1A2B4B] text-white flex flex-col p-6">
      {/* LOGO */}
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
          <LayoutDashboard className="w-6 h-6" />
        </div>
        <span className="text-xl font-bold">TaskFlow</span>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 space-y-1">
        <NavLink to="/admin">
          <SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" />
        </NavLink>

        <NavLink to="/admin/tasks">
          <SidebarItem icon={<CheckSquare size={20} />} label="Tasks" />
        </NavLink>

        <NavLink to="/admin/employees">
          <SidebarItem icon={<Users size={20} />} label="Employees" />
        </NavLink>
        <SidebarItem icon={<BarChart3 size={20} />} label="Reports" />
        <SidebarItem icon={<Settings size={20} />} label="Settings" />
      </nav>

      {/* FOOTER */}
      <div className="pt-6 border-t border-white/10 space-y-1">
        <SidebarItem icon={<UserCircle size={20} />} label="User Profile" />

        {/* ⭐ REAL BUTTON */}
        <SidebarItem
          icon={<LogOut size={20} />}
          label="Logout"
          onClick={handleLogout}
        />
      </div>
    </aside>
  );
}
