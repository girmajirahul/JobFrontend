import React from "react";
import { FaBriefcase, FaUsers, FaCheckCircle, FaClock } from "react-icons/fa";

export default function EmployerHome() {
  const stats = [
    { title: "Total Jobs", value: 12, icon: FaBriefcase },
    { title: "Applications", value: 85, icon: FaUsers },
    { title: "Shortlisted", value: 20, icon: FaCheckCircle },
    { title: "Pending", value: 15, icon: FaClock },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>

      <div className="grid md:grid-cols-4 gap-6">
        {stats.map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="bg-white p-6 rounded-xl shadow">
              <Icon className="text-purple-600 text-2xl mb-2" />
              <h3 className="text-xl font-bold">{item.value}</h3>
              <p className="text-gray-500">{item.title}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-10 bg-white p-6 rounded-2xl shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Recent Activity
        </h3>
        <p className="text-gray-500 text-sm">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. <br />
          A, beatae id tempora ipsam quibusdam expedita inventore neque necessitatibus cupiditate perferendis blanditiis voluptatem dicta molestiae. <br />
          Quis architecto ducimus iure alias necessitatibus. 🚀
        </p>
      </div>
    </div>
  );
}