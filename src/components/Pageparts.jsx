import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

/* Shared pieces for the "For Candidates" and "For Employers" pages.
   Put this file in e.g. src/components/PageParts.jsx */

export function Container({ children, className = "" }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

export function SectionHeading({ title, text, center = false, light = false }) {
  return (
    <div className={`mb-10 max-w-2xl sm:mb-12 ${center ? "mx-auto text-center" : ""}`}>
      <h2
        className={`text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl ${
          light ? "text-white" : "text-gray-900"
        }`}
      >
        {title}
      </h2>
      {text && <p className={`mt-3 leading-7 ${light ? "text-purple-200" : "text-gray-600"}`}>{text}</p>}
    </div>
  );
}

/** features = [{ icon: ReactIconComponent, title, text }] */
export function FeatureGrid({ features }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {features.map(({ icon: Icon, title, text }) => (
        <li
          key={title}
          className="rounded-xl border border-gray-200 bg-white p-6 transition hover:border-purple-300 hover:shadow-md"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-purple-100 text-lg text-purple-700">
            <Icon aria-hidden="true" />
          </span>
          <h3 className="mt-4 font-semibold text-gray-900">{title}</h3>
          <p className="mt-1.5 text-sm leading-6 text-gray-600">{text}</p>
        </li>
      ))}
    </ul>
  );
}

/** steps = [{ title, text }]  (4 steps fit the grid best) */
export function StepList({ steps }) {
  return (
    <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, index) => (
        <li key={step.title} className="border-t-2 border-purple-600 pt-4">
          <span className="text-sm font-bold text-purple-600">Step {index + 1}</span>
          <h3 className="mt-2 text-lg font-semibold text-gray-900">{step.title}</h3>
          <p className="mt-1 text-sm leading-6 text-gray-600">{step.text}</p>
        </li>
      ))}
    </ol>
  );
}

/** items = [{ q, a }] */
export function Faq({ items }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="mx-auto max-w-3xl divide-y divide-gray-200 overflow-hidden rounded-xl border border-gray-200 bg-white">
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <div key={item.q}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : index)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-gray-900 transition hover:text-purple-700"
              >
                {item.q}
                {isOpen ? (
                  <FaMinus className="shrink-0 text-xs text-purple-600" aria-hidden="true" />
                ) : (
                  <FaPlus className="shrink-0 text-xs text-gray-400" aria-hidden="true" />
                )}
              </button>
            </h3>
            {isOpen && <p className="px-5 pb-5 text-sm leading-6 text-gray-600">{item.a}</p>}
          </div>
        );
      })}
    </div>
  );
}