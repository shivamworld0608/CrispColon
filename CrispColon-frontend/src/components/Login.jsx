import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation after login
import axios from "axios";

import { useDispatch } from "react-redux";
import { setAuthUser } from "../Redux/authSlice";
import { toast } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await toast.promise(
        axios.post(`${import.meta.env.REACT_APP_BASE_URL}/api/login`, { email, password }, { withCredentials: true }),
        {
          loading: 'Logging in...',
          success: "Login successful!",
          error: "Invalid Email or Password",
        }
      ).then((response) => {
        dispatch(setAuthUser({ authUser: true, userData: response.data.user, }));
        navigate("/");
        closeModal();
      });
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred.");
      console.error("Login error:", error.response?.data?.message);
    }
   
  };

  return (
    <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
      <div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className=" flex flex-col items-center">
            <div className="text-center">
              <h1 className="text-2xl xl:text-4xl font-extrabold text-gray-900">
                Welcome Back
              </h1>
              <p className="text-[12px] text-gray-500 mt-4 mb-0.5 ">
                Please enter your login details
              </p>
            </div>
            <div className="w-full flex-1 mt-8">
              <form onSubmit={handleLogin} className="mx-auto max-w-xs flex flex-col gap-4">
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm text-gray-600 focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm text-gray-600 focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {error && (
                  <p className="text-red-500 text-xs text-center">{error}</p>
                )}
                <button
                  type="submit"
                  className="mt-5 tracking-wide font-semibold bg-gradient-to-r from-orange-500 to-orange-800 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  <svg
                    className="w-6 h-6 -ml-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span className="ml-3">Login</span>
                </button>
                <p className="mt-6 text-xs text-gray-600 text-center">
                  Don’t have an account?{" "}
                  <a href="/signup">
                    <span className="text-gray-900 font-semibold">Sign Up</span>
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
