import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const linkStyle = (path) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition ${
      location.pathname === path
        ? "bg-black text-white"
        : "text-gray-600 hover:bg-gray-100"
    }`;

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1
          onClick={() => navigate(token ? "/dashboard" : "/")}
          className="text-xl font-semibold text-gray-800 cursor-pointer"
        >
          TodoApp
        </h1>

        <div className="flex items-center gap-4">
          {token && (
            <>
              <Link to="/dashboard" className={linkStyle("/dashboard")}>
                Dashboard
              </Link>

              <button
                onClick={logout}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-black text-white hover:opacity-90 transition"
              >
                Logout
              </button>
            </>
          )}

          {!token && (
            <>
              <Link to="/" className={linkStyle("/")}>
                Login
              </Link>

              <Link to="/register" className={linkStyle("/register")}>
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
