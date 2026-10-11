import React from "react";
import {
  FaPenNib,
  FaPaintBrush,
  FaLayerGroup,
  FaLaptopCode,
  FaCube,
  FaCode,
  FaArrowRight,
} from "react-icons/fa";
import { MdAnimation } from "react-icons/md";

const categories = [
  { title: "UI/UX Design", jobs: "100+", icon: FaPenNib, slug: "ui-ux-design" },
  { title: "Illustration", jobs: "200+", icon: FaPaintBrush, slug: "illustration" },
  { title: "Cool Art", jobs: "150+", icon: FaLayerGroup, slug: "cool-art" },
  { title: "Web Design", jobs: "100+", icon: FaLaptopCode, slug: "web-design" },
  { title: "Product Design", jobs: "110+", icon: FaCube, slug: "product-design" },
  { title: "Developer", jobs: "250+", icon: FaCode, slug: "developer" },
  { title: "Animation", jobs: "150+", icon: MdAnimation, slug: "animation" },
];

const cardBase =
  "group relative flex h-full flex-col items-center justify-center rounded-2xl p-5 text-center transition duration-300 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 sm:p-7";

export default function JobCategories() {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-1 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
          <p className="font-medium text-purple-600">Jobs category</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Choose your desired category
          </h2>
          <p className="mt-4 text-gray-500">
            Discover jobs based on your skills and passion. Explore categories tailored just for you.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {categories.map(({ title, jobs, icon: Icon, slug }) => (
            <a
              key={slug}
              href={`/jobs?category=${slug}`}
              className={`${cardBase} border border-gray-200 bg-white shadow-sm hover:border-purple-600 hover:bg-purple-600 hover:shadow-xl hover:shadow-purple-600/20`}
            >
              <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-2xl text-purple-600 transition duration-300 group-hover:bg-white/15 group-hover:text-white">
                <Icon aria-hidden="true" />
              </span>

              <h3 className="text-base font-semibold text-gray-900 transition group-hover:text-white sm:text-lg">
                {title}
              </h3>

              <p className="mt-1.5 text-sm text-gray-500 transition group-hover:text-purple-100">
                {jobs} new jobs posted
              </p>
            </a>
          ))}

          {/* "More" card */}
          <a
            href="/jobs"
            className={`${cardBase} bg-purple-600 text-white shadow-lg shadow-purple-600/25 hover:bg-purple-700`}
          >
            <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-xl transition group-hover:translate-x-1">
              <FaArrowRight aria-hidden="true" />
            </span>
            <h3 className="text-base font-semibold sm:text-lg">100+ more categories</h3>
            <p className="mt-1.5 text-sm text-purple-100">Browse all jobs</p>
          </a>
        </div>
      </div>
    </section>
  );
}