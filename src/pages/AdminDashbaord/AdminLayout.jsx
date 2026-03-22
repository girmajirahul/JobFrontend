import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaUsers,
  FaBriefcase,
  FaClipboardList,
  FaChartBar,
} from "react-icons/fa";

export default function AdminLayout() {
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
        className={`fixed md:static top-0 left-0 h-screen w-72 bg-white shadow-md p-6 z-50 overflow-y-auto
        transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex justify-end md:hidden mb-4">
          <FaTimes onClick={() => setSidebarOpen(false)} />
        </div>

        {/* Admin Info */}
        <div className="text-center mb-8">
          <img
            src="/images/user.png"
            className="w-20 h-20 mx-auto rounded-full border-4 border-purple-500"
          />
          <h3 className="mt-4 font-semibold">Admin Panel</h3>
          <p className="text-sm text-gray-500">Super Admin</p>
        </div>

        {/* Menu */}
        <nav className="space-y-2">
          <NavLink to="/dashboard/admin" className={navStyle}>
            <FaHome /> Dashboard
          </NavLink>

          <NavLink to="/dashboard/admin/users" className={navStyle}>
            <FaUsers /> Users
          </NavLink>

          <NavLink to="/dashboard/admin/jobs" className={navStyle}>
            <FaBriefcase /> Jobs
          </NavLink>

          {/* <NavLink to="/dashboard/admin/applications" className={navStyle}>
            <FaClipboardList /> Applications
          </NavLink> */}

          <NavLink to="/dashboard/admin/reports" className={navStyle}>
            <FaChartBar /> Reports
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

          <h2 className="font-semibold">Admin Dashboard</h2>

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