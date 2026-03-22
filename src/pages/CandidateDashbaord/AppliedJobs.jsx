import React from "react";

export default function AppliedJobs() {
  const jobs = [
    {
      title: "PHP Web Developer",
      location: "Sacramento, California",
      salary: "25,000",
    },
    {
      title: "Software Developer",
      location: "Sacramento, California",
      salary: "25,000",
    },
  ];

  return (
    <div>

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">2269 JOBS FOUND</h2>

        <select className="border px-3 py-2 rounded-lg text-sm">
          <option>Last 2 Months</option>
        </select>
      </div>

      {/* Job Cards */}
      <div className="space-y-6">
        {jobs.map((job, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-purple-500"
          >
            <h3 className="text-lg font-semibold">{job.title}</h3>

            <p className="text-sm text-gray-500 mt-1">
              @company-name • {job.location} • 💰 {job.salary}
            </p>

            <div className="flex gap-2 mt-3">
              <span className="px-2 py-1 bg-gray-100 rounded text-sm">PHP</span>
              <span className="px-2 py-1 bg-gray-100 rounded text-sm">Angular</span>
              <span className="px-2 py-1 bg-gray-100 rounded text-sm">Bootstrap</span>
            </div>

            <div className="flex justify-between items-center mt-4">
              <p className="text-sm text-gray-500">
                Posted: <span className="text-purple-600">2 day ago</span>
              </p>

              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm">
                Apply Job
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}