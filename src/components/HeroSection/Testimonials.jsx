import React from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function Testimonials() {
  const data = [
    {
      name: "Max Makina",
      role: "One Year With Us",
      image: "/images/pic5.png",
      desc: "It is a long established fact that a reader will be distracted by readable content of a page when looking at its layout.",
    },
    {
      name: "Makima Smith",
      role: "One Year With Us",
      image: "/images/pic3.jpg",
      desc: "It is a long established fact that a reader will be distracted by readable content of a page when looking at its layout.",
    },
    {
      name: "Andrew Smith",
      role: "One Year With Us",
      image: "/images/pic4.png",
      desc: "It is a long established fact that a reader will be distracted by readable content of a page when looking at its layout.",
    },
  ];

  return (
    <section className="p-20 bg-white relative mb-30">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-purple-600 font-medium">Clients Testimonials</p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-2">
            What A Job Holder Says About Us
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            There are many variations of passages available, but the majority have suffered some form.
          </p>
        </div>

        {/* Cards */}
        <div className="relative flex items-center">

          {/* Left Arrow */}
          {/* <button className="hidden md:flex absolute left-0 z-10 bg-white shadow-md p-3 rounded-lg hover:bg-purple-600 hover:text-white transition">
            <FiChevronLeft />
          </button> */}

          {/* Testimonial Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {data.map((item, index) => (
              <div
                key={index}
                className="relative mt-6 bg-purple-100/70 p-6 rounded-2xl text-center shadow-sm hover:shadow-xl transition"
              >
                {/* Avatar */}
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                  <div className="w-20 h-20 rounded-full border-4 border-purple-500 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="mt-12">
                  {/* <FaQuoteLeft className="text-purple-500 text-3xl mx-auto mb-4" /> */}

                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h3>

                  <p className="text-purple-600 text-sm mb-3">
                    {item.role}
                  </p>

                  <p className="text-gray-600 text-sm">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          {/* <button className="hidden md:flex absolute right-0 z-10 bg-white shadow-md p-3 rounded-lg hover:bg-purple-600 hover:text-white transition">
            <FiChevronRight />
          </button> */}
        </div>
      </div>
    </section>
  );
}