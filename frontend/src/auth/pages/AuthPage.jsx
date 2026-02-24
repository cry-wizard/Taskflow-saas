import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

export default function AuthPage() {
  const [screen, setScreen] = useState("login");
  const navigate = useNavigate();

  /* auto login if token exists */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/admin");
  }, []);

  const handleLogin = async (email, password, setError) => {
    try {
      const res = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);

      setError(false);
      navigate("/admin");
    } catch {
      setError(true);
    }
  };

  const handleRegister = () => {
    setScreen("login");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative overflow-hidden"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1920")',
      }}
    >
      <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm"></div>

      <AnimatePresence mode="wait">
        {screen === "login" && (
          <LoginForm
            key="login"
            onLogin={handleLogin}
            goRegister={() => setScreen("register")}
          />
        )}

        {screen === "register" && (
          <RegisterForm
            key="register"
            onRegister={handleRegister}
            goLogin={() => setScreen("login")}
          />
        )}
      </AnimatePresence>
    </div>
  );
}