import { Link } from "react-router-dom";
import { MdApartment } from "react-icons/md";
import { useAuth } from "../context/AuthContext";
import { useState} from "react";
import { FaBars,FaTimes } from "react-icons/fa";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const {user} = useAuth();
  const token =
    localStorage.getItem("token");
  const role =
    localStorage.getItem("role");
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link
          to="/"
          className="flex items-center gap-2"
        >
          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-full bg-linear-to-br from-amber-400 to-yellow-600 flex items-center justify-center shadow-lg">

              <MdApartment className="text-white text-xl" />

            </div>

            <div>

              <h1 className="text-2xl font-bold text-gray-900 tracking-wide">
                Grihita
              </h1>

              <p className="text-[10px] uppercase tracking-[0.35em] text-gray-500">
                Properties
              </p>

            </div>

          </div>
        </Link>

        <div className="hidden md:flex items-center gap-10 text-gray-700 font-medium">

          <Link to="/">Home</Link>

          {token ? (
            <>
              {role === "seller" && (
                <>
                  <Link to="/dashboard">
                    Dashboard
                  </Link>

                  <Link to="/create-property">
                    Post Property
                  </Link>
                </>
              )}

              {user?.role === "buyer" && (
                <Link to="/wishlist">
                  Wishlist
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full transition"
              >
                Logout
              </button>

            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-amber-600 transition"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-full transition duration-300 shadow-md"
              >
                Signup
              </Link>
            </>
          )}


        </div>
        
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg flex flex-col p-5 gap-4 z-50">

            <Link to="/">Home</Link>

            {token ? (
              <>
                {role === "seller" && (
                  <>
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/create-property">Post Property</Link>
                  </>
                )}

                {user?.role === "buyer" && (
                  <Link to="/wishlist">Wishlist</Link>
                )}

                <button
                  onClick={handleLogout}
                  className="text-left text-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>

                <Link
                  to="/signup"
                  className="text-blue-600"
                >
                  Signup
                </Link>
              </>
            )}

          </div>
        )}

      </div>
      

    </nav>
  );
}

export default Navbar;