import { FaUsers, FaBriefcase, FaClipboardList, FaChartLine } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import axios from "axios";
export default function AdminHome() {
 


 const [stats1, setStatsData] = useState({
  totalJobs: 0,
  activeJobs: 0,
  inactiveJobs: 0,
  totalUsers: 0,
  totalApplications: 0,
});

const stats = [
  { title: "Total Users", value: stats1.totalUsers, icon: FaUsers },
  { title: "Total Jobs", value: stats1.totalJobs, icon: FaBriefcase },
  { title: "Applications", value: stats1.totalApplications, icon: FaClipboardList },
  { title: "Active Jobs", value: stats1.activeJobs, icon: FaChartLine },
];
  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setStatsData(res.data))
      .catch((err) => console.log(err));

  }, []);


  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Overview</h2>

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
    </div>
  );
}