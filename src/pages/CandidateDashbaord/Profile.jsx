import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function Profile() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    jobTitle: "",
    github: "",
    linkedin: "",
    website: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
  });
  const [loading,setLoading]=useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const resp = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/users/profile`,
        formData, // ✅ send actual data here
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (resp?.data?.message) {
        toast.success(resp.data.message || "Profile updated Successfully!");
      }
      setFormData(null)
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    }finally{
      setLoading(false)
    }

    
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
              name="github"
              placeholder="GitHub link"
              className="input"
              onChange={handleChange}
            />

            <input
              type="text"
              name="linkedin"
              placeholder="LinkedIn"
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
            disabled={loading}
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}