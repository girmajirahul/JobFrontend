import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Plus } from "lucide-react";

export default function Users() {

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));

  }, []);

  //   const handleStatusChange = (jobId, status) => {
  //     const token = localStorage.getItem("adminUser");

  //     axios
  //       .patch(
  //         `${import.meta.env.VITE_BASE_URL}/api/jobs/status/${jobId}`,
  //         { status },
  //         { headers: { Authorization: `Bearer ${token}` } }
  //       )
  //       .then((res) => {
  //         // Update local state
  //         setJobs((prevJobs) =>
  //           prevJobs.map((job) =>
  //             job.id === jobId ? { ...job, status } : job
  //           )
  //         );
  //       })
  //       .catch((err) => {
  //         console.error("Failed to update status:", err);
  //       });
  //   };

  /* SEARCH */

  const filteredUsers = users.filter((user) => {
    const name = user?.name || "";
    return name.toLowerCase().includes(search.toLowerCase());
  });

  /* PAGINATION */

  const indexLast = currentPage * jobsPerPage;
  const indexFirst = indexLast - jobsPerPage;

  const currentJobs = filteredUsers.slice(indexFirst, indexLast);

  const totalPages = Math.ceil(filteredUsers.length / jobsPerPage);

  return (
    <div className="">

      {/* HEADER */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">

        <h1 className="text-2xl font-semibold text-gray-800">
          Users
        </h1>

        {/* <button
          onClick={() => navigate("/admin/dashboard/addjob")}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
        >
          <Plus size={16} />
          Add Job
        </button> */}

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
          placeholder="Search users..."
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
              <th className="text-left px-6 py-3">User name</th>
              <th className="text-left px-6 py-3">email</th>
              <th className="text-left px-6 py-3">Role</th>
              <th className="text-left px-6 py-3">Created At</th>
              <th className="text-left px-6 py-3">Actions</th>
            </tr>

          </thead>

          <tbody>

            {currentJobs.map((user, index) => (

              <tr
                key={index}
                className="border-t hover:bg-gray-50 transition"
              >

                <td className="px-6 py-4 text-gray-700">
                  {indexFirst + index + 1}
                </td>

                <td className="px-6 py-4 font-medium text-gray-900">
                  {user?.name || user?.companyName}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {user?.email}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {user?.role}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <select
                    value={user.status || "active"}
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