import EmployeeSidebar from "../components/EmployeeSidebar";
import { Outlet } from "react-router-dom";

export default function EmployeeLayout() {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <EmployeeSidebar />

      <main className="flex-1 ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
}