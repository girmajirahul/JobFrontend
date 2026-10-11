import { useCallback, useEffect, useState } from "react";
import axios from "axios";

/* ============================================================================
 * 1. CONSTANTS
 * ========================================================================== */

const API_BASE = `${import.meta.env.VITE_BASE_URL}/api/users`;

const STEPS = [
    { key: "education", title: "Education", description: "Your academic background", icon: "01" },
    { key: "experience", title: "Experience", description: "Your professional journey", icon: "02" },
    { key: "projects", title: "Projects", description: "Work you've built", icon: "03" },
    { key: "skills", title: "Skills", description: "Your technical strengths", icon: "04" },
];

const LAST_STEP = STEPS.length - 1;

const INITIAL_FORM_DATA = {
    education: [],
    experience: [],
    projects: [],
    skills: [""],
};

const INPUT_CLASS =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10";

const PRIMARY_BUTTON =
    "inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:opacity-60";

/**
 * Per-section configuration for the "list of entries" steps
 * (education, experience, projects). Skills has its own UI.
 */
const SECTION_CONFIG = {
    education: {
        heading: "Your academic background",
        editHeading: "Edit your education",
        description: "Add your degrees, institutions, and academic achievements.",
        addLabel: "+ Add education",
        updateLabel: "Update education",
        savedTitle: "Saved education",
        emptyTitle: "No education added yet",
        emptyDescription: "Add your degrees and qualifications here.",
        listKeys: ["education", "educations"],
        canEdit: true,
        canDelete: true,
        fields: [
            { name: "degree", label: "Degree / Qualification", placeholder: "e.g. MCA, B.Tech", required: true },
            { name: "institution", label: "Institution", placeholder: "College or university name", required: true },
            { name: "startYear", label: "Start year", placeholder: "e.g. 2022" },
            { name: "endYear", label: "End year", placeholder: "e.g. 2024 or Present" },
            { name: "marks", label: "Marks / CGPA", placeholder: "e.g. 8.5 CGPA or 82%", fullWidth: true },
        ],
        toCard: (row) => ({
            title: row.degree,
            subtitle: row.institution,
            details: [[row.startYear, row.endYear].filter(Boolean).join(" – "), row.marks]
                .filter(Boolean)
                .join(" · "),
        }),
    },

    experience: {
        heading: "Your professional journey",
        editHeading: "Edit your experience",
        description: "Highlight your roles, responsibilities, and the experience you've gained.",
        addLabel: "+ Add experience",
        updateLabel: "Update experience",
        savedTitle: "Saved experience",
        emptyTitle: "No experience added yet",
        emptyDescription: "Add your work experience or internships here.",
        listKeys: ["experience", "experiences"],
        canEdit: true,
        canDelete: true,
        fields: [
            { name: "company", label: "Company", placeholder: "Company name", required: true },
            { name: "title", label: "Job title", placeholder: "e.g. Junior React Developer", required: true },
            { name: "startDate", label: "Start date", placeholder: "e.g. Jan 2025" },
            { name: "endDate", label: "End date", placeholder: "e.g. Present" },
            {
                name: "description",
                label: "Responsibilities and achievements",
                placeholder: "Describe your role, contributions, and results...",
                multiline: true,
                fullWidth: true,
            },
        ],
        toCard: (row) => ({
            title: row.title || row.role,
            subtitle: [row.company, [row.startDate, row.endDate].filter(Boolean).join(" – ")]
                .filter(Boolean)
                .join(" · "),
            details: row.description,
        }),
    },

    projects: {
        heading: "Show what you've built",
        editHeading: "Show what you've built",
        description: "Demonstrate your practical skills through personal, academic, and professional projects.",
        addLabel: "+ Add project",
        updateLabel: "Update project",
        savedTitle: "Saved projects",
        emptyTitle: "No projects added yet",
        emptyDescription: "Your projects will appear here once added.",
        listKeys: ["projects", "project"],
        canEdit: false, // backend has no PUT /projects/:id
        canDelete: false, // backend has no DELETE /projects/:id
        footnote:
            "Your provided routes support adding and fetching projects, but do not include project update or delete endpoints.",
        fields: [
            { name: "title", label: "Project name", placeholder: "e.g. Healthify", required: true },
            { name: "techStack", label: "Technologies", placeholder: "React, Node.js, MongoDB" },
            {
                name: "description",
                label: "Project description",
                placeholder: "What does it do? What did you build?",
                multiline: true,
                fullWidth: true,
            },
        ],
        toCard: (row) => ({
            title: row.title,
            subtitle: row.techStack,
            details: row.description,
        }),
    },
};

const ENTRY_SECTIONS = Object.keys(SECTION_CONFIG);

/* ============================================================================
 * 2. HELPERS
 * ========================================================================== */

function getToken() {
    return localStorage.getItem("token");
}

function getAuthConfig() {
    const token = getToken();
    if (!token) throw new Error("Your session has expired. Please log in again.");
    return { headers: { Authorization: `Bearer ${token}` } };
}

function getEntryId(row) {
    return row?._id || row?.id || row?.eduId || row?.expId;
}

/** Supports `[...]`, `{ data: [...] }` and `{ data: { education: [...] } }` responses. */
function extractList(response, keys = []) {
    const body = response?.data;
    const candidates = [body?.data, body, body?.data?.data];

    for (const candidate of candidates) {
        if (Array.isArray(candidate)) return candidate;
        if (candidate && typeof candidate === "object") {
            for (const key of keys) {
                if (Array.isArray(candidate[key])) return candidate[key];
            }
        }
    }
    return [];
}

/**
 * Supports:
 *   { data: ["React", "Node"] }            <- your current API
 *   { data: { skills: [...] } }
 *   { skills: [...] }
 *   items that are objects like { name: "React" }
 */
function extractSkills(response) {
    const body = response?.data;
    const candidates = [body?.data?.skills, body?.skills, body?.data];

    for (const candidate of candidates) {
        if (Array.isArray(candidate)) {
            return candidate
                .map((skill) => (typeof skill === "string" ? skill : skill?.name || ""))
                .filter(Boolean);
        }
        if (typeof candidate === "string") return [candidate];
    }
    return [];
}

function cleanEntry(entry) {
    return Object.fromEntries(
        Object.entries(entry).map(([key, value]) => [key, typeof value === "string" ? value.trim() : value])
    );
}

function capitalize(text) {
    return `${text[0].toUpperCase()}${text.slice(1)}`;
}

/* ============================================================================
 * 3. API LAYER
 * ========================================================================== */

const api = {
    /** Fetch one section and return it in the shape the form state expects. */
    async fetchSection(section) {
        const response = await axios.get(`${API_BASE}/${section}`, getAuthConfig());

        if (section === "skills") {
            const skills = extractSkills(response);
            return skills.length ? skills : [""];
        }
        return extractList(response, SECTION_CONFIG[section].listKeys);
    },

    createEntry: (section, entry) => axios.post(`${API_BASE}/${section}`, entry, getAuthConfig()),
    updateEntry: (section, id, entry) => axios.put(`${API_BASE}/${section}/${id}`, entry, getAuthConfig()),
    deleteEntry: (section, id) => axios.delete(`${API_BASE}/${section}/${id}`, getAuthConfig()),
    saveSkills: (skills) => axios.put(`${API_BASE}/skills`, { skills }, getAuthConfig()),

    downloadResume: () =>
        axios.get(`${import.meta.env.VITE_BASE_URL}/api/resume/generate`, {
            responseType: "arraybuffer",
            ...getAuthConfig(),
        }),
};

/* ============================================================================
 * 4. SMALL UI COMPONENTS
 * ========================================================================== */

function Field({ label, name, value, onChange, placeholder, type = "text", required = false, multiline = false }) {
    const sharedProps = { id: name, name, value: value ?? "", onChange, placeholder, required };

    return (
        <div className="min-w-0">
            <label htmlFor={name} className="mb-2 block text-sm font-medium text-slate-700">
                {label}
                {required && <span className="ml-1 text-violet-600">*</span>}
            </label>

            {multiline ? (
                <textarea {...sharedProps} rows={4} className={`${INPUT_CLASS} min-h-28 resize-y`} />
            ) : (
                <input {...sharedProps} type={type} className={INPUT_CLASS} />
            )}
        </div>
    );
}

function SectionHeading({ eyebrow, title, description }) {
    return (
        <div className="mb-7">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-violet-600">{eyebrow}</p>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
        </div>
    );
}

function EmptyState({ title, description }) {
    return (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 px-5 py-8 text-center">
            <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-xl text-violet-600 shadow-sm">
                +
            </div>
            <p className="font-semibold text-slate-700">{title}</p>
            <p className="mt-1 text-sm text-slate-500">{description}</p>
        </div>
    );
}

function EntryCard({ title, subtitle, details, onEdit, onRemove }) {
    return (
        <div className="group flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-violet-200 hover:shadow-sm sm:p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 font-bold text-violet-600">
                {title?.charAt(0)?.toUpperCase() || "•"}
            </div>

            <div className="min-w-0 flex-1">
                <h4 className="break-words font-semibold text-slate-900">{title || "Untitled entry"}</h4>
                {subtitle && <p className="mt-1 break-words text-sm text-slate-600">{subtitle}</p>}
                {details && (
                    <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-slate-500">{details}</p>
                )}
            </div>

            <div className="flex shrink-0 flex-col gap-1 sm:flex-row">
                {onEdit && (
                    <button
                        type="button"
                        onClick={onEdit}
                        className="rounded-lg px-2 py-1 text-sm font-medium text-violet-600 transition hover:bg-violet-50"
                    >
                        Edit
                    </button>
                )}
                {onRemove && (
                    <button
                        type="button"
                        onClick={onRemove}
                        aria-label={`Remove ${title || "entry"}`}
                        className="rounded-lg px-2 py-1 text-sm text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                    >
                        Delete
                    </button>
                )}
            </div>
        </div>
    );
}

function Notice({ notice, onDismiss }) {
    if (!notice) return null;
    const isError = notice.type === "error";

    return (
        <div
            role="status"
            className={`mb-5 flex items-start gap-3 rounded-xl border px-4 py-3 text-sm ${
                isError
                    ? "border-red-200 bg-red-50 text-red-700"
                    : "border-emerald-200 bg-emerald-50 text-emerald-700"
            }`}
        >
            <span className="font-bold">{isError ? "!" : "✓"}</span>
            <p>{notice.message}</p>
            <button
                type="button"
                onClick={onDismiss}
                className="ml-auto font-semibold opacity-70 hover:opacity-100"
                aria-label="Dismiss message"
            >
                ×
            </button>
        </div>
    );
}

/* ============================================================================
 * 5. STEP COMPONENTS
 * ========================================================================== */

/** Generic form + saved list used by Education, Experience and Projects. */
function EntrySection({
    section,
    stepIndex,
    entries,
    temp,
    editing,
    saving,
    onChange,
    onSubmit,
    onCancelEdit,
    onEdit,
    onDelete,
}) {
    const config = SECTION_CONFIG[section];
    const step = STEPS[stepIndex];
    const isEditing = editing?.section === section;

    return (
        <>
            <SectionHeading
                eyebrow={`Step ${step.icon} / ${step.title}`}
                title={isEditing ? config.editHeading : config.heading}
                description={config.description}
            />

            {/* Form */}
            <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {config.fields.map(({ fullWidth, ...field }) => (
                    <div key={field.name} className={fullWidth ? "sm:col-span-2" : undefined}>
                        <Field {...field} value={temp[field.name]} onChange={onChange} />
                    </div>
                ))}
            </div>

            <div className="flex flex-wrap gap-3">
                <button type="button" disabled={saving} onClick={onSubmit} className={PRIMARY_BUTTON}>
                    {saving ? "Saving..." : isEditing ? config.updateLabel : config.addLabel}
                </button>

                {isEditing && (
                    <button
                        type="button"
                        onClick={onCancelEdit}
                        className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600"
                    >
                        Cancel edit
                    </button>
                )}
            </div>

            <div className="my-8 border-t border-slate-100" />

            {/* Saved entries */}
            <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="font-bold text-slate-900">{config.savedTitle}</h3>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                    {entries.length} entries
                </span>
            </div>

            <div className="space-y-3">
                {entries.length === 0 ? (
                    <EmptyState title={config.emptyTitle} description={config.emptyDescription} />
                ) : (
                    entries.map((row, index) => (
                        <EntryCard
                            key={getEntryId(row) || index}
                            {...config.toCard(row)}
                            onEdit={config.canEdit ? () => onEdit(section, row) : undefined}
                            onRemove={config.canDelete ? () => onDelete(section, row) : undefined}
                        />
                    ))
                )}
            </div>

            {config.footnote && <p className="mt-4 text-xs leading-5 text-slate-400">{config.footnote}</p>}
        </>
    );
}

function SkillsStep({ skills, onAdd, onUpdate, onRemove }) {
    const filledSkills = skills.map((skill) => skill.trim()).filter(Boolean);

    return (
        <>
            <SectionHeading
                eyebrow="Step 04 / Skills"
                title="Highlight your strengths"
                description="Add the technical and professional skills that match your career goals."
            />

            <div className="mb-6 rounded-2xl border border-violet-100 bg-violet-50/60 p-4 sm:p-5">
                <h3 className="font-semibold text-slate-900">Skills that set you apart</h3>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                    Include programming languages, frameworks, databases, development tools, and other relevant skills.
                </p>
            </div>

            {/* Editable list */}
            <div className="space-y-3">
                {skills.map((skill, index) => (
                    <div key={index} className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-sm font-bold text-slate-500">
                            {String(index + 1).padStart(2, "0")}
                        </div>
                        <input
                            type="text"
                            value={skill}
                            onChange={(e) => onUpdate(index, e.target.value)}
                            placeholder="e.g. React.js"
                            aria-label={`Skill ${index + 1}`}
                            className={INPUT_CLASS}
                        />
                        <button
                            type="button"
                            onClick={() => onRemove(index)}
                            disabled={skills.length === 1}
                            aria-label={`Remove skill ${index + 1}`}
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg text-slate-400 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-30"
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>

            <button
                type="button"
                onClick={onAdd}
                className="mt-5 inline-flex items-center gap-2 rounded-xl border border-violet-200 bg-violet-50 px-4 py-3 text-sm font-semibold text-violet-700 transition hover:bg-violet-100"
            >
                + Add another skill
            </button>

            <div className="my-8 border-t border-slate-100" />

            {/* Preview */}
            <h3 className="mb-3 font-bold text-slate-900">Skills preview</h3>
            <div className="flex flex-wrap gap-2">
                {filledSkills.length === 0 ? (
                    <p className="text-sm text-slate-400">Your skills preview will appear here.</p>
                ) : (
                    filledSkills.map((skill, index) => (
                        <span
                            key={`${skill}-${index}`}
                            className="rounded-lg border border-violet-100 bg-violet-50 px-3 py-2 text-sm font-medium text-violet-700"
                        >
                            {skill}
                        </span>
                    ))
                )}
            </div>

            <div className="mt-8 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4">
                <p className="font-semibold text-emerald-800">You're almost there!</p>
                <p className="mt-1 text-sm leading-6 text-emerald-700">
                    Save your skills, then download your resume using the button at the top.
                </p>
            </div>
        </>
    );
}

/* ============================================================================
 * 6. LAYOUT COMPONENTS
 * ========================================================================== */

function Header({ downloading, onDownload }) {
    return (
        <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
                <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-violet-600 text-lg font-black text-white shadow-lg shadow-violet-600/20">
                        R
                    </div>
                    <div className="min-w-0">
                        <h1 className="truncate text-base font-bold tracking-tight text-slate-900 sm:text-lg">
                            Resume Studio
                        </h1>
                        <p className="hidden text-xs text-slate-500 sm:block">Build your next opportunity</p>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={onDownload}
                    disabled={downloading}
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-violet-600 px-3 py-2.5 text-sm font-semibold text-white shadow-md shadow-violet-600/15 transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {downloading ? "Preparing..." : "Download PDF"}
                </button>
            </div>
        </header>
    );
}

function Hero({ currentStep, progress }) {
    return (
        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                    YOUR CAREER WORKSPACE
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                    Build a resume that
                    <br className="hidden sm:block" /> <span className="text-violet-600">opens new doors.</span>
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
                    Add your qualifications, showcase your work, and highlight the skills that make you stand out.
                </p>
            </div>

            <div className="w-full rounded-2xl border border-slate-200 bg-white p-4 md:max-w-xs">
                <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-slate-700">Your progress</span>
                    <span className="text-sm font-bold text-violet-600">{Math.round(progress)}%</span>
                </div>
                <div
                    className="h-2 overflow-hidden rounded-full bg-slate-100"
                    role="progressbar"
                    aria-label="Resume builder progress"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={Math.round(progress)}
                >
                    <div
                        className="h-full rounded-full bg-gradient-to-r from-violet-600 to-indigo-500 transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <p className="mt-2 text-xs text-slate-500">
                    Step {currentStep + 1} of {STEPS.length} · {STEPS[currentStep].title}
                </p>
            </div>
        </div>
    );
}

function StepTabs({ currentStep, onSelect }) {
    return (
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-5">
            <div className="grid grid-cols-4 gap-2 sm:gap-4">
                {STEPS.map((step, index) => {
                    const isActive = currentStep === index;
                    const isComplete = currentStep > index;

                    const badgeClass = isActive
                        ? "bg-violet-600 text-white shadow-sm"
                        : isComplete
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-500";

                    return (
                        <button
                            key={step.key}
                            type="button"
                            onClick={() => onSelect(index)}
                            aria-current={isActive ? "step" : undefined}
                            className={`min-w-0 rounded-xl p-2 text-left transition sm:p-3 ${
                                isActive ? "bg-violet-50 ring-1 ring-violet-100" : "hover:bg-slate-50"
                            }`}
                        >
                            <div className="mb-2 flex items-center gap-2">
                                <span
                                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${badgeClass}`}
                                >
                                    {isComplete ? "✓" : step.icon}
                                </span>
                            </div>
                            <p
                                className={`truncate text-xs font-bold sm:text-sm ${
                                    isActive ? "text-violet-700" : "text-slate-800"
                                }`}
                            >
                                {step.title}
                            </p>
                            <p className="mt-1 hidden truncate text-xs text-slate-400 lg:block">{step.description}</p>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

function Sidebar({ counts, onBackToStart }) {
    const overview = [
        { title: "Education", count: counts.education, icon: "E" },
        { title: "Experience", count: counts.experience, icon: "W" },
        { title: "Projects", count: counts.projects, icon: "P" },
        { title: "Skills", count: counts.skills, icon: "S" },
    ];

    return (
        <aside className="space-y-5">
            <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-violet-700 via-violet-600 to-indigo-600 p-6 text-white shadow-lg shadow-violet-900/10">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-xl">
                    ✦
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-200">A little career advice</p>
                <h3 className="mt-3 text-xl font-bold leading-7">Make every detail count.</h3>
                <p className="mt-3 text-sm leading-6 text-violet-100">
                    A strong resume tells a clear story about what you know, what you've accomplished, and the value
                    you can bring to a team.
                </p>
                <div className="mt-6 h-px bg-white/20" />
                <div className="mt-5 space-y-3 text-sm text-violet-50">
                    <p>✓ Keep your details accurate.</p>
                    <p>✓ Highlight relevant projects.</p>
                    <p>✓ Focus on achievements and impact.</p>
                </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="font-bold text-slate-900">Resume overview</h3>
                <p className="mt-1 text-sm text-slate-500">Entries currently loaded</p>
                <div className="mt-5 space-y-4">
                    {overview.map((item) => (
                        <div key={item.title} className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-xs font-bold text-slate-600">
                                {item.icon}
                            </div>
                            <span className="flex-1 text-sm font-medium text-slate-700">{item.title}</span>
                            <span className="rounded-lg bg-slate-50 px-2.5 py-1 text-sm font-bold text-slate-700">
                                {item.count}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="font-bold text-slate-900">Need to make a change?</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                    Use the steps above to move between sections and update your information.
                </p>
                <button
                    type="button"
                    onClick={onBackToStart}
                    className="mt-4 text-sm font-semibold text-violet-600 transition hover:text-violet-800"
                >
                    Back to education →
                </button>
            </div>
        </aside>
    );
}

/* ============================================================================
 * 7. MAIN COMPONENT
 * ========================================================================== */

export default function ResumeStepper() {
    /* ---------- State ---------- */
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState(INITIAL_FORM_DATA);
    const [temp, setTemp] = useState({}); // values of the entry form being filled
    const [editing, setEditing] = useState(null); // { section, id } | null
    const [saving, setSaving] = useState(false);
    const [downloading, setDownloading] = useState(false);
    const [loadingData, setLoadingData] = useState(true);
    const [notice, setNotice] = useState(null); // { type: "error" | "success", message }

    const progress = ((currentStep + 1) / STEPS.length) * 100;
    const showNotice = (type, message) => setNotice({ type, message });
    const clearNotice = () => setNotice(null);

    /* ---------- Loading data ---------- */

    // Load ALL sections (education, experience, projects AND skills) in parallel.
    const loadAllSections = useCallback(async () => {
        setLoadingData(true);
        try {
            const sections = [...ENTRY_SECTIONS, "skills"];
            const results = await Promise.allSettled(sections.map((section) => api.fetchSection(section)));

            const loaded = {};
            const failed = [];

            results.forEach((result, index) => {
                const section = sections[index];
                if (result.status === "fulfilled") {
                    loaded[section] = result.value;
                } else {
                    failed.push({ section, reason: result.reason });
                }
            });

            // Only overwrite sections that loaded successfully; keep the rest as they were.
            setFormData((previous) => ({ ...previous, ...loaded }));

            if (failed.length) {
                console.error("Some resume sections could not be loaded:", failed);
                showNotice(
                    "error",
                    `Could not load: ${failed.map((f) => f.section).join(", ")}. Please refresh or check the API response format.`
                );
            }
        } catch (error) {
            showNotice("error", error.message || "Unable to load resume data.");
        } finally {
            setLoadingData(false);
        }
    }, []);

    // Reload a single section (so unsaved skill edits are never overwritten after saving an entry).
    const refreshSection = useCallback(async (section) => {
        try {
            const data = await api.fetchSection(section);
            setFormData((previous) => ({ ...previous, [section]: data }));
        } catch (error) {
            console.error(`Failed to refresh ${section}:`, error);
        }
    }, []);

    useEffect(() => {
        loadAllSections();
    }, [loadAllSections]);

    /* ---------- Entry form handlers (education / experience / projects) ---------- */

    const handleTempChange = (e) => {
        const { name, value } = e.target;
        setTemp((previous) => ({ ...previous, [name]: value }));
    };

    const resetEntryForm = () => {
        setTemp({});
        setEditing(null);
    };

    const addOrUpdateEntry = async (section) => {
        const config = SECTION_CONFIG[section];
        const entry = cleanEntry(temp);

        // Validate required fields
        const missing = config.fields.find((field) => field.required && !entry[field.name]);
        if (missing) {
            showNotice("error", `Please enter ${missing.label.toLowerCase()}.`);
            return;
        }

        const isEditing = Boolean(editing?.id && editing.section === section);

        if (editing && !config.canEdit) {
            showNotice("error", `${capitalize(section)} cannot be edited because the backend has no update route.`);
            return;
        }

        try {
            setSaving(true);
            clearNotice();

            if (isEditing) {
                await api.updateEntry(section, editing.id, entry);
            } else {
                await api.createEntry(section, entry);
            }

            await refreshSection(section);
            resetEntryForm();
            showNotice("success", `${capitalize(section)} ${isEditing ? "updated" : "added"} successfully.`);
        } catch (error) {
            console.error(`${section} save error:`, error.response?.data || error);
            showNotice("error", error.response?.data?.message || error.message || `Failed to save ${section}.`);
        } finally {
            setSaving(false);
        }
    };

    const startEdit = (section, row) => {
        const id = getEntryId(row);
        if (!id) {
            showNotice("error", "This record does not include an ID, so it cannot be edited.");
            return;
        }

        const values = section === "experience" ? { ...row, title: row.title ?? row.role } : { ...row };

        setEditing({ section, id });
        setTemp(values);
        clearNotice();
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const deleteEntry = async (section, row) => {
        const id = getEntryId(row);
        if (!id) {
            showNotice("error", "This record does not include an ID, so it cannot be deleted.");
            return;
        }
        if (!window.confirm(`Delete this ${section} entry?`)) return;

        try {
            setSaving(true);
            await api.deleteEntry(section, id);

            setFormData((previous) => ({
                ...previous,
                [section]: previous[section].filter((item) => getEntryId(item) !== id),
            }));

            if (editing?.id === id) resetEntryForm();
            showNotice("success", `${capitalize(section)} deleted successfully.`);
        } catch (error) {
            console.error(`${section} delete error:`, error.response?.data || error);
            showNotice("error", error.response?.data?.message || `Failed to delete ${section}.`);
        } finally {
            setSaving(false);
        }
    };

    /* ---------- Skills handlers ---------- */

    const addSkill = () => setFormData((previous) => ({ ...previous, skills: [...previous.skills, ""] }));

    const updateSkill = (index, value) =>
        setFormData((previous) => {
            const skills = [...previous.skills];
            skills[index] = value;
            return { ...previous, skills };
        });

    const removeSkill = (index) =>
        setFormData((previous) => {
            const skills = previous.skills.filter((_, i) => i !== index);
            return { ...previous, skills: skills.length ? skills : [""] };
        });

    const saveSkills = async () => {
        try {
            setSaving(true);
            const skills = formData.skills.map((skill) => skill.trim()).filter(Boolean);

            await api.saveSkills(skills);

            setFormData((previous) => ({ ...previous, skills: skills.length ? skills : [""] }));
            showNotice("success", "Skills saved successfully.");
        } catch (error) {
            console.error("Skills save error:", error.response?.data || error);
            showNotice("error", error.response?.data?.message || error.message || "Failed to save skills.");
        } finally {
            setSaving(false);
        }
    };

    /* ---------- Navigation ---------- */

    const goToStep = (index) => {
        setCurrentStep(index);
        resetEntryForm();
        clearNotice();
    };

    const goBack = () => goToStep(Math.max(currentStep - 1, 0));

    const handleContinue = async () => {
        if (currentStep === LAST_STEP) {
            await saveSkills();
            return;
        }

        // If the user typed something (or is editing), save it before moving on.
        const section = STEPS[currentStep].key;
        const hasTempValues = Object.values(temp).some((value) => typeof value === "string" && value.trim());

        if (editing || hasTempValues) {
            await addOrUpdateEntry(section);
            return;
        }

        setCurrentStep((previous) => Math.min(previous + 1, LAST_STEP));
        clearNotice();
    };

    /* ---------- PDF download ---------- */

    const handleDownloadPDF = async () => {
        try {
            setDownloading(true);
            const response = await api.downloadResume();

            const blob = new Blob([response.data], { type: "application/pdf" });
            const objectUrl = URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = objectUrl;
            link.download = "my-resume.pdf";
            document.body.appendChild(link);
            link.click();
            link.remove();

            window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
            showNotice("success", "Your resume download has started.");
        } catch (error) {
            console.error("PDF download error:", error.response?.data || error);
            showNotice("error", error.response?.data?.message || error.message || "Unable to download your resume.");
        } finally {
            setDownloading(false);
        }
    };

    /* ---------- Render ---------- */

    const currentSection = STEPS[currentStep].key;
    const isSkillsStep = currentStep === LAST_STEP;

    const counts = {
        education: formData.education.length,
        experience: formData.experience.length,
        projects: formData.projects.length,
        skills: formData.skills.filter((skill) => skill.trim()).length,
    };

    return (
        <div className="min-h-screen bg-[#f7f8fc] text-slate-800">
            <Header downloading={downloading} onDownload={handleDownloadPDF} />

            <main className="mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-10 lg:px-8">
                <Hero currentStep={currentStep} progress={progress} />
                <StepTabs currentStep={currentStep} onSelect={goToStep} />
                <Notice notice={notice} onDismiss={clearNotice} />

                <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
                    {/* Main card */}
                    <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <div className="p-5 sm:p-8">
                            {loadingData ? (
                                <div className="py-16 text-center">
                                    <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-violet-600 border-t-transparent" />
                                    <p className="mt-4 text-sm text-slate-500">Loading your saved resume data...</p>
                                </div>
                            ) : isSkillsStep ? (
                                <SkillsStep
                                    skills={formData.skills}
                                    onAdd={addSkill}
                                    onUpdate={updateSkill}
                                    onRemove={removeSkill}
                                />
                            ) : (
                                <EntrySection
                                    section={currentSection}
                                    stepIndex={currentStep}
                                    entries={formData[currentSection]}
                                    temp={temp}
                                    editing={editing}
                                    saving={saving}
                                    onChange={handleTempChange}
                                    onSubmit={() => addOrUpdateEntry(currentSection)}
                                    onCancelEdit={resetEntryForm}
                                    onEdit={startEdit}
                                    onDelete={deleteEntry}
                                />
                            )}
                        </div>

                        {/* Footer navigation */}
                        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/70 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                            <button
                                type="button"
                                onClick={goBack}
                                disabled={currentStep === 0 || saving}
                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                ← Back
                            </button>

                            <div className="flex flex-col gap-3 sm:flex-row">
                                {isSkillsStep && (
                                    <button
                                        type="button"
                                        onClick={handleDownloadPDF}
                                        disabled={downloading || saving}
                                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-violet-200 bg-white px-5 py-3 text-sm font-semibold text-violet-700 transition hover:bg-violet-50 disabled:opacity-50"
                                    >
                                        {downloading ? "Preparing PDF..." : "Download PDF"}
                                    </button>
                                )}

                                <button
                                    type="button"
                                    onClick={handleContinue}
                                    disabled={saving || downloading || loadingData}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-violet-600/15 transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {saving ? "Saving..." : isSkillsStep ? "Save Skills" : "Continue"}
                                    {!saving && !isSkillsStep && <span aria-hidden="true">→</span>}
                                </button>
                            </div>
                        </div>
                    </section>

                    <Sidebar counts={counts} onBackToStart={() => goToStep(0)} />
                </div>

                <footer className="py-8 text-center text-xs text-slate-400">
                    Build your future, one step at a time.
                </footer>
            </main>
        </div>
    );
}