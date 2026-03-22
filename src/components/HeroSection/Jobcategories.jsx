import React from "react";
import { FaPaintBrush, FaCode, FaLayerGroup, FaLaptopCode } from "react-icons/fa";
import { MdAnimation } from "react-icons/md";
import { HiOutlineLightBulb } from "react-icons/hi";

export default function JobCategories() {
  const categories = [
    { title: "UI/UX Design", jobs: "100+", icon: FaPaintBrush  },
    { title: "Illustration", jobs: "200+", icon: HiOutlineLightBulb},
    { title: "Cool Art", jobs: "150+", icon: FaLayerGroup },
    { title: "Web Design", jobs: "100+", icon: FaLaptopCode },
    { title: "Product Design", jobs: "110+", icon: FaPaintBrush },
    { title: "Developer", jobs: "250+", icon: FaCode },
    { title: "Animation", jobs: "150+", icon: MdAnimation },
    { title: "100+ More", jobs: "", icon: null, more: true },
  ];

  return (
    <section className="p-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-purple-600 font-medium">Jobs Category</p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-2">
            Choose Your Desire Category
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Discover jobs based on your skills and passion. Explore categories tailored just for you.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

          {categories.map((cat, index) => {
            const Icon = cat.icon;

            return (
              <div
                key={index}
                className={`group relative p-6 rounded-2xl text-center cursor-pointer transition-all duration-300 
                ${cat.highlight || cat.more
                  ? "bg-gradient-to-r from-purple-500 to-purple-700 text-white shadow-lg"
                  : "bg-white/60 backdrop-blur-md border border-gray-200 hover:bg-gradient-to-r hover:from-purple-500 hover:to-purple-700 hover:text-white shadow-sm hover:shadow-xl"
                }`}
              >
                
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 bg-purple-500/10 blur-xl transition"></div>

                {/* Icon */}
                {Icon && (
                  <div className={`w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full text-2xl transition-all duration-300
                    ${cat.highlight
                      ? "bg-white text-purple-600"
                      : "bg-purple-100 text-purple-600 group-hover:bg-white group-hover:text-purple-600"
                    }`}>
                    <Icon />
                  </div>
                )}

                {/* Title */}
                <h3 className="text-lg font-semibold">
                  {cat.more ? "100+ More Category" : cat.title}
                </h3>

                {/* Jobs */}
                {!cat.more && (
                  <p className={`mt-2 text-sm 
                    ${cat.highlight ? "text-purple-100" : "text-gray-500 group-hover:text-purple-100"}`}>
                    {cat.jobs}+ Posted New Jobs
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}