import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { FaUser, FaFileAlt, FaBriefcase, FaBars, FaHome, FaTimes } from "react-icons/fa";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* 🔥 Overlay (Mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 🔥 Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-screen w-72 bg-white shadow-md p-6 z-50 transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >

        {/* Close Button (Mobile) */}
        <div className="flex justify-end md:hidden mb-4">
          <FaTimes
            className="text-xl cursor-pointer"
            onClick={() => setSidebarOpen(false)}
          />
        </div>

        {/* Profile */}
        <div className="text-center mb-8">
          <div className="relative w-24 h-24 mx-auto">
            <img
              src="/images/user.png"
              className="w-full h-full rounded-full border-4 border-purple-500 object-cover"
              alt=""
            />
          </div>
          <h3 className="mt-4 font-semibold text-gray-800">Rahul Girmaji</h3>
          <p className="text-sm text-gray-500">Student</p>
        </div>

        {/* Menu */}
        <nav className="space-y-2">
          <NavLink to="/dashboard/student" className={navStyle}>
            <FaHome /> Home
          </NavLink>

          <NavLink to="/dashboard/student/profile" className={navStyle}>
            <FaUser /> Profile
          </NavLink>

          <NavLink to="/dashboard/student/resume" className={navStyle}>
            <FaFileAlt /> My Resume
          </NavLink>

          <NavLink to="/dashboard/student/applied-jobs" className={navStyle}>
            <FaBriefcase /> Applied Jobs
          </NavLink>
        </nav>
      </div>

      {/* 🔥 Main Section */}
      <div className="flex-1 flex flex-col w-full">

        {/* Top Bar */}
        <div className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">

          {/* Left */}
          <div className="flex items-center gap-3">
            <FaBars
              className="md:hidden text-xl cursor-pointer"
              onClick={() => setSidebarOpen(true)}
            />
            <h2 className="text-lg font-semibold text-gray-800">
              Candidate Dashboard
            </h2>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2">
              <img
                src="/images/user.png"
                alt=""
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm text-gray-700">Rahul</span>
            </div>

            <button
              onClick={handleLogout}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

const navStyle = ({ isActive }) =>
  `flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${
    isActive
      ? "bg-purple-100 text-purple-600"
      : "hover:bg-gray-100 text-gray-700"
  }`;