
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const initialFormData = {
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
};

// Convert API response into the form structure
const mapProfileData = (data = {}) => {
  const nameParts = (data.name || "").trim().split(/\s+/).filter(Boolean);

  return {
    firstName: data.firstName ?? nameParts[0] ?? "",
    lastName:
      data.lastName ?? nameParts.slice(1).join(" "),
    jobTitle: data.jobTitle ?? "",
    github: data.github ?? "",
    linkedin: data.linkedin ?? "",
    website: data.website ?? "",
    email: data.email ?? "",
    phone: data.phone ?? "",
    location: data.location ?? "",
    bio: data.bio ?? "",
  };
};

export default function Profile() {
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Fetch profile data
  const fetchData = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please log in to view your profile.");
        return;
      }

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/users/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const profile = response?.data?.data;
      console.log(profile)
      if (profile) {
        setFormData(mapProfileData(profile));
      } else {
        toast.error("Profile data not found.");
      }
    } catch (error) {
      console.error(
        "Failed to fetch profile:",
        error.response?.data || error
      );

      toast.error(
        error.response?.data?.message || "Failed to load profile."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Update profile
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please log in to update your profile.");
        return;
      }

      const payload = {
        ...formData,
        name: `${formData.firstName} ${formData.lastName}`.trim(),
      };

      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/users/profile`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(
        response?.data?.message || "Profile updated successfully!"
      );

      // Keep the form populated using the saved response when available.
      if (response?.data?.data) {
        setFormData(mapProfileData(response.data.data));
      }
    } catch (error) {
      console.error(
        "Failed to update profile:",
        error.response?.data || error
      );

      toast.error(
        error.response?.data?.message ||
          "Something went wrong while updating your profile."
      );
    } finally {
      setSaving(false);
    }
  };

  // Reusable input styling
  const inputClass =
    "w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100";

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Profile Information
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Manage your personal and professional information.
        </p>
      </div>

      {loading ? (
        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
          <p className="text-gray-600">Loading profile...</p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="space-y-8 rounded-2xl bg-white p-6 shadow-sm"
        >
          {/* Basic Information */}
          <section>
            <h3 className="mb-4 text-lg font-semibold text-gray-700">
              Basic Information
            </h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label
                  htmlFor="firstName"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className={inputClass}
                  value={formData.firstName}
                  onChange={handleChange}
                  autoComplete="given-name"
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className={inputClass}
                  value={formData.lastName}
                  onChange={handleChange}
                  autoComplete="family-name"
                />
              </div>

              <div>
                <label
                  htmlFor="jobTitle"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Job Title
                </label>
                <input
                  id="jobTitle"
                  type="text"
                  name="jobTitle"
                  placeholder="e.g. Full Stack Developer"
                  className={inputClass}
                  value={formData.jobTitle}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  htmlFor="github"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  GitHub Profile
                </label>
                <input
                  id="github"
                  type="url"
                  name="github"
                  placeholder="https://github.com/username"
                  className={inputClass}
                  value={formData.github}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  htmlFor="linkedin"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  LinkedIn Profile
                </label>
                <input
                  id="linkedin"
                  type="url"
                  name="linkedin"
                  placeholder="https://linkedin.com/in/username"
                  className={inputClass}
                  value={formData.linkedin}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  htmlFor="website"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Website / Portfolio
                </label>
                <input
                  id="website"
                  type="url"
                  name="website"
                  placeholder="https://yourportfolio.com"
                  className={inputClass}
                  value={formData.website}
                  onChange={handleChange}
                />
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section>
            <h3 className="mb-4 text-lg font-semibold text-gray-700">
              Contact Details
            </h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className={inputClass}
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  className={inputClass}
                  value={formData.phone}
                  onChange={handleChange}
                  autoComplete="tel"
                />
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="location"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Location
                </label>
                <input
                  id="location"
                  type="text"
                  name="location"
                  placeholder="City, State"
                  className={inputClass}
                  value={formData.location}
                  onChange={handleChange}
                  autoComplete="address-level2"
                />
              </div>
            </div>
          </section>

          {/* About You */}
          <section>
            <h3 className="mb-4 text-lg font-semibold text-gray-700">
              About You
            </h3>

            <label
              htmlFor="bio"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Professional Bio
            </label>

            <textarea
              id="bio"
              name="bio"
              rows={5}
              placeholder="Write something about yourself..."
              className={`${inputClass} resize-y`}
              value={formData.bio}
              onChange={handleChange}
            />
          </section>

          {/* Actions */}
          <div className="flex justify-end border-t border-gray-100 pt-6">
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-purple-600 px-6 py-3 font-medium text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
