import { motion } from "framer-motion";
import { useState } from "react";
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaTwitter } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ FIXED
import { toast } from "react-toastify";

export default function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/login`,
        { email, password }
      );

      if (res.data.success) {
        login(res.data.data, res.data.token);

        toast.success(res?.data?.message || "Login Successful!");

        // ✅ Role-based navigation FIXED
        if (res?.data?.data?.role === "jobseeker") {
          navigate("/dashboard/student");
        } else if (res?.data?.data?.role === "employer") {
          navigate("/dashboard/employer"); // ✅ FIXED SPELLING
        } else if (res?.data?.data?.role === "admin") {
          navigate("/dashboard/admin");
        }
      }

    } catch (err) {
      console.error(err);

      // ✅ FIXED ERROR HANDLING
      toast.error(
        err?.response?.data?.message || "Login Failed please try again later!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden">

      {/* MOBILE TOP IMAGE */}
      <div className="md:hidden relative h-64">
        <img
          src="/images/bg6.jpg"
          alt="bg"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 opacity-90"></div>
        <div className="relative z-10 flex items-center justify-center h-full text-white">
          <h1 className="text-2xl font-bold">JobBoard</h1>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="hidden md:flex w-1/2 relative"
      >
        <img
          src="/images/bg6.jpg"
          alt="bg"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 opacity-90"></div>

        <div className="relative z-10 flex flex-col justify-center items-center text-white text-center px-10">

          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold mb-2"
          >
            JobBoard
          </motion.h2>

          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-4xl font-bold mb-4"
          >
            Login To You Now
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mb-6 max-w-md"
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex gap-4"
          >
            {[FaFacebookF, FaLinkedinIn, FaInstagram, FaTwitter].map(
              (Icon, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  className="bg-white text-blue-600 p-3 rounded-full cursor-pointer"
                >
                  <Icon />
                </motion.div>
              )
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* FORM SIDE */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full md:w-1/2 flex items-center justify-center bg-gray-100 px-6 py-12"
      >

        {/* ✅ FORM ADDED */}
        <form
          onSubmit={handleLogin}
          className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
        >

          <p className="text-gray-500 mb-6">
            If you have an account with us, please log in.
          </p>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">
              E-Mail Address*
            </label>
            <input
              type="email"
              value={email} // ✅ FIXED
              onChange={(e) => setEmail(e.target.value)} // ✅ FIXED
              placeholder="Your Email Address"
              className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium">
              Password <sup>*</sup>
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} // ✅ toggle
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Type Password"
                className="w-full border rounded-md px-4 py-2 pr-10 focus:ring-2 focus:ring-blue-500"
              />

              {/* 👁 Toggle Button */}
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <motion.button
              type="submit"
              whileHover={!loading ? { scale: 1.05 } : {}}
              whileTap={!loading ? { scale: 0.95 } : {}}
              disabled={loading}
              className={`px-6 py-2 rounded-md text-white transition
                ${loading
                  ? "bg-blue-400 cursor-not-allowed opacity-70"
                  : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                }`}
            >
              {loading ? "Logging in..." : "Login"}
            </motion.button>

            <a href="#" className="text-blue-600 text-sm hover:underline">
              Forgot Password
            </a>
          </div>

          <div className="mt-5 flex justify-between">
            <a href="/" className="text-blue-600 text-sm hover:underline">
              Back to home
            </a>
            <a href="/signup" className="text-blue-600 text-sm hover:underline">
              Create New Account
            </a>
          </div>

        </form>
      </motion.div>
    </div>
  );
}