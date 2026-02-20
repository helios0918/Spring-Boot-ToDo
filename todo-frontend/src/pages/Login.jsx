import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userEmail", email);

      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200"
        >
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-2">
            Welcome back
          </h2>
          <p className="text-center text-gray-500 text-sm mb-6">
            Login to continue to your dashboard
          </p>

          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

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

          <div className="mb-6 relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-black outline-none transition"
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-11 text-sm text-gray-500 cursor-pointer select-none"
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:opacity-90 transition duration-200 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-black font-medium cursor-pointer hover:underline"
            >
              Sign up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
