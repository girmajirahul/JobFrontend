/**
 * jobFilters.js
 * Pure helpers (no React) for filtering jobs from URL query params like:
 *   /jobs?keyword=Reactjs&location=Pune&minLpa=5&sort=salary&page=2
 *
 * Put this file at e.g. src/utils/jobFilters.js
 */

/* ---------------------------------------------------------------------------
 * Text normalisation
 * "Reactjs", "React.js", "React" -> "react"   |   "Node.js", "Nodejs" -> "node"
 * ------------------------------------------------------------------------ */

const stripJs = (word) => (word.length > 2 && word.endsWith("js") ? word.slice(0, -2) : word);

export const normalize = (text) =>
  String(text ?? "")
    .toLowerCase()
    .replace(/\./g, "") // Node.js -> nodejs
    .replace(/[^a-z0-9+#\s]/g, " ") // keep c++ and c#
    .split(/\s+/)
    .filter(Boolean)
    .map(stripJs)
    .join(" ");

/* ---------------------------------------------------------------------------
 * Salary helpers
 * Your API mixes formats: "20000", "13000", "8 LPA", "600000".
 * Rules used here:
 *   - contains "LPA" / "lakh"  -> already in lakhs per annum
 *   - number >= 100000         -> yearly rupees
 *   - smaller number           -> assumed MONTHLY rupees (x12)
 * Best fix long-term: store salary as a number + a `salaryType` in your DB.
 * ------------------------------------------------------------------------ */

export function salaryToLpa(raw) {
  const text = String(raw ?? "").toLowerCase();
  const num = parseFloat(text.replace(/,/g, "").match(/[\d.]+/)?.[0]);
  if (Number.isNaN(num)) return null;
  if (text.includes("lpa") || text.includes("lakh")) return num;
  if (num >= 100000) return num / 100000;
  return (num * 12) / 100000;
}

export function formatSalary(raw) {
  const text = String(raw ?? "").trim();
  if (!text) return "Not disclosed";
  if (/lpa|lakh/i.test(text)) return `₹${text.replace(/^₹\s*/, "")}`;

  const num = parseFloat(text.replace(/,/g, ""));
  if (Number.isNaN(num)) return text;
  if (num >= 100000) return `₹${Number((num / 100000).toFixed(1))} LPA`;
  return `₹${num.toLocaleString("en-IN")} / month`;
}

/* ---------------------------------------------------------------------------
 * Clean data coming from the API
 * Fixes: "Employer " (trailing space), " JavaScript" (leading space),
 * "Backend Developer\n" (newline), and builds a searchable text blob.
 * ------------------------------------------------------------------------ */

export function cleanJob(job) {
  const title = String(job.title ?? "").trim();
  const location = String(job.location ?? "").trim();
  const companyName = String(job.company?.name ?? job.company?.companyName ?? "").trim();
  const skills = (job.skills ?? []).map((skill) => String(skill).trim()).filter(Boolean);

  return {
    ...job,
    title,
    location,
    companyName,
    skills,
    _search: normalize([title, job.description, companyName, location, ...skills].join(" ")),
  };
}

/* ---------------------------------------------------------------------------
 * URL <-> filters
 * ------------------------------------------------------------------------ */

export const SORT_OPTIONS = [
  { value: "latest", label: "Newest first" },
  { value: "salary", label: "Highest salary" },
];

export const MIN_LPA_OPTIONS = [
  { value: 0, label: "Any salary" },
  { value: 3, label: "3+ LPA" },
  { value: 5, label: "5+ LPA" },
  { value: 8, label: "8+ LPA" },
  { value: 10, label: "10+ LPA" },
];

export function readFilters(searchParams) {
  const sort = searchParams.get("sort");
  return {
    keyword: (searchParams.get("keyword") ?? "").trim(),
    location: (searchParams.get("location") ?? "").trim(),
    minLpa: Number(searchParams.get("minLpa")) || 0,
    sort: SORT_OPTIONS.some((option) => option.value === sort) ? sort : "latest",
    page: Math.max(1, Number(searchParams.get("page")) || 1),
  };
}

/* ---------------------------------------------------------------------------
 * Filter + sort
 * ------------------------------------------------------------------------ */

export function filterJobs(jobs, { keyword, location, minLpa }) {
  // Every word typed must appear somewhere in the job (title, skills, description, company, city)
  const words = normalize(keyword).split(" ").filter(Boolean);
  // "Pune, Maharashtra" -> "pune"
  const place = normalize(String(location ?? "").split(",")[0]);

  return jobs.filter((job) => {
    if (job.status !== "active") return false;
    if (words.length && !words.every((word) => job._search.includes(word))) return false;
    if (place && !normalize(job.location).includes(place)) return false;

    if (minLpa) {
      const lpa = salaryToLpa(job.salary);
      if (lpa === null || lpa < minLpa) return false;
    }
    return true;
  });
}

export function sortJobs(jobs, sort) {
  const copy = [...jobs];
  if (sort === "salary") {
    return copy.sort((a, b) => (salaryToLpa(b.salary) ?? 0) - (salaryToLpa(a.salary) ?? 0));
  }
  return copy.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}