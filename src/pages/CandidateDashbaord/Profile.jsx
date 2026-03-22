import React, { useState } from "react";

export default function Profile() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    jobTitle: "",
    experience: "",
    education: "",
    website: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
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
        Profile Information
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-sm space-y-8"
      >

        {/* 🔹 Basic Info */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Basic Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="input"
              onChange={handleChange}
            />

            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="input"
              onChange={handleChange}
            />

            <input
              type="text"
              name="jobTitle"
              placeholder="Job Title"
              className="input"
              onChange={handleChange}
            />

            <input
              type="text"
              name="experience"
              placeholder="Experience (e.g. 2 Years)"
              className="input"
              onChange={handleChange}
            />

            <input
              type="text"
              name="education"
              placeholder="Education"
              className="input"
              onChange={handleChange}
            />

            <input
              type="text"
              name="website"
              placeholder="Website / Portfolio"
              className="input"
              onChange={handleChange}
            />
          </div>
        </div>

        {/* 🔹 Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Contact Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="input"
              onChange={handleChange}
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              className="input"
              onChange={handleChange}
            />

            <input
              type="text"
              name="location"
              placeholder="Location"
              className="input"
              onChange={handleChange}
            />
          </div>
        </div>

        {/* 🔹 Bio */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            About You
          </h3>

          <textarea
            name="bio"
            rows="4"
            placeholder="Write something about yourself..."
            className="input w-full"
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