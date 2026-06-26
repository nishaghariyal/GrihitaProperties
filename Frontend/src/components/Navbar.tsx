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
    <nav className="bg-white shadow-md sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link
          to="/"
          className="flex items-center gap-2"
        >
          <MdApartment className="text-blue-600 text-4xl" />

          <h1 className="text-4xl font-extrabold text-blue-600">
            Grihita
          </h1>
        </Link>

        <div className="hidden md:flex items-center gap-8">

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
                className="border border-blue-600 px-4 py-2 rounded-lg text-blue-600"
              >
                Logout
              </button>

            </>
          ) : (
            <>
              <Link to="/login">
                Login
              </Link>

              <Link
                to="/signup"
                className="border border-blue-600 px-4 py-2 rounded-lg text-blue-600"
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