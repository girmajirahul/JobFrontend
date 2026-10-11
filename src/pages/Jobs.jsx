import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import {
  MIN_LPA_OPTIONS,
  SORT_OPTIONS,
  cleanJob,
  filterJobs,
  formatSalary,
  readFilters,
  sortJobs,
} from "../utils/jobFilters"; // adjust the path to where you saved jobFilters.js

const PAGE_SIZE = 6;
const MAX_VISIBLE_SKILLS = 4;

/* ============================================================================
 * Small helpers + icons
 * ========================================================================== */

function timeAgo(dateString) {
  if (!dateString) return "";
  const days = Math.floor((Date.now() - new Date(dateString)) / 86400000);
  if (days < 1) return "Today";
  if (days === 1) return "1 day ago";
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;
  return new Date(dateString).toLocaleDateString("en-IN");
}

/** [1, "…", 4, 5, 6, "…", 12] style page list */
function getPageNumbers(current, total) {
  const wanted = new Set([1, total, current - 1, current, current + 1]);
  const sorted = [...wanted].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const result = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) result.push(`gap-${p}`);
    result.push(p);
  });
  return result;
}

const Svg = ({ children, className = "h-4 w-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {children}
  </svg>
);

const SearchIcon = (props) => (
  <Svg {...props}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </Svg>
);
const PinIcon = (props) => (
  <Svg {...props}>
    <path d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </Svg>
);
const CashIcon = (props) => (
  <Svg {...props}>
    <rect x="3" y="6" width="18" height="12" rx="2" />
    <circle cx="12" cy="12" r="2.5" />
  </Svg>
);
const ClockIcon = (props) => (
  <Svg {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </Svg>
);
const FilterIcon = (props) => (
  <Svg {...props}>
    <path d="M4 6h16M7 12h10M10 18h4" />
  </Svg>
);

const clamp2 = { display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" };

/* ============================================================================
 * Page
 * ========================================================================== */

export default function JobPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showFilters, setShowFilters] = useState(false); // mobile only

  /* ---------- 1. Fetch once ---------- */
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/jobs`)
      .then((res) => setJobs((res.data.jobs ?? []).map(cleanJob)))
      .catch((err) => {
        console.error(err);
        setError("Could not load jobs. Please try again.");
      })
      .finally(() => setLoading(false));
  }, []);

  /* ---------- 2. The URL is the single source of truth ---------- */
  const filters = useMemo(() => readFilters(searchParams), [searchParams]);

  const [keywordInput, setKeywordInput] = useState(filters.keyword);
  const [locationInput, setLocationInput] = useState(filters.location);

  useEffect(() => {
    setKeywordInput(filters.keyword);
    setLocationInput(filters.location);
  }, [filters.keyword, filters.location]);

  /** Update one or more query params. Empty values are removed from the URL. */
  const updateParams = (changes) => {
    const next = new URLSearchParams(searchParams);

    Object.entries(changes).forEach(([key, value]) => {
      if (value === "" || value === null || value === undefined || value === 0) next.delete(key);
      else next.set(key, String(value));
    });

    if (!("page" in changes)) next.delete("page"); // any filter change goes back to page 1
    setSearchParams(next);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateParams({ keyword: keywordInput.trim(), location: locationInput.trim() });
  };

  const goToPage = (n) => {
    updateParams({ page: n === 1 ? "" : n });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearAll = () => setSearchParams({});

  /* ---------- 3. Filter -> sort -> paginate ---------- */
  const results = useMemo(() => sortJobs(filterJobs(jobs, filters), filters.sort), [jobs, filters]);

  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const page = Math.min(filters.page, totalPages);
  const pageJobs = results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const locations = useMemo(() => [...new Set(jobs.map((job) => job.location).filter(Boolean))].sort(), [jobs]);
  const openRoles = useMemo(() => jobs.filter((job) => job.status === "active").length, [jobs]);

  const activeChips = [
    filters.keyword && { key: "keyword", label: `Keyword: ${filters.keyword}` },
    filters.location && { key: "location", label: `Location: ${filters.location}` },
    filters.minLpa > 0 && { key: "minLpa", label: `${filters.minLpa}+ LPA` },
  ].filter(Boolean);

  /* ---------- 4. UI ---------- */
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ---------- Header + search ---------- */}
      <header className="bg-purple-700 pb-10 pt-10 text-white sm:pb-14 sm:pt-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Find your next job</h1>
          <p className="mt-2 text-purple-100">
            {loading ? "Loading open roles..." : `Browse ${openRoles} open role${openRoles === 1 ? "" : "s"} from top employers.`}
          </p>

          <form
            onSubmit={handleSubmit}
            role="search"
            className="mt-7 flex flex-col gap-2 rounded-xl bg-white p-2 shadow-lg md:flex-row md:items-center"
          >
            <label className="flex flex-1 items-center gap-3 rounded-lg px-3 py-2.5 text-gray-400 focus-within:bg-purple-50">
              <SearchIcon className="h-5 w-5 shrink-0" />
              <input
                type="text"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                placeholder="Job title, skill or company"
                aria-label="Job title, skill or company"
                className="w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
              />
            </label>

            <div className="hidden h-8 w-px bg-gray-200 md:block" />

            <label className="flex flex-1 items-center gap-3 rounded-lg px-3 py-2.5 text-gray-400 focus-within:bg-purple-50">
              <PinIcon className="h-5 w-5 shrink-0" />
              <input
                type="text"
                list="job-locations"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                placeholder="City"
                aria-label="City"
                className="w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
              />
            </label>
            <datalist id="job-locations">
              {locations.map((city) => (
                <option key={city} value={city} />
              ))}
            </datalist>

            <button
              type="submit"
              className="rounded-lg bg-purple-700 px-8 py-3 text-sm font-semibold text-white transition hover:bg-purple-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700"
            >
              Search jobs
            </button>
          </form>
        </div>
      </header>

      {/* ---------- Body: filters + results ---------- */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
          {/* ===== Sidebar filters ===== */}
          <aside className={`${showFilters ? "block" : "hidden"} lg:block`}>
            <div className="rounded-xl border border-gray-200 bg-white p-5 lg:sticky lg:top-6">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="font-semibold text-gray-900">Filters</h2>
                {activeChips.length > 0 && (
                  <button type="button" onClick={clearAll} className="text-sm font-medium text-purple-700 hover:underline">
                    Clear all
                  </button>
                )}
              </div>

              <fieldset>
                <legend className="mb-3 text-sm font-semibold text-gray-900">Minimum salary</legend>
                <div className="space-y-2.5">
                  {MIN_LPA_OPTIONS.map((option) => (
                    <label key={option.value} className="flex cursor-pointer items-center gap-3 text-sm text-gray-700">
                      <input
                        type="radio"
                        name="minLpa"
                        checked={filters.minLpa === option.value}
                        onChange={() => updateParams({ minLpa: option.value })}
                        className="h-4 w-4 accent-purple-600"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="mt-6 border-t border-gray-100 pt-6">
                <legend className="mb-3 text-sm font-semibold text-gray-900">Location</legend>
                <div className="space-y-2.5">
                  <label className="flex cursor-pointer items-center gap-3 text-sm text-gray-700">
                    <input
                      type="radio"
                      name="location"
                      checked={!filters.location}
                      onChange={() => updateParams({ location: "" })}
                      className="h-4 w-4 accent-purple-600"
                    />
                    All locations
                  </label>
                  {locations.map((city) => (
                    <label key={city} className="flex cursor-pointer items-center gap-3 text-sm text-gray-700">
                      <input
                        type="radio"
                        name="location"
                        checked={filters.location.toLowerCase() === city.toLowerCase()}
                        onChange={() => updateParams({ location: city })}
                        className="h-4 w-4 accent-purple-600"
                      />
                      {city}
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>
          </aside>

          {/* ===== Results ===== */}
          <section aria-label="Job results" className="min-w-0">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-gray-600" aria-live="polite">
                {loading ? (
                  "Loading jobs..."
                ) : (
                  <>
                    <span className="font-semibold text-gray-900">{results.length}</span> job
                    {results.length === 1 ? "" : "s"} found
                  </>
                )}
              </p>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowFilters((v) => !v)}
                  aria-expanded={showFilters}
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 lg:hidden"
                >
                  <FilterIcon /> Filters
                </button>

                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="hidden sm:inline">Sort by</span>
                  <select
                    value={filters.sort}
                    onChange={(e) => updateParams({ sort: e.target.value === "latest" ? "" : e.target.value })}
                    className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                  >
                    {SORT_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>

            {/* Active filter chips */}
            {activeChips.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {activeChips.map((chip) => (
                  <button
                    key={chip.key}
                    type="button"
                    onClick={() => updateParams({ [chip.key]: "" })}
                    aria-label={`Remove filter ${chip.label}`}
                    className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-sm font-medium text-purple-700 transition hover:bg-purple-100"
                  >
                    {chip.label} <span aria-hidden="true">×</span>
                  </button>
                ))}
              </div>
            )}

            {error && <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

            {/* List */}
            <div className="mt-5 space-y-4">
              {loading && [1, 2, 3].map((n) => <JobCardSkeleton key={n} />)}
              {!loading && pageJobs.map((job) => <JobCard key={job._id} job={job} />)}
            </div>

            {/* Empty state */}
            {!loading && !error && results.length === 0 && (
              <div className="rounded-xl border border-dashed border-gray-300 bg-white px-6 py-14 text-center">
                <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-50 text-purple-600">
                  <SearchIcon className="h-6 w-6" />
                </span>
                <p className="font-semibold text-gray-900">No jobs match your search</p>
                <p className="mx-auto mt-1 max-w-sm text-sm text-gray-500">
                  Try a different keyword, check the spelling, or remove a filter.
                </p>
                <button
                  type="button"
                  onClick={clearAll}
                  className="mt-6 rounded-lg bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-700"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {!loading && totalPages > 1 && (
              <nav aria-label="Pagination" className="mt-8 flex flex-wrap items-center justify-center gap-1.5">
                <button
                  type="button"
                  disabled={page === 1}
                  onClick={() => goToPage(page - 1)}
                  className="rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>

                {getPageNumbers(page, totalPages).map((item) =>
                  typeof item === "string" ? (
                    <span key={item} className="px-1.5 text-gray-400">
                      …
                    </span>
                  ) : (
                    <button
                      key={item}
                      type="button"
                      onClick={() => goToPage(item)}
                      aria-current={item === page ? "page" : undefined}
                      className={`h-9 min-w-9 rounded-lg px-3 text-sm font-medium transition ${
                        item === page
                          ? "bg-purple-600 text-white"
                          : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {item}
                    </button>
                  )
                )}

                <button
                  type="button"
                  disabled={page === totalPages}
                  onClick={() => goToPage(page + 1)}
                  className="rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </nav>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

/* ============================================================================
 * Job card
 * ========================================================================== */

function JobCard({ job }) {
  const visibleSkills = job.skills.slice(0, MAX_VISIBLE_SKILLS);
  const hiddenCount = job.skills.length - visibleSkills.length;

  return (
    <article className="rounded-xl border border-gray-200 bg-white p-5 transition hover:border-purple-300 hover:shadow-md sm:p-6">
      <div className="flex items-start gap-4">
        {/* Company tile */}
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-purple-100 bg-purple-50 text-lg font-bold text-purple-700">
          {(job.companyName || job.title).charAt(0).toUpperCase()}
        </span>

        <div className="min-w-0 flex-1">
          {/* Title row */}
          <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
            <div className="min-w-0">
              <h2 className="text-lg font-semibold text-gray-900">
                <Link to={`/jobs/${job._id}`} className="hover:text-purple-700">
                  {job.title}
                </Link>
              </h2>
              {job.companyName && <p className="text-sm text-gray-600">{job.companyName}</p>}
            </div>
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
              Full time
            </span>
          </div>

          {/* Meta row */}
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-gray-500">
            {job.location && (
              <li className="flex items-center gap-1.5">
                <PinIcon /> {job.location}
              </li>
            )}
            <li className="flex items-center gap-1.5">
              <CashIcon /> {formatSalary(job.salary)}
            </li>
            {job.createdAt && (
              <li className="flex items-center gap-1.5">
                <ClockIcon /> {timeAgo(job.createdAt)}
              </li>
            )}
          </ul>

          {/* Description */}
          {job.description && (
            <p className="mt-3 text-sm leading-6 text-gray-600" style={clamp2}>
              {job.description}
            </p>
          )}

          {/* Footer */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4">
            <ul className="flex flex-wrap gap-2">
              {visibleSkills.map((skill) => (
                <li key={skill} className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
                  {skill}
                </li>
              ))}
              {hiddenCount > 0 && (
                <li className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-500">
                  +{hiddenCount} more
                </li>
              )}
            </ul>

            <Link
              to={`/jobs/${job._id}`}
              className="rounded-lg bg-purple-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-purple-700"
            >
              Apply now
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

function JobCardSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-gray-200 bg-white p-6" aria-hidden="true">
      <div className="flex gap-4">
        <div className="h-12 w-12 rounded-lg bg-gray-200" />
        <div className="flex-1 space-y-3">
          <div className="h-4 w-1/3 rounded bg-gray-200" />
          <div className="h-3 w-1/4 rounded bg-gray-200" />
          <div className="h-3 w-full rounded bg-gray-100" />
          <div className="h-3 w-4/5 rounded bg-gray-100" />
        </div>
      </div>
    </div>
  );
}