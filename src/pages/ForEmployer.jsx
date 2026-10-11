import {
  FaBolt,
  FaBuilding,
  FaCheck,
  FaClipboardList,
  FaSearch,
  FaShieldAlt,
  FaUsers,
} from "react-icons/fa";
import { Container, SectionHeading, FeatureGrid, StepList, Faq } from "../components/Pageparts";

/* ============================================================================
 * DATA - edit copy, links and prices here
 * ========================================================================== */

const STATS = [
  { value: "10,000+", label: "Registered candidates" },
  { value: "500+", label: "New jobs posted every day" },
  { value: "208,000+", label: "Live jobs on the platform" },
];

const FEATURES = [
  {
    icon: FaBolt,
    title: "Post a job in minutes",
    text: "Add the title, location, salary and skills. Your job goes live as soon as you publish it.",
  },
  {
    icon: FaUsers,
    title: "Reach relevant candidates",
    text: "Candidates find your job by skill, role and city, so applications come from people who fit.",
  },
  {
    icon: FaClipboardList,
    title: "Manage applicants in one place",
    text: "Review, shortlist and update the status of every applicant without spreadsheets.",
  },
  {
    icon: FaSearch,
    title: "Search candidate profiles",
    text: "Don't wait for applications. Browse registered profiles and reach out to people directly.",
  },
  {
    icon: FaBuilding,
    title: "Your company page",
    text: "Show who you are, what you do and every open role on a page that is yours.",
  },
  {
    icon: FaShieldAlt,
    title: "Verified, secure listings",
    text: "Employer accounts and job posts are reviewed so candidates can apply with confidence.",
  },
];

const STEPS = [
  { title: "Create an employer account", text: "Sign up and add your company details." },
  { title: "Post your job", text: "Describe the role and the skills you need." },
  { title: "Review applicants", text: "Shortlist the best matches in your dashboard." },
  { title: "Make the hire", text: "Contact candidates, interview and send the offer." },
];

// PLACEHOLDER pricing - replace with your real plans (or delete the section).
const PLANS = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    description: "Try the platform with your first job.",
    features: ["1 active job post", "Receive and view applicants", "Basic company page"],
    cta: "Start for free",
    href: "/signup?role=employer",
  },
  {
    name: "Growth",
    price: "₹2,999",
    period: "/ month",
    description: "For teams that hire regularly.",
    features: ["Up to 10 active jobs", "Search candidate profiles", "Applicant status tracking", "Priority listing"],
    cta: "Choose Growth",
    href: "/signup?role=employer&plan=growth",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "High-volume hiring with extra support.",
    features: ["Unlimited jobs", "Dedicated account manager", "Custom reporting"],
    cta: "Talk to us",
    href: "/contact",
  },
];

const FAQ = [
  {
    q: "How much does it cost to post a job?",
    a: "You can post your first job for free. Paid plans add more active jobs and access to candidate search.",
  },
  {
    q: "How soon does my job go live?",
    a: "Right after you publish it, once your employer account is verified.",
  },
  {
    q: "Can I edit or close a job after posting?",
    a: "Yes. From your dashboard you can edit the details, mark a job as inactive or reopen it any time.",
  },
  {
    q: "How do I contact candidates?",
    a: "Open an applicant from your dashboard to see their profile and contact details, then reach out directly.",
  },
  {
    q: "Are the candidates verified?",
    a: "Candidates register with an email address and build a profile with their education, experience and skills, which you can review before contacting them.",
  },
];

const APPLICANTS = [
  { name: "Priya Sharma", meta: "Pune · 2 yrs experience", status: "Shortlisted", tone: "bg-purple-50 text-purple-700" },
  { name: "Rahul Verma", meta: "Mumbai · 1 yr experience", status: "New", tone: "bg-sky-50 text-sky-700" },
  { name: "Ananya Iyer", meta: "Bangalore · 3 yrs experience", status: "Interview", tone: "bg-amber-50 text-amber-700" },
  { name: "Karan Mehta", meta: "Pune · 0–1 yrs experience", status: "New", tone: "bg-sky-50 text-sky-700" },
];

/* ============================================================================
 * SECTIONS
 * ========================================================================== */

function Hero() {
  return (
    <section className="bg-[#1a1530] text-white">
      <Container className="grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
        <div>
          <p className="mb-4 inline-flex rounded-full border border-white/20 px-3 py-1 text-sm font-medium text-purple-200">
            For employers
          </p>
          <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            Hire the right people, faster.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-purple-200 sm:text-lg">
            Post a job in minutes and reach thousands of registered candidates. Review applicants and make your next
            hire from one dashboard.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/dashboard/employer/post-job"
              className="rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-purple-800 transition hover:bg-purple-100"
            >
              Post a job
            </a>
            <a
              href="/contact"
              className="rounded-xl border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Talk to our team
            </a>
          </div>
        </div>

        {/* "Post a job" form preview */}
        <div className="mx-auto w-full max-w-md" aria-hidden="true">
          <div className="rounded-2xl bg-white p-6 text-gray-900 shadow-2xl">
            <p className="font-semibold">Post a job</p>

            {[
              { label: "Job title", value: "React.js Developer" },
              { label: "Location", value: "Pune" },
              { label: "Salary", value: "₹8 LPA" },
            ].map((field) => (
              <div key={field.label} className="mt-4">
                <p className="mb-1 text-xs font-medium text-gray-500">{field.label}</p>
                <div className="rounded-lg border border-gray-200 px-3 py-2.5 text-sm">{field.value}</div>
              </div>
            ))}

            <div className="mt-4">
              <p className="mb-1 text-xs font-medium text-gray-500">Skills</p>
              <div className="flex flex-wrap gap-2">
                {["React", "JavaScript", "CSS"].map((skill) => (
                  <span key={skill} className="rounded-md bg-purple-50 px-2.5 py-1 text-xs font-medium text-purple-700">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-lg bg-purple-600 py-3 text-center text-sm font-semibold text-white">
              Publish job
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Stats() {
  return (
    <section className="border-b border-gray-200 bg-white">
      <Container>
        <dl className="grid divide-y divide-gray-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {STATS.map((stat) => (
            <div key={stat.label} className="px-4 py-8 text-center sm:py-10">
              <dd className="text-3xl font-extrabold text-gray-900 sm:text-4xl">{stat.value}</dd>
              <dt className="mt-1 text-sm text-gray-500">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}

function Features() {
  return (
    <section className="bg-[#f8f7fc] py-16 sm:py-20">
      <Container>
        <SectionHeading
          title="Everything you need to hire"
          text="From the first job post to the final offer, manage hiring without the busywork."
        />
        <FeatureGrid features={FEATURES} />
      </Container>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <SectionHeading title="How hiring works here" text="Four steps from account to new team member." />
        <StepList steps={STEPS} />
      </Container>
    </section>
  );
}

function DashboardPreview() {
  return (
    <section className="bg-[#f8f7fc] py-16 sm:py-20">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
            Every applicant, one dashboard
          </h2>
          <p className="mt-3 max-w-lg leading-7 text-gray-600">
            See who applied, read their profile and move them through your hiring process. No spreadsheets, no lost
            emails.
          </p>

          <ul className="mt-6 space-y-3">
            {[
              "Applicant list for every job you post",
              "Update status: new, shortlisted, interview, hired",
              "Edit, close or reopen jobs at any time",
            ].map((point) => (
              <li key={point} className="flex items-start gap-3 text-gray-700">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-100 text-[10px] text-purple-700">
                  <FaCheck aria-hidden="true" />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* Applicants mock */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl shadow-purple-900/5" aria-hidden="true">
          <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
            <div>
              <p className="font-semibold text-gray-900">React.js Developer</p>
              <p className="text-xs text-gray-500">Pune · 24 applicants</p>
            </div>
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">Active</span>
          </div>

          <ul className="divide-y divide-gray-100">
            {APPLICANTS.map((person) => (
              <li key={person.name} className="flex items-center gap-3 px-5 py-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-100 text-sm font-bold text-purple-700">
                  {person.name.charAt(0)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-gray-900">{person.name}</p>
                  <p className="truncate text-xs text-gray-500">{person.meta}</p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${person.tone}`}>{person.status}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

function Pricing() {
  return (
    <section className="bg-white py-16 sm:py-20" id="pricing">
      <Container>
        <SectionHeading center title="Simple plans" text="Start free, upgrade when you're hiring more." />

        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl p-7 ${
                plan.popular
                  ? "border-2 border-purple-600 bg-white shadow-xl shadow-purple-600/10"
                  : "border border-gray-200 bg-white"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-7 rounded-full bg-purple-600 px-3 py-1 text-xs font-semibold text-white">
                  Most popular
                </span>
              )}

              <h3 className="font-semibold text-gray-900">{plan.name}</h3>
              <p className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                {plan.period && <span className="text-sm text-gray-500">{plan.period}</span>}
              </p>
              <p className="mt-2 text-sm text-gray-600">{plan.description}</p>

              <ul className="my-6 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-gray-700">
                    <FaCheck className="mt-1 shrink-0 text-xs text-purple-600" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href={plan.href}
                className={`rounded-xl px-5 py-3 text-center text-sm font-semibold transition ${
                  plan.popular
                    ? "bg-purple-600 text-white hover:bg-purple-700"
                    : "border border-gray-300 text-gray-800 hover:border-purple-400 hover:text-purple-700"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Testimonial() {
  return (
    <section className="bg-[#f8f7fc] py-16 sm:py-20">
      <Container>
        <figure className="mx-auto max-w-3xl text-center">
          <blockquote className="text-xl font-medium leading-9 text-gray-900 sm:text-2xl">
            “We posted a role on Monday and had a shortlist of good candidates by Friday. It saved us a lot of
            screening time.”
          </blockquote>
          <figcaption className="mt-6 flex items-center justify-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-purple-600 font-bold text-white">
              T
            </span>
            <span className="text-left">
              <span className="block font-semibold text-gray-900">Hiring manager</span>
              <span className="block text-sm text-gray-500">Tech Solutions, Pune</span>
            </span>
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <SectionHeading center title="Questions employers ask" />
        <Faq items={FAQ} />
      </Container>
    </section>
  );
}

/* ============================================================================
 * PAGE  (the Footer already ends with a banner, so no extra CTA here)
 * ========================================================================== */

export default function ForEmployers() {
  return (
    <main>
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <DashboardPreview />
      <Pricing />
      <Testimonial />
      <FaqSection />
    </main>
  );
}