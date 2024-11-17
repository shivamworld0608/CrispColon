import React, { useState } from "react";
import image1 from "../assets/image1.jpg";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../Redux/authSlice";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false); // State to track if OTP is sent
  const [userId, setUserId] = useState(""); // To store the email of the user who signed up

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await toast.promise(
        axios.post(`${import.meta.env.REACT_APP_BASE_URL}/api/signup`, formData, { withCredentials: true }),
        {
          loading: 'Signing up...',
          success: "Veriy OTP to complete signup",
          error: "Signup failed",
        }
      ).then((response) => {
        console.log("hello");
        setIsOtpSent(true);
        setUserId(response.data.userId);
      });
    } catch (error) {
      console.error("An error occurred:", error);
    }

  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
      try {
        await toast.promise(
          axios.post(`${import.meta.env.REACT_APP_BASE_URL}/api/verify-otp`, {
            UserId: userId,
            otp,
          }),
          {
            loading: 'Verifying OTP...',
            success: "OTP verified, signup complete",
            error: "Invalid or expired OTP",
          }
        ).then((response) => {
        dispatch(setAuthUser({ authUser: true, userData: response.data.user, }));
        navigate("/");
        });
      } catch (error) {
        console.error("An error occurred during OTP verification:", error);
      }

  };

  return (
    <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
      <div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex justify-center flex-1">
        <div className="flex-1 bg-gradient-to-r from-orange-800 to-orange-500 text-center hidden md:flex">
          <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat">
            <img
              src={image1}
              alt="Colon Cancer Detection"
              className="w-full max-w-lg rounded-lg shadow-md"
            />
          </div>
        </div>
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="flex flex-col items-center">
            <div className="text-center">
              <h1 className="text-2xl xl:text-4xl font-extrabold text-gray-900">
                Crisp Colon
              </h1>
              <p className="text-[12px] text-gray-500 mt-4 mb-0.5 ">
                {isOtpSent
                  ? "Enter the OTP sent to your email"
                  : "Hey, enter your details to create your account"}
              </p>
            </div>
            <div className="w-full flex-1 mt-8">
              {!isOtpSent ? (
                <form
                  onSubmit={handleSubmit}
                  className="mx-auto max-w-xs flex flex-col gap-4"
                >
                  <input
                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm text-gray-600 focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <input
                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm text-gray-600 focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <input
                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm text-gray-600 focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="string"
                    name="phone"
                    placeholder="Enter your phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                  <input
                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm text-gray-600 focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
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
                    <span className="ml-3">Sign Up</span>
                  </button>
                </form>
              ) : (
                <form
                  onSubmit={handleOtpSubmit}
                  className="mx-auto max-w-xs flex flex-col gap-4"
                >
                  <input
                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm text-gray-600 focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    name="otp"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    className="mt-5 tracking-wide font-semibold bg-gradient-to-r from-orange-500 to-orange-800 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  >
                    <span className="ml-3">Verify OTP</span>
                  </button>
                </form>
              )}
              <p className="mt-6 text-xs text-gray-600 text-center">
                Already have an account?{" "}
                <a href="/login">
                  <span className="text-gray-900 font-semibold">Login</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
