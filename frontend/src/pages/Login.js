import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import bg from "../assests/bg.png"; // 👈 change if needed

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", res.data.user.name);

      navigate("/chat");
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div
      className="h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md"></div>

      {/* Glow Background */}
      <div className="absolute w-[400px] h-[400px] bg-cyan-500/20 blur-3xl rounded-full top-10 left-10 animate-pulse"></div>

      {/* Card */}
      <div className="relative z-10 w-80 p-8 rounded-2xl bg-black/40 border border-cyan-400 backdrop-blur-xl shadow-[0_0_40px_#22d3ee]">

        <h2 className="text-2xl text-center text-cyan-300 font-bold mb-6">
          Welcome Back
        </h2>

        <input
          placeholder="Email"
          className="w-full mb-4 p-3 bg-transparent border border-cyan-400 rounded-lg text-white focus:outline-none focus:shadow-[0_0_15px_#22d3ee] transition"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-5 p-3 bg-transparent border border-cyan-400 rounded-lg text-white focus:outline-none focus:shadow-[0_0_15px_#22d3ee] transition"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          onClick={handleLogin}
          className="w-full p-3 rounded-lg bg-cyan-400 text-black font-semibold hover:bg-cyan-300 shadow-[0_0_20px_#22d3ee] transition"
        >
          Login
        </button>

        <p className="mt-4 text-center text-sm text-gray-300">
          <Link to="/signup" className="text-cyan-300 hover:underline">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}