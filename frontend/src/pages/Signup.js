import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import bg from "../assests/bg.png"; // 👈 change if needed

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSignup = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/signup",
        form
      );

      localStorage.setItem("user", form.name);

      navigate("/");
    } catch {
      alert("Signup failed");
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

      {/* Glow */}
      <div className="absolute w-[400px] h-[400px] bg-purple-500/20 blur-3xl rounded-full bottom-10 right-10 animate-pulse"></div>

      {/* Card */}
      <div className="relative z-10 w-80 p-8 rounded-2xl bg-black/40 border border-purple-400 backdrop-blur-xl shadow-[0_0_40px_#a855f7]">

        <h2 className="text-2xl text-center text-purple-300 font-bold mb-6">
          Create Account
        </h2>

        <input
          placeholder="Name"
          className="w-full mb-3 p-3 bg-transparent border border-purple-400 rounded-lg text-white focus:outline-none focus:shadow-[0_0_15px_#a855f7]"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Email"
          className="w-full mb-3 p-3 bg-transparent border border-purple-400 rounded-lg text-white focus:outline-none focus:shadow-[0_0_15px_#a855f7]"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-5 p-3 bg-transparent border border-purple-400 rounded-lg text-white focus:outline-none focus:shadow-[0_0_15px_#a855f7]"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          onClick={handleSignup}
          className="w-full p-3 rounded-lg bg-purple-400 text-black font-semibold hover:bg-purple-300 shadow-[0_0_20px_#a855f7]"
        >
          Signup
        </button>

        <p className="mt-4 text-center text-sm text-gray-300">
          <Link to="/" className="text-purple-300 hover:underline">
            Already have account?
          </Link>
        </p>
      </div>
    </div>
  );
}