import axios from "axios";
import React, { useState } from "react";

const steps = ["Education", "Experience", "Projects", "Skills"];

export default function ResumeStepper() {
    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setloading] = useState(false);

    const token = localStorage.getItem("token");

    const handleDownloadPDF = async () => {
        setloading(true);
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/api/resume/generate`,
                {
                    responseType: "arraybuffer",
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            const blob = new Blob([response.data], {
                type: "application/pdf",
            });

            window.open(URL.createObjectURL(blob));
        } catch (error) {
            console.error(error);
        } finally {
            setloading(false);
        }
    };

    const [formData, setFormData] = useState({
        education: [],
        experience: [],
        projects: [],
        skills: [""],
    });

    const [temp, setTemp] = useState({});

    const handleTempChange = (e) => {
        const { name, value } = e.target;
        setTemp({ ...temp, [name]: value });
    };

    const addData = (section) => {
        if (!temp) return;

        setFormData({
            ...formData,
            [section]: [...formData[section], temp],
        });

        setTemp({}); // clear form
    };

    const saveSection = async () => {
        try {
            let url = "";
            let payload = null;
            let method = "post"; // default

            if (currentStep === 0) {
                url = "/api/users/education";
                payload = formData.education;
            }
            else if (currentStep === 1) {
                url = "/api/users/experience";
                payload = formData.experience;
            }
            else if (currentStep === 2) {
                url = "/api/users/projects";
                payload = formData.projects;
            }
            else if (currentStep === 3) {
                url = "/api/users/skills";

                payload = {
                    skills: formData.skills.filter(skill => skill.trim() !== "")
                };
                method = "put"; // 🔥 IMPORTANT
            }

            await axios({
                method: method,
                url: `${import.meta.env.VITE_BASE_URL}${url}`,
                data: payload,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setCurrentStep((prev) => prev + 1);

        } catch (err) {
            console.error("Save Error", err);
        }
    };

    return (
        <>
            {/* HEADER */}
            <div className="flex justify-between p-4">
                <h1 className="text-xl font-bold">Resume Builder</h1>
                <button onClick={handleDownloadPDF} className="btn-primary">
                    {loading ? "Downloading..." : "Download"}
                </button>
            </div>

            <div className="max-w-6xl mx-auto p-4">
                {/* Stepper */}
                <div className="flex justify-between mb-6">
                    {steps.map((step, i) => (
                        <div key={i} className="text-center flex-1">
                            <div className={`circle ${i <= currentStep ? "active" : ""}`}>{i + 1}</div>
                            <p>{step}</p>
                        </div>
                    ))}
                </div>

                {/* FORM + TABLE */}
                <div className="bg-white shadow rounded-lg p-6">
                    {/* EDUCATION */}
                    {currentStep === 0 && (
                        <>
                            <h2 className="font-semibold mb-3">Add Education</h2>
                            <div className="grid grid-cols-2 gap-3 mb-4">
                                <input name="degree" placeholder="Degree" className="input" onChange={handleTempChange} />
                                <input name="institution" placeholder="Institution" className="input" onChange={handleTempChange} />
                                <input name="startYear" placeholder="Start Year" className="input" onChange={handleTempChange} />
                                <input name="endYear" placeholder="End Year" className="input" onChange={handleTempChange} />
                                <input name="marks" placeholder="Marks" className="input col-span-2" onChange={handleTempChange} />
                            </div>
                            <button onClick={() => addData("education")} className="btn-primary mb-4">Add</button>

                            <table className="table">
                                <thead><tr><th>Degree</th><th>Institution</th><th>Start</th><th>End</th><th>Marks</th></tr></thead>
                                <tbody>
                                    {formData.education.map((row, i) => (
                                        <tr key={i}>
                                            <td>{row.degree}</td>
                                            <td>{row.institution}</td>
                                            <td>{row.startYear}</td>
                                            <td>{row.endYear}</td>
                                            <td>{row.marks}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    )}

                    {/* EXPERIENCE */}
                    {currentStep === 1 && (
                        <>
                            <h2 className="font-semibold mb-3">Add Experience</h2>
                            <div className="grid grid-cols-2 gap-3 mb-4">
                                <input name="company" placeholder="Company" className="input" onChange={handleTempChange} />
                                <input name="title" placeholder="Role" className="input" onChange={handleTempChange} />
                                <input name="startDate" placeholder="Start Date" className="input" onChange={handleTempChange} />
                                <input name="endDate" placeholder="End Date" className="input" onChange={handleTempChange} />
                                <input name="description" placeholder="Description" className="input col-span-2" onChange={handleTempChange} />
                            </div>
                            <button onClick={() => addData("experience")} className="btn-primary mb-4">Add</button>

                            <table className="table">
                                <thead><tr><th>Company</th><th>Role</th><th>Start</th><th>End</th><th>Description</th></tr></thead>
                                <tbody>
                                    {formData.experience.map((row, i) => (
                                        <tr key={i}>
                                            <td>{row.company}</td>
                                            <td>{row.role}</td>
                                            <td>{row.startDate}</td>
                                            <td>{row.endDate}</td>
                                            <td>{row.description}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    )}

                    {/* PROJECTS */}
                    {currentStep === 2 && (
                        <>
                            <h2 className="font-semibold mb-3">Add Project</h2>
                            <div className="grid grid-cols-2 gap-3 mb-4">
                                <input name="title" placeholder="Title" className="input" onChange={handleTempChange} />
                                <input name="techStack" placeholder="Tech Stack" className="input" onChange={handleTempChange} />
                                <input name="description" placeholder="Description" className="input col-span-2" onChange={handleTempChange} />
                            </div>
                            <button onClick={() => addData("projects")} className="btn-primary mb-4">Add</button>

                            <table className="table">
                                <thead><tr><th>Title</th><th>Tech</th><th>Description</th></tr></thead>
                                <tbody>
                                    {formData.projects.map((row, i) => (
                                        <tr key={i}>
                                            <td>{row.title}</td>
                                            <td>{row.techStack}</td>
                                            <td>{row.description}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    )}

                    {/* SKILLS */}
                    {currentStep === 3 && (
                        <div>
                            {formData.skills.map((skill, i) => (
                                <input
                                    key={i}
                                    value={skill}
                                    className="input mb-2"
                                    onChange={(e) => {
                                        const updated = [...formData.skills];
                                        updated[i] = e.target.value;
                                        setFormData({ ...formData, skills: updated });
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Navigation */}
                <div className="flex justify-between mt-6">
                    <button onClick={() => setCurrentStep((p) => p - 1)} disabled={currentStep === 0} className="btn-secondary">Back</button>
                    <button onClick={saveSection} className="btn-primary">Next</button>
                </div>
            </div>

            <style>{`
        .input { width:100%; padding:8px; border:1px solid #ddd; border-radius:6px }
        .table { width:100%; border-collapse: collapse }
        .table th, .table td { border:1px solid #eee; padding:8px }
        .btn-primary { background:#7c3aed; color:white; padding:8px 16px; border-radius:8px }
        .btn-secondary { background:#e5e7eb; padding:8px 16px; border-radius:8px }
        .circle { width:30px; height:30px; border-radius:50%; background:#ccc; margin:auto }
        .circle.active { background:#7c3aed; color:white }
      `}</style>
        </>
    );
}
