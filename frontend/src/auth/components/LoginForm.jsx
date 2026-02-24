import { useState } from "react";
import { motion } from "framer-motion";
import { Check, AlertCircle } from "lucide-react";

export default function LoginForm({ onLogin, goRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    onLogin(email, password, setError);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="relative z-10 w-full max-w-md px-6"
    >
      <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
        {/* HEADER */}
        <div className="bg-slate-50 p-8 flex flex-col items-center border-b">
          <div className="relative text-blue-700 font-black text-2xl italic">
            T<span className="text-slate-500 ml-[-4px]">M</span>
            <Check className="absolute -bottom-1 -right-1 w-4 h-4 text-blue-600" />
          </div>
        </div>

        <div className="p-8">
          <h2 className="text-2xl font-bold mb-6">Secure Login</h2>

          <form onSubmit={submit} className="space-y-5">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2.5 border rounded-md focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div>
              <input
                type="password"
                placeholder="Enter your password"
                className={`w-full px-4 py-2.5 border rounded-md ${
                  error ? "border-red-300 bg-red-50" : ""
                }`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && (
                <div className="flex gap-2 mt-2 text-red-600 text-xs">
                  <AlertCircle size={14} />
                  Incorrect email or password
                </div>
              )}
            </div>

            <button className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-md">
              Login
            </button>
          </form>

          <p className="text-sm text-center mt-6">
            Don't have an account?
            <button onClick={goRegister} className="text-blue-600 ml-1">
              Register Now
            </button>
          </p>
        </div>
      </div>
    </motion.div>
  );
}