import React, { useState } from "react";

export default function CompanyProfile() {
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    website: "",
    foundedDate: "",
    industry: "",
    companySize: "",
    phone: "",
    location: "",
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
    <div className="max-w-6xl mx-auto">

      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Company Profile
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-sm space-y-8"
      >

        {/* 🔹 Company Info */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Company Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Company Name */}
            <div>
              <label className="label">Company Name</label>
              <input
                type="text"
                name="companyName"
                className="input"
                placeholder="Enter company name"
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div>
              <label className="label">Company Email</label>
              <input
                type="email"
                name="email"
                className="input"
                placeholder="company@example.com"
                onChange={handleChange}
              />
            </div>

            {/* Website */}
            <div>
              <label className="label">Website</label>
              <input
                type="text"
                name="website"
                className="input"
                placeholder="https://yourcompany.com"
                onChange={handleChange}
              />
            </div>

            {/* Founded Date */}
            <div>
              <label className="label">Founded Date</label>
              <input
                type="date"
                name="foundedDate"
                className="input"
                onChange={handleChange}
              />
            </div>

            {/* Industry */}
            <div>
              <label className="label">Industry</label>
              <input
                type="text"
                name="industry"
                className="input"
                placeholder="e.g. IT, Finance"
                onChange={handleChange}
              />
            </div>

            {/* Company Size */}
            <div>
              <label className="label">Company Size</label>
              <select
                name="companySize"
                className="input"
                onChange={handleChange}
              >
                <option value="">Select size</option>
                <option>1-10 Employees</option>
                <option>11-50 Employees</option>
                <option>51-200 Employees</option>
                <option>201-500 Employees</option>
                <option>500+ Employees</option>
              </select>
            </div>

          </div>
        </div>

        {/* 🔹 Contact Details */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Contact Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Phone */}
            <div>
              <label className="label">Phone Number</label>
              <input
                type="text"
                name="phone"
                className="input"
                placeholder="+91 XXXXX XXXXX"
                onChange={handleChange}
              />
            </div>

            {/* Location */}
            <div>
              <label className="label">Location</label>
              <input
                type="text"
                name="location"
                className="input"
                placeholder="City, Country"
                onChange={handleChange}
              />
            </div>

          </div>
        </div>

        {/* 🔹 Company Description */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Company Description
          </h3>

          <label className="label">About Company</label>
          <textarea
            name="description"
            rows="4"
            className="input w-full"
            placeholder="Write about your company..."
            onChange={handleChange}
          ></textarea>
        </div>

        {/* 🔹 Button */}
        <div className="text-right">
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition"
          >
            Save Changes
          </button>
        </div>

      </form>
    </div>
  );
}