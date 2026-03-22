import React from "react";

export default function TalentSection() {
  return (
    <section className="bg-gray-100 py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4  grid md:grid-cols-2 items-center gap-10">
        
        {/* LEFT CONTENT */}
        <div>
          <p className="text-purple-600 font-medium mb-2 ">Recent Job</p>

          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
            Over all 10,00+ Talented <br />
            People Registered in <br />
            Our Website
          </h1>

          <p className="mt-4 text-gray-600 max-w-md">
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
          </p>

          <button className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition cursor-pointer">
            Join Now
          </button>
        </div>

        {/* RIGHT DESIGN */}
        <div className="relative flex justify-center">
          
          {/* Purple Shape */}
          <div className="absolute right-0 w-[350px] md:w-[500px] h-[492px] md:h-[600px] bg-gradient-to-r from-purple-500 to-purple-700 rounded-l-[120px]"></div>

          {/* Image */}
          <img
            src="/images/man1.png"
            alt="talent"
            className="relative z-10 w-full max-w-sm md:max-w-md"
          />
        </div>
      </div>
    </section>
  );
}