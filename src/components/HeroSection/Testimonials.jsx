import React, { useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "Max Makina",
    role: "One year with us",
    image: "/images/pic5.png",
    quote:
      "I applied to five roles on my first evening and had two interview calls by the end of the week.",
  },
  {
    name: "Makima Smith",
    role: "One year with us",
    image: "/images/pic3.jpg",
    quote:
      "The categories are accurate, so I only saw jobs that were actually relevant to my skills.",
  },
  {
    name: "Andrew Smith",
    role: "One year with us",
    image: "/images/pic4.png",
    quote:
      "I set up my profile once and recruiters started finding me. The whole process felt simple.",
  },
];

/* Shows the photo; if it fails to load, falls back to the person's initial. */
function Avatar({ src, name }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="h-20 w-20 overflow-hidden rounded-full border-4 border-white bg-purple-600 shadow-lg ring-2 ring-purple-500">
      {failed ? (
        <span className="flex h-full w-full items-center justify-center text-2xl font-bold text-white">
          {name.charAt(0)}
        </span>
      ) : (
        <img
          src={src}
          alt={name}
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      )}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24" id="testimonials">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto mb-16 max-w-2xl text-center sm:mb-20">
          <p className="font-medium text-purple-600">Client testimonials</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            What job holders say about us
          </h2>
          <p className="mt-4 text-gray-500">
            Real stories from people who found their next role through our platform.
          </p>
        </div>

        {/* Cards (extra vertical gap makes room for the overlapping avatars) */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-16 pt-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <figure
              key={item.name}
              className="relative flex flex-col items-center rounded-2xl border border-purple-100 bg-purple-50/70 px-6 pb-8 pt-14 text-center transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-600/10"
            >
              {/* Avatar overlaps the top edge */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                <Avatar src={item.image} name={item.name} />
              </div>

              <FaQuoteLeft className="mb-4 text-2xl text-purple-300" aria-hidden="true" />

              <blockquote className="flex-1 text-sm leading-7 text-gray-600 sm:text-base">
                {item.quote}
              </blockquote>

              <figcaption className="mt-6">
                <p className="text-lg font-semibold text-gray-900">{item.name}</p>
                <p className="text-sm text-purple-600">{item.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}