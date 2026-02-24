import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-x-8 py-10 rounded-xl">
        Register Page
        <button onClick={()=>navigate("/login")} className="btn-primary mt-4">
          Go Login
        </button>
      </div>
    </div>
  );
}