import { motion } from "framer-motion";

export default function EditModal({
  type,
  close,
  skills,
  setSkills,
  experience,
  setExperience,
  education,
  setEducation,
}) {

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg"
      >

        <h2 className="text-xl font-semibold mb-4 capitalize">
          Edit {type}
        </h2>

        {/* SKILLS */}
        {type === "skills" && (
          <div>
            {skills.map((skill, i) => (
              <input
                key={i}
                value={skill}
                onChange={(e) => {
                  const arr = [...skills];
                  arr[i] = e.target.value;
                  setSkills(arr);
                }}
                className="input mb-2"
              />
            ))}

            <button
              onClick={() => setSkills([...skills, ""])}
              className="text-blue-600 text-sm mt-2"
            >
              + Add Skill
            </button>
          </div>
        )}

        {/* EXPERIENCE */}
        {type === "experience" && (
          <div className="space-y-3">
            <input
              value={experience.role}
              onChange={(e) =>
                setExperience({ ...experience, role: e.target.value })
              }
              placeholder="Role"
              className="input"
            />
            <input
              value={experience.company}
              onChange={(e) =>
                setExperience({ ...experience, company: e.target.value })
              }
              placeholder="Company"
              className="input"
            />
            <input
              value={experience.duration}
              onChange={(e) =>
                setExperience({ ...experience, duration: e.target.value })
              }
              placeholder="Duration"
              className="input"
            />
          </div>
        )}

        {/* EDUCATION */}
        {type === "education" && (
          <div className="space-y-3">
            <input
              value={education.degree}
              onChange={(e) =>
                setEducation({ ...education, degree: e.target.value })
              }
              placeholder="Degree"
              className="input"
            />
            <input
              value={education.year}
              onChange={(e) =>
                setEducation({ ...education, year: e.target.value })
              }
              placeholder="Year"
              className="input"
            />
          </div>
        )}

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={close} className="text-gray-500">
            Cancel
          </button>
          <button
            onClick={close}
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Save
          </button>
        </div>
      </motion.div>
    </div>
  );
}