import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaBriefcase } from "react-icons/fa";

export default function LatestJobs() {

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/jobs`) // ✅ your API
      .then((res) => {
        setJobs(res.data.jobs); // ✅ important
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="p-5 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <p className="text-purple-600 font-medium">Latest Job</p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
              New Job Offer
            </h2>
            <p className="text-gray-500 mt-2">
              More Than +500 Job Offer Everyday
            </p>
          </div>

          <button className="mt-4 md:mt-0 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition cursor-pointer">
            Post a Job
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-500">Loading jobs...</p>
        )}

        {/* Job Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {jobs
            ?.filter((job) => job.status === "active") // ✅ show only active
            .map((job) => (
              <div
                key={job._id}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group"
              >

                {/* Top Row */}
                <div className="flex justify-between items-start mb-4">

                  {/* Company */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-lg text-xl">
                      <FaBriefcase /> {/* default icon */}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        {job.company?.name}, {job.location}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {job.title}
                      </p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="text-right">
                    <p className="text-xs text-gray-400">
                      {new Date(job.createdAt).toLocaleDateString()}
                    </p>
                    <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-md">
                      Full Time
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-500 text-sm mb-4">
                  {job.description}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {job.skills?.map((skill, i) => (
                    <span
                      key={i}
                      className="text-xs bg-gray-100 px-2 py-1 rounded-md text-gray-600"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Bottom Row */}
                <div className="flex justify-between items-center">
                  <button className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition cursor-pointer">
                    Apply Now
                  </button>

                  <p className="text-purple-600 font-semibold">
                    ₹{job.salary}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* View All */}
      <div className="mt-12 flex justify-center">
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg transition cursor-pointer">
          View All Jobs
        </button>
      </div>
    </section>
  );
}