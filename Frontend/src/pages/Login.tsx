import { useState } from "react";
import { useNavigate, useLocation} from "react-router-dom";
import API_URL from "../services/api";
import { useAuth } from "../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.state?.redirect || "/";
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      alert("Email is required");
      return;
    }

    if (!password.trim()) {
      alert("Password is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        setLoading(false);
        return;
      }

      login(data.user, data.token);

      localStorage.setItem(
        "role",
        data.user.role
      );
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );
      alert("Login Successful 🎉");
      if (redirect.startsWith("/property/")) {
        navigate(redirect);
      } else if (data.user.role === "admin") {
        navigate("/admin");
      } else if (data.user.role === "seller") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }

    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-blue-800 via-blue-600 to-cyan-500 px-4">

      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md">

        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-blue-600">
            Welcome Back 👋
          </h1>

          <p className="text-gray-500 mt-2">
            Login to manage your properties
          </p>

        </div>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full border border-gray-300 p-3 rounded-xl pr-12"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <div className="text-center mt-6">

          <p className="text-gray-600">
            Don't have an account?
          </p>

          <a
            href="/signup"
            className="text-blue-600 font-semibold hover:underline"
          >
            Create Account
          </a>

        </div>

      </div>

    </div>
  );
}

export default Login;