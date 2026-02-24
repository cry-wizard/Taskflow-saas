import { motion } from "framer-motion";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import api from "../../api/axios";

export default function RegisterForm({ goLogin }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "employee", // ✅ default role
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", form);

      // after register → go to login
      goLogin();
    } catch (err) {
      console.error("Register failed", err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.35 }}
      className="relative z-10 w-full max-w-md px-6"
    >
      <div className="bg-white/90 backdrop-blur-xl border rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
          Create your account
        </h2>

        <form onSubmit={submit} className="space-y-4">

          {/* First + Last */}
          <div className="grid grid-cols-2 gap-3">
            <input
              name="firstName"
              placeholder="First name"
              className="input-field"
              onChange={handleChange}
            />
            <input
              name="lastName"
              placeholder="Last name"
              className="input-field"
              onChange={handleChange}
            />
          </div>

          <input
            name="email"
            placeholder="Email address"
            className="input-field"
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="input-field"
            onChange={handleChange}
          />

          {/* ✅ ROLE SELECTOR */}
          <select
            name="role"
            className="input-field"
            onChange={handleChange}
            value={form.role}
          >
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select>

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg flex justify-center gap-2">
            <UserPlus size={18} />
            Create Account
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-6">
          Already have an account?
          <button
            type="button"
            onClick={goLogin}
            className="text-blue-600 ml-1 hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </motion.div>
  );
}