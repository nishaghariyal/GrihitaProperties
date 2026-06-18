import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../services/api";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

function Signup() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
    password: "",
    role: "buyer",
  });

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    // Name
    if (!form.name.trim()) {
      alert("Name is required");
      return;
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(form.email)) {
      alert("Please enter a valid email address");
      return;
    }

    // Phone
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!phoneRegex.test(form.phone)) {
      alert("Phone number must be 10 digits and start with 6-9");
      return;
    }

    // Password
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!passwordRegex.test(form.password)) {
      alert(
        "Password must contain:\n\n• Minimum 8 characters\n• One uppercase letter\n• One lowercase letter\n• One number\n• One special character"
      );
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${API_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("Signup Successful 🎉");
      navigate("/login");

    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-cyan-500 via-blue-600 to-blue-800 px-4">

      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md">

        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-blue-600">
            Create Account 🏠
          </h1>

          <p className="text-gray-500 mt-2">
            Join Grihita Properties today
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            placeholder="Full Name"
            required
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            placeholder="Email Address"
            required
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            
          />

          <input
            type="text"
            placeholder="Phone Number"
            required
            value={form.phone}
            onChange={(e) =>
              setForm({
                ...form,
                phone: e.target.value,
              })
            }
            className="w-full border border-gray-300 p-3 rounded-xl"
            
          />

          <input
            type="text"
            placeholder="WhatsApp Number"
            required
            value={form.whatsapp}
            onChange={(e) =>
              setForm({
                ...form,
                whatsapp: e.target.value,
              })
            }
            className="w-full border border-gray-300 p-3 rounded-xl"
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

          <input
            type="hidden"
            value="buyer"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

        </form>

        <div className="text-center mt-6">

          <p className="text-gray-600">
            Already have an account?
          </p>

          <a
            href="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login Here
          </a>

        </div>

      </div>

    </div>
  );
}

export default Signup;