import { useState } from "react";

const POPULAR_SEARCHES = ["Designer", "Senior", "Architecture", "iOS"];

/* ---------- Small icons (inline, no extra library) ---------- */

const SearchIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="h-5 w-5 shrink-0 text-gray-400" aria-hidden="true">
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
    </svg>
);

const PinIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0 text-gray-400" aria-hidden="true">
        <path d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11z" />
        <circle cx="12" cy="10" r="2.5" />
    </svg>
);

/* ---------- Floating company badge ---------- */

function LogoBadge({ src, alt, className, delay = "0s" }) {
    return (
        <div
            className={`hero-float absolute z-20 flex items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-gray-100 ${className}`}
            style={{ animationDelay: delay }}
        >
            <img src={src} alt={alt} className="h-1/2 w-1/2 object-contain" />
        </div>
    );
}

/* ---------- Hero ---------- */

const Hero = ({ onSearch }) => {
    const [keyword, setKeyword] = useState("");
    const [location, setLocation] = useState("");

    const runSearch = (values) => {
        if (onSearch) return onSearch(values);
        const params = new URLSearchParams();
        if (values.keyword) params.set("keyword", values.keyword);
        if (values.location) params.set("location", values.location);
        window.location.href = `/jobs?${params.toString()}`;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        runSearch({ keyword: keyword.trim(), location: location.trim() });
    };

    return (
        <section className="relative isolate overflow-hidden bg-gray-50">
            {/* Soft background pattern (kept faint so text stays readable) */}
            <div
                className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat opacity-40"
                style={{ backgroundImage: "url('/images/black-lines.png')" }}
                aria-hidden="true"
            />

            {/* Gentle floating animation; disabled for users who prefer reduced motion */}
            <style>{`
                @keyframes hero-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
                .hero-float { animation: hero-float 5s ease-in-out infinite; }
                @media (prefers-reduced-motion: reduce) { .hero-float { animation: none; } }
            `}</style>

            <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-12 sm:px-6 md:grid-cols-2 lg:px-8 lg:py-20">
                {/* ---------------- Left: copy + search ---------------- */}
                <div>
                    <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white px-4 py-1.5 text-sm font-medium text-purple-700 shadow-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                        </span>
                        We have 208,000+ live jobs
                    </p>

                    <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                        Your <span className="text-purple-600">Dream</span> Job Is Waiting For You
                    </h1>

                    <p className="mt-5 max-w-lg text-base leading-7 text-gray-600 sm:text-lg">
                        Type your keyword, then click search to find your perfect job.
                    </p>

                    {/* Search box */}
                    <form
                        onSubmit={handleSubmit}
                        role="search"
                        className="mt-8 flex flex-col gap-2 rounded-2xl bg-white p-2 shadow-xl shadow-purple-900/5 ring-1 ring-gray-200 sm:flex-row sm:items-center"
                    >
                        <label className="flex flex-1 items-center gap-3 rounded-xl px-3 py-3 transition focus-within:bg-purple-50">
                            <SearchIcon />
                            <span className="sr-only">Job title or keywords</span>
                            <input
                                type="text"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                placeholder="Job title, keywords"
                                className="w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
                            />
                        </label>

                        <div className="hidden h-8 w-px bg-gray-200 sm:block" />

                        <label className="flex flex-1 items-center gap-3 rounded-xl px-3 py-3 transition focus-within:bg-purple-50">
                            <PinIcon />
                            <span className="sr-only">City or postcode</span>
                            <input
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="City or postcode"
                                className="w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
                            />
                        </label>

                        <button
                            type="submit"
                            className="rounded-xl bg-purple-600 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-purple-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                        >
                            Find Job
                        </button>
                    </form>

                    {/* Popular searches */}
                    <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
                        <span className="font-medium text-gray-900">Popular searches:</span>
                        {POPULAR_SEARCHES.map((term) => (
                            <button
                                key={term}
                                type="button"
                                onClick={() => runSearch({ keyword: term, location: "" })}
                                className="rounded-full border border-gray-200 bg-white px-3 py-1 text-gray-600 transition hover:border-purple-300 hover:text-purple-700"
                            >
                                {term}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ---------------- Right: image + floating badges ---------------- */}
                <div className="relative mx-auto aspect-square w-full max-w-[420px] sm:max-w-[480px]">
                    {/* Backdrop circles (percentage-based, so they scale on every screen) */}
                    <div className="absolute inset-[8%] rounded-full bg-purple-100" />
                    <div className="absolute inset-[1%] rounded-full border-2 border-dashed border-purple-200" />

                    {/* Main image */}
                    <img
                        src="/images/man.png"
                        alt="Smiling professional ready to start a new job"
                        className="absolute bottom-0 left-1/2 z-10 h-[96%] w-auto -translate-x-1/2 object-contain drop-shadow-xl"
                    />

                    {/* Company badges */}
                    <LogoBadge
                        src="/images/microsoft.svg"
                        alt="Microsoft"
                        className="right-[6%] top-[6%] h-16 w-16 sm:h-20 sm:w-20"
                    />
                    <LogoBadge
                        src="/images/google.svg"
                        alt="Google"
                        className="left-0 top-[34%] h-16 w-16 sm:h-24 sm:w-24"
                        delay="1.2s"
                    />
                    <LogoBadge
                        src="/images/amazon.svg"
                        alt="Amazon"
                        className="bottom-[14%] right-[2%] h-14 w-14 sm:h-16 sm:w-16"
                        delay="2.4s"
                    />

                    {/* Small stat chip */}
                    <div className="absolute bottom-[4%] left-[2%] z-20 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-lg ring-1 ring-gray-100">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-100 text-sm font-bold text-purple-700">
                            +
                        </span>
                        <div className="leading-tight">
                            <p className="text-sm font-bold text-gray-900">500+</p>
                            <p className="text-xs text-gray-500">new jobs every day</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;