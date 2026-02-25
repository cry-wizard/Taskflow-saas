import { Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "./admin/layout/AdminLayout";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminTaskList from "./admin/pages/AdminTaskList";
import AuthPage from "./auth/pages/AuthPage";
import AdminEmployees from "./admin/pages/AdminEmployees";
import EmployeeLayout from "./employee/layout/EmployeeLayout";
import EmployeeDashboard from "./employee/pages/EmployeeDashboard";
/* ✅ Protected Route */
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function App() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<AuthPage />} />
      {/* PRIVATE */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="tasks" element={<AdminTaskList />} />
        <Route path="employees" element={<AdminEmployees />} /> 
      </Route>
      <Route path="/employee" element={<EmployeeLayout />}>
  <Route index element={<EmployeeDashboard />} />
</Route>
    </Routes>
  );
}