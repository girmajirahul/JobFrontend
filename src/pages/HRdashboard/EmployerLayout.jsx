import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaBuilding,
  FaPlus,
  FaBriefcase,
  FaUsers,
} from "react-icons/fa";

export default function EmployerLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-screen w-72 bg-white shadow-md p-6 z-50 transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Close */}
        <div className="flex justify-end md:hidden mb-4">
          <FaTimes onClick={() => setSidebarOpen(false)} />
        </div>

        {/* Company Info */}
        <div className="text-center mb-8">
          <img
            src="/images/user.png"
            className="w-20 h-20 mx-auto rounded-full border-4 border-purple-500"
          />
          <h3 className="mt-4 font-semibold">Tech Corp</h3>
          <p className="text-sm text-gray-500">Employer</p>
        </div>

        {/* Menu */}
        <nav className="space-y-2">
          <NavLink to="/dashboard/employer" className={navStyle}>
            <FaHome /> Dashboard
          </NavLink>

          <NavLink to="/dashboard/employer/profile" className={navStyle}>
            <FaBuilding /> Company Profile
          </NavLink>

          <NavLink to="/dashboard/employer/post-job" className={navStyle}>
            <FaPlus /> Post Job
          </NavLink>

          <NavLink to="/dashboard/employer/manage-jobs" className={navStyle}>
            <FaBriefcase /> Manage Jobs
          </NavLink>

          <NavLink to="/dashboard/employer/applications" className={navStyle}>
            <FaUsers /> Applications
          </NavLink>
        </nav>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col">

        {/* Topbar */}
        <div className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
          <FaBars
            className="md:hidden cursor-pointer"
            onClick={() => setSidebarOpen(true)}
          />

          <h2 className="font-semibold">Employer Dashboard</h2>

          <button
            onClick={handleLogout}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg cursor-pointer"
          >
            Logout
          </button>
        </div>

        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

const navStyle = ({ isActive }) =>
  `flex items-center gap-3 p-3 rounded-lg ${
    isActive
      ? "bg-purple-100 text-purple-600"
      : "hover:bg-gray-100"
  }`;