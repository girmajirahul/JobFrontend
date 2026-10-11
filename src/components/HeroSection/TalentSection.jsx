import React from "react";

const stats = [
  { value: "10,000+", label: "People registered" },
  { value: "500+", label: "New jobs every day" },
  { value: "208,000+", label: "Live jobs" },
];

export default function TalentSection() {
  return (
    <section className="overflow-hidden bg-gray-50 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
        {/* LEFT CONTENT */}
        <div>
          <p className="mb-3 font-medium text-purple-600">Our community</p>

          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Over 10,000 talented people have registered on our website
          </h2>

          <p className="mt-5 max-w-md leading-7 text-gray-600">
            Create your profile once and let employers find you. Keep applying to the roles you like while new
            opportunities come to you.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="/signup"
              className="rounded-xl bg-purple-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-600/20 transition hover:bg-purple-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
            >
              Join now
            </a>
            <a
              href="/jobs"
              className="rounded-xl border border-gray-300 bg-white px-7 py-3.5 text-sm font-semibold text-gray-700 transition hover:border-purple-300 hover:text-purple-700"
            >
              Browse jobs
            </a>
          </div>

          {/* Stats */}
          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-gray-200 pt-6">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-xl font-extrabold text-gray-900 sm:text-2xl">{stat.value}</dd>
                <p className="mt-0.5 text-xs text-gray-500 sm:text-sm" aria-hidden="true">
                  {stat.label}
                </p>
              </div>
            ))}
          </dl>
        </div>

        {/* RIGHT DESIGN */}
        <div className="relative flex items-end justify-center">
          {/* Purple shape: sized as a percentage of the image, so it scales on every screen */}
          <div className="absolute bottom-0 right-0 h-[90%] w-[88%] rounded-l-[80px] bg-gradient-to-br from-purple-500 to-purple-700 md:rounded-l-[120px]" />

          {/* Image */}
          <img
            src="/images/man1.png"
            alt="Smiling professional pointing to the sign-up area"
            className="relative z-10 w-full max-w-sm md:max-w-md"
          />

          {/* Floating chip */}
          <div className="absolute bottom-6 left-0 z-20 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-lg ring-1 ring-gray-100 sm:left-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <p className="text-sm font-semibold text-gray-900">New members joining today</p>
          </div>
        </div>
      </div>
    </section>
  );
}