import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
      });

      alert("Registered successfully!");
      
      navigate("/");
    } catch (err) {
      alert("Error registering");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleRegister}
          className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-gray-200"
        >
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-2">
            Create account
          </h2>
          <p className="text-center text-gray-500 text-sm mb-8">
            Start managing your tasks today
          </p>

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-black outline-none transition"
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-black outline-none transition"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-black outline-none transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:opacity-90 transition duration-200"
          >
            Sign up
          </button>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/")}
              className="text-black font-medium cursor-pointer hover:underline"
            >
              Sign in
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
