import React from "react";
import { FaSearch } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa";
import { MdOutlineWork } from "react-icons/md";
import { HiOutlineBadgeCheck } from "react-icons/hi";

export default function HowItWorks() {
  const steps = [
    {
      title: "Search Jobs",
      icon: FaSearch,
      desc: "Find jobs that match your skills and interests easily.",
    },
    {
      title: "Apply for Job",
      icon: FaUserCheck,
      desc: "Submit your application quickly with just a few clicks.",
    },
    {
      title: "Get Interview",
      icon: MdOutlineWork,
      desc: "Employers will contact you for interviews.",
    },
    {
      title: "Get Hired",
      icon: HiOutlineBadgeCheck,
      desc: "Start your dream job and grow your career.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Heading */}
        <div className="text-center mb-12">
          <h5 className="text-md md:text-xl font-bold text-[#613FE5]">
            How It Works
          </h5>
          <h3 className="text-2xl md:text-4xl font-bold text-gray-900">
            Follow Easy 4 Steps
          </h3>
          <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
            It is a long established fact that a reader will be distracted by the readable content.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={index}
                className="group bg-white p-6 rounded-2xl shadow-sm text-center 
                hover:bg-gradient-to-r hover:from-purple-500 hover:to-purple-700 
                transition-all duration-300 ease-in-out 
                hover:shadow-xl hover:-translate-y-2"
              >
                {/* Icon Circle */}
                <div
                  className="w-14 h-14 mx-auto mb-4 flex items-center justify-center 
                  bg-purple-100 text-purple-600 rounded-full text-2xl 
                  transition-all duration-300 
                  group-hover:bg-white group-hover:text-purple-600 group-hover:scale-110"
                >
                  <Icon />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-800 
                group-hover:text-white transition">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 mt-2 text-sm 
                group-hover:text-purple-100 transition">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}