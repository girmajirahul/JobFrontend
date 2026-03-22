import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Plus } from "lucide-react";

export default function Jobs() {

  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/admin/jobs`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setJobs(res.data))
      .catch((err) => console.log(err));

  }, []);

  const handleStatusChange = (jobId, status) => {
    const token = localStorage.getItem("adminUser");

    axios
      .patch(
        `${import.meta.env.VITE_BASE_URL}/api/jobs/status/${jobId}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        // Update local state
        setJobs((prevJobs) =>
          prevJobs.map((job) =>
            job.id === jobId ? { ...job, status } : job
          )
        );
      })
      .catch((err) => {
        console.error("Failed to update status:", err);
      });
  };

  /* SEARCH */

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );

  /* PAGINATION */

  const indexLast = currentPage * jobsPerPage;
  const indexFirst = indexLast - jobsPerPage;

  const currentJobs = filteredJobs.slice(indexFirst, indexLast);

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  return (
    <div className="">

      {/* HEADER */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">

        <h1 className="text-2xl font-semibold text-gray-800">
          Jobs
        </h1>

        <button
          onClick={() => navigate("/admin/dashboard/addjob")}
          className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg cursor-pointer px-4 py-2  hover:bg-purple-700"
        >
          <Plus size={16} />
          Add Job
        </button>

      </div>


      {/* SEARCH */}

      <div className="relative mb-6 w-full md:w-80">
  {/* Search Icon */}
  <Search
    size={20}
    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
  />

  {/* Input Field */}
  <input
    type="text"
    placeholder="Search jobs..."
    className="
        text-black
      pl-10 pr-4 py-2 w-full
      border border-gray-300
      rounded-lg
      focus:outline-none focus:ring-2 focus:ring-black
      transition
      placeholder-gray-400
    "
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
</div>


      {/* TABLE */}

      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-gray-50 text-gray-600">

            <tr>
              <th className="text-left px-6 py-3">#</th>
              <th className="text-left px-6 py-3">Job Title</th>
              <th className="text-left px-6 py-3">Salary</th>
              <th className="text-left px-6 py-3">Location</th>
              <th className="text-left px-6 py-3">Status</th>
              <th className="text-left px-6 py-3">Actions</th>
            </tr>

          </thead>

          <tbody>

            {currentJobs.map((job, index) => (

              <tr
                key={index}
                className="border-t hover:bg-gray-50 transition"
              >

                <td className="px-6 py-4 text-gray-700">
                  {indexFirst + index + 1}
                </td>

                <td className="px-6 py-4 font-medium text-gray-900">
                  {job.title}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {job.salary}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {job.location}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {job.status}
                </td>
                <td className="px-6 py-4">
                  <select
                    value={job.status || "active"}
                    onChange={(e) => handleStatusChange(job._id, e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 text-gray-700 focus:outline-none focus:ring-1 focus:ring-black"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>


      {/* PAGINATION */}

      <div className="flex justify-between items-center mt-6">

        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="px-4 py-2 border rounded-lg disabled:opacity-40"
        >
          Previous
        </button>

        <span className="text-gray-600 text-sm">
          Page {currentPage} of {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-4 py-2 border rounded-lg disabled:opacity-40"
        >
          Next
        </button>

      </div>

    </div>
  );
}