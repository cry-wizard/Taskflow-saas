import { LayoutDashboard, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

export default function EmployeeSidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside className="w-64 bg-[#1E3A8A] text-white flex flex-col fixed h-full">
      <div className="p-6 font-bold text-xl">TaskFlow</div>

      <nav className="flex-1 px-4 space-y-2">
        <NavLink to="/employee">
          <div className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg">
            <LayoutDashboard size={18} />
            Dashboard
          </div>
        </NavLink>
      </nav>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg w-full"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}