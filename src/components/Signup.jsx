import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const [activeTab, setActiveTab] = useState("student");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    extra: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // 🔹 Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Handle Submit
  const handleSubmit = async () => {
    setLoading(true);

    try {
      const payload =
        activeTab === "student"
          ? {
              name: formData.name,
              email: formData.email,
              password: formData.password,
              college: formData.extra,
              role: "jobseeker",
            }
          : {
              companyName: formData.name,
              email: formData.email,
              password: formData.password,
              website: formData.extra,
              role: "employer",
            };

      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/register`,
        payload
      );

      if (res.data.success) {
        toast.success("Registration Successful!");
        navigate("/login");
      }
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden">

      {/* RIGHT SIDE */}
      <div
        className="hidden md:block absolute right-0 top-0 h-full w-[60%]"
        style={{
          clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0% 100%)",
        }}
      >
        <img
          src="/images/bg6.jpg"
          className="w-full h-full object-cover"
          alt=""
        />
        <div className="absolute inset-0 opacity-90"></div>

        <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-10">
          <h2 className="text-3xl font-bold mb-2">JobBoard</h2>
          <h1 className="text-4xl font-bold mb-4">Join With Us</h1>
          <p className="max-w-md text-center">
            Create your account and explore opportunities tailored for you.
          </p>
        </div>
      </div>

      {/* LEFT SIDE */}
      <div className="w-full md:w-[55%] flex items-center justify-center bg-gray-100 px-6 py-12 relative z-10">

        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-md md:ml-20"
        >

          {/* Tabs */}
          <div className="flex mb-6 border-b relative">
            {["student", "employer"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 text-sm font-medium ${
                  activeTab === tab
                    ? "text-blue-600"
                    : "text-gray-500"
                }`}
              >
                {tab === "student"
                  ? "Student Registration"
                  : "Employer Registration"}
              </button>
            ))}

            <motion.div
              className="absolute bottom-0 h-[2px] bg-blue-600 w-1/2"
              animate={{
                x: activeTab === "student" ? "0%" : "100%",
              }}
            />
          </div>

          {/* FORM SWITCH */}
          <AnimatePresence mode="wait">

            {/* STUDENT */}
            {activeTab === "student" ? (
              <motion.div
                key="student"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <Input label="Full Name" name="name" onChange={handleChange} />
                <Input label="Email" name="email" onChange={handleChange} />

                <Input
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  onChange={handleChange}
                  showToggle
                  toggle={() => setShowPassword(!showPassword)}
                />

                <Input
                  label="University / College"
                  name="extra"
                  onChange={handleChange}
                />

                <SubmitBtn
                  text="Register as Student"
                  onClick={handleSubmit}
                  loading={loading}
                  disabled={!formData.email || !formData.password}
                />
              </motion.div>
            ) : (

              /* EMPLOYER */
              <motion.div
                key="employer"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Input label="Company Name" name="name" onChange={handleChange} />
                <Input label="Email" name="email" onChange={handleChange} />

                <Input
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  onChange={handleChange}
                  showToggle
                  toggle={() => setShowPassword(!showPassword)}
                />

                <Input
                  label="Company Website"
                  name="extra"
                  onChange={handleChange}
                />

                <SubmitBtn
                  text="Register as Employer"
                  onClick={handleSubmit}
                  loading={loading}
                  disabled={!formData.email || !formData.password}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer Links */}
          <div className="mt-6 text-center">
            <a href="/login" className="text-blue-600 text-sm hover:underline">
              Already have an account? Login
            </a>
          </div>

        </motion.div>
      </div>

      {/* MOBILE BG */}
      <div className="md:hidden absolute inset-0 -z-10">
        <img
          src="/images/bg6.jpg"
          className="w-full h-full object-cover"
          alt=""
        />
        <div className="absolute inset-0 opacity-90"></div>
      </div>
    </div>
  );
}

/* 🔹 Input Component */
function Input({ label, type = "text", name, onChange, showToggle, toggle }) {
  return (
    <div className="mb-4">
      <label className="block mb-2 text-sm font-medium">{label}</label>

      <div className="relative">
        <input
          type={type}
          name={name}
          onChange={onChange}
          className="w-full border rounded-md px-4 py-2 pr-10 focus:ring-2 focus:ring-blue-500"
          placeholder={label}
        />

        {showToggle && (
          <span
            onClick={toggle}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-sm text-gray-500"
          >
            {type === "password" ? "Show" : "Hide"}
          </span>
        )}
      </div>
    </div>
  );
}

/* 🔹 Submit Button */
function SubmitBtn({ text, onClick, loading, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`w-full mt-4 py-2 rounded-md text-white transition
        ${
          loading
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
    >
      {loading ? "Processing..." : text}
    </button>
  );
}