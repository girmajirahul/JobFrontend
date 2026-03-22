import React from "react";
import { FaBriefcase, FaHeart, FaCheckCircle, FaClock } from "react-icons/fa";

export default function Home() {
  const stats = [
    {
      title: "Applied Jobs",
      value: 24,
      icon: FaBriefcase,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Saved Jobs",
      value: 12,
      icon: FaHeart,
      color: "bg-pink-100 text-pink-600",
    },
    {
      title: "Interviews",
      value: 5,
      icon: FaCheckCircle,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Pending",
      value: 8,
      icon: FaClock,
      color: "bg-yellow-100 text-yellow-600",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">

      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Dashboard Overview
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition duration-300 flex items-center justify-between group"
            >
              {/* Left */}
              <div>
                <p className="text-gray-500 text-sm">{item.title}</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">
                  {item.value}
                </h3>
              </div>

              {/* Icon */}
              <div
                className={`w-14 h-14 flex items-center justify-center rounded-full ${item.color} transition group-hover:scale-110`}
              >
                <Icon className="text-xl" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Optional Section (Recent Activity Placeholder) */}
      <div className="mt-10 bg-white p-6 rounded-2xl shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Recent Activity
        </h3>
        <p className="text-gray-500 text-sm">
          You have applied to 3 new jobs this week. Keep going 🚀
        </p>
      </div>
    </div>
  );
}