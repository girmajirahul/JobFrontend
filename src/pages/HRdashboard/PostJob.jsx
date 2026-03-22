import React, { useState } from "react";

export default function PostJob() {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    salary: "",
    experience: "",
    jobType: "",
    skills: "",
    deadline: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="max-w-5xl mx-auto">

      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Post New Job
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-sm space-y-8"
      >

        {/* 🔹 Job Info */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Job Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className="label">Job Title</label>
              <input
                name="title"
                className="input"
                placeholder="e.g. Frontend Developer"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="label">Location</label>
              <input
                name="location"
                className="input"
                placeholder="City / Remote"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="label">Salary</label>
              <input
                name="salary"
                className="input"
                placeholder="e.g. ₹5L - ₹10L"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="label">Experience</label>
              <input
                name="experience"
                className="input"
                placeholder="e.g. 2-4 Years"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="label">Job Type</label>
              <select
                name="jobType"
                className="input"
                onChange={handleChange}
              >
                <option value="">Select Type</option>
                <option>Full Time</option>
                <option>Part Time</option>
                <option>Internship</option>
                <option>Remote</option>
              </select>
            </div>

            <div>
              <label className="label">Application Deadline</label>
              <input
                type="date"
                name="deadline"
                className="input"
                onChange={handleChange}
              />
            </div>

          </div>
        </div>

        {/* 🔹 Skills */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Required Skills
          </h3>

          <label className="label">Skills (comma separated)</label>
          <input
            name="skills"
            className="input"
            placeholder="React, Node.js, MongoDB"
            onChange={handleChange}
          />
        </div>

        {/* 🔹 Description */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Job Description
          </h3>

          <label className="label">Description</label>
          <textarea
            name="description"
            rows="5"
            className="input w-full"
            placeholder="Write full job details..."
            onChange={handleChange}
          />
        </div>

        {/* 🔹 Button */}
        <div className="text-right">
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition"
          >
            Post Job
          </button>
        </div>

      </form>
    </div>
  );
}