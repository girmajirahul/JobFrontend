import axios from "axios";
import React, { useEffect, useState } from "react";

export default function AppliedJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  const fetchAppliedJobs = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/applications/my-applications`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setJobs(response.data.data);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">
          {jobs.length} JOBS FOUND
        </h2>

        {/* <select className="border px-3 py-2 rounded-lg text-sm">
          <option>Last 2 Months</option>
        </select> */}
      </div>

      {/* Loading */}
      {loading && <p>Loading...</p>}

      {/* Job Cards */}
      <div className="space-y-6">
        {!loading &&
          jobs.map((item, index) => (
            <div
              key={item._id || index}
              className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-purple-500"
            >
              <h3 className="text-lg font-semibold">
                {item.job?.title}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                @company-name • {item.job?.location} • 💰 {item.job?.salary}
              </p>

              {/* ✅ Dynamic Skills */}
              <div className="flex flex-wrap gap-2 mt-3">
                {item.job?.skills?.map((skill, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-gray-100 rounded text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center mt-4">
                <p className="text-sm text-gray-500">
                  Status:{" "}
                  <span className="text-purple-600">
                    {item.status}
                  </span>
                </p>

                <p className="text-sm text-gray-500">
                  Applied:{" "}
                  <span className="text-purple-600">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}