import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="bg-[#111827] px-6 py-3 flex justify-between items-center border-b border-gray-700">

      <h1 className="text-white font-bold text-lg">AI Chat</h1>

      <div className="relative">
        <div
          onClick={() => setOpen(!open)}
          className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center cursor-pointer"
        >
          <span className="text-white font-bold">U</span>
        </div>

        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-[#1f2937] rounded shadow border border-gray-700">
            <button
              onClick={logout}
              className="w-full px-4 py-2 text-left hover:bg-gray-700"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}