import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { loginUser } from "../api/auth.routes";
import { setToken } from "../store/slices/userSlice";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await loginUser(formData);

    if (response?.success) {
      dispatch(setToken(response.data));
      toast.success("Login successful! Redirecting...");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } else {
      toast.error(response?.message || "Login failed");
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col justify-center px-6 py-12 bg-gradient-to-br from-indigo-50 via-white to-purple-100 overflow-hidden">

      {/* Decorative background blobs */}
      <div className="absolute -top-24 -left-24 w-[300px] h-[300px] bg-indigo-400/30 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute -bottom-24 -right-24 w-[300px] h-[300px] bg-purple-400/30 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute top-1/3 left-1/4 w-[150px] h-[150px] bg-yellow-300/20 rounded-full blur-2xl animate-pulse-slower"></div>

      {/* Login card */}
      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-sm bg-white/40 backdrop-blur-xl border border-white/30 shadow-xl rounded-3xl p-10 space-y-6">

        <img
          alt="Our Bookstore"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
          className="mx-auto h-10 w-auto"
        />

        <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900 drop-shadow-sm">
          Sign in to your account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-800">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
                className="block w-full rounded-md bg-white/30 px-3 py-2 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-800">
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-white/30 px-3 py-2 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 shadow-lg hover:shadow-indigo-500/40 transition-transform duration-300 hover:scale-105"
          >
            Sign in
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-700">
          Don't have an account?{" "}
          <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}
