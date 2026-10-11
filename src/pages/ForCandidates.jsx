import {
  FaArrowRight,
  FaBell,
  FaBolt,
  FaBookOpen,
  FaCheck,
  FaChartLine,
  FaFileAlt,
  FaLightbulb,
  FaUserCheck,
  FaUserTie,
} from "react-icons/fa";
import { Container, SectionHeading, FeatureGrid, StepList, Faq } from "../components/Pageparts";

/* ============================================================================
 * DATA - edit copy and links here
 * ========================================================================== */

const BENEFITS = [
  {
    icon: FaBolt,
    title: "Apply in one click",
    text: "Your profile is saved, so applying to a job takes seconds instead of re-typing the same details.",
  },
  {
    icon: FaFileAlt,
    title: "Free resume builder",
    text: "Fill in your education, experience, projects and skills, then download a clean one-page PDF.",
  },
  {
    icon: FaBell,
    title: "Job alerts",
    text: "Tell us the roles and cities you want and we'll notify you when matching jobs are posted.",
  },
  {
    icon: FaChartLine,
    title: "Track your applications",
    text: "See every job you applied to and where it stands, all in one place.",
  },
  {
    icon: FaUserTie,
    title: "Get found by employers",
    text: "Recruiters can find your profile, so good opportunities can reach you without applying.",
  },
  {
    icon: FaUserCheck,
    title: "Free for candidates",
    text: "Creating a profile, applying to jobs and downloading your resume cost nothing.",
  },
];

const STEPS = [
  { title: "Create your account", text: "Sign up with your email. It takes under a minute." },
  { title: "Build your profile", text: "Add education, experience, projects and skills, step by step." },
  { title: "Apply to jobs", text: "Search by role, skill or city and apply with your saved profile." },
  { title: "Hear back", text: "Employers contact you directly to set up interviews." },
];

const POPULAR_SKILLS = ["React", "Node.js", "Python", "Java", "UI Designer", "Data Analyst", "DevOps", "Full Stack"];

const GUIDES = [
  {
    icon: FaFileAlt,
    title: "How to write a resume that gets read",
    text: "What recruiters look at in the first ten seconds, and how to make those seconds count.",
    href: "/blog/resume-tips",
  },
  {
    icon: FaLightbulb,
    title: "Preparing for a technical interview",
    text: "A simple plan for practising questions, explaining your projects and staying calm.",
    href: "/blog/interview-prep",
  },
  {
    icon: FaBookOpen,
    title: "Negotiating your first salary",
    text: "How to research a fair range and have the conversation with confidence.",
    href: "/blog/salary-negotiation",
  },
];

const FAQ = [
  {
    q: "Is it really free for candidates?",
    a: "Yes. Creating a profile, building your resume and applying to jobs are all free.",
  },
  {
    q: "Do I need a resume to apply?",
    a: "No. Fill in your profile and our builder creates the resume for you. You can download it as a PDF any time.",
  },
  {
    q: "How will employers contact me?",
    a: "Employers see the details in your profile and the email you registered with, so keep both up to date.",
  },
  {
    q: "Can I apply to more than one job?",
    a: "Yes, as many as you like. Your applications are saved so you can see which ones you've already sent.",
  },
  {
    q: "How do I edit my profile later?",
    a: "Log in and open the profile builder. You can edit or delete education and experience entries whenever you want.",
  },
];

const PROFILE_CHECKLIST = [
  { label: "Education added", done: true },
  { label: "Experience added", done: true },
  { label: "Skills added", done: true },
  { label: "Add a project", done: false },
];

/* ============================================================================
 * SECTIONS
 * ========================================================================== */

function Hero() {
  return (
    <section className="bg-[#f8f7fc]">
      <Container className="grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
        <div>
          <p className="mb-4 inline-flex rounded-full border border-purple-200 bg-white px-3 py-1 text-sm font-medium text-purple-700">
            For candidates
          </p>
          <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Build your profile once. Apply in one click.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
            Create a free profile, download a ready-made resume and apply to jobs that match your skills. Employers
            can find you too.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/signup"
              className="rounded-xl bg-purple-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-600/20 transition hover:bg-purple-700"
            >
              Create free profile
            </a>
            <a
              href="/jobs"
              className="rounded-xl border border-gray-300 bg-white px-7 py-3.5 text-sm font-semibold text-gray-700 transition hover:border-purple-300 hover:text-purple-700"
            >
              Browse jobs
            </a>
          </div>

          <p className="mt-6 text-sm text-gray-500">Free for candidates · 10,000+ people already registered</p>
        </div>

        {/* Profile strength card */}
        <div className="mx-auto w-full max-w-md" aria-hidden="true">
          <div className="rounded-2xl border border-purple-200 bg-white p-6 shadow-xl shadow-purple-900/5">
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-purple-600 text-xl font-bold text-white">
                A
              </span>
              <div>
                <p className="font-semibold text-gray-900">Your name</p>
                <p className="text-sm text-gray-500">React developer · Pune</p>
              </div>
            </div>

            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium text-gray-700">Profile strength</span>
                <span className="font-bold text-purple-700">75%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                <div className="h-full w-3/4 rounded-full bg-purple-600" />
              </div>
            </div>

            <ul className="mt-5 space-y-3">
              {PROFILE_CHECKLIST.map((item) => (
                <li key={item.label} className="flex items-center gap-3 text-sm">
                  {item.done ? (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-[10px] text-emerald-700">
                      <FaCheck />
                    </span>
                  ) : (
                    <span className="h-5 w-5 rounded-full border-2 border-dashed border-gray-300" />
                  )}
                  <span className={item.done ? "text-gray-700" : "font-medium text-purple-700"}>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Benefits() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <SectionHeading
          title="Everything you need to land the job"
          text="Tools that save you time at every step, from your first resume to your first day."
        />
        <FeatureGrid features={BENEFITS} />
      </Container>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="bg-[#f8f7fc] py-16 sm:py-20">
      <Container>
        <SectionHeading title="How it works" text="Four steps from sign-up to interview." />
        <StepList steps={STEPS} />
      </Container>
    </section>
  );
}

function ResumeSpotlight() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
            Your resume, built for you
          </h2>
          <p className="mt-3 max-w-lg leading-7 text-gray-600">
            Fill in four short sections. We turn them into a clean, one-page resume you can download as a PDF and
            share with any employer.
          </p>

          <ul className="mt-6 space-y-3">
            {[
              "Step-by-step builder: education, experience, projects, skills",
              "Edit anything later and download again",
              "Always fits on one A4 page",
            ].map((point) => (
              <li key={point} className="flex items-start gap-3 text-gray-700">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-100 text-[10px] text-purple-700">
                  <FaCheck aria-hidden="true" />
                </span>
                {point}
              </li>
            ))}
          </ul>

          <a
            href="/resume-builder"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-purple-600 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-purple-700"
          >
            Build my resume <FaArrowRight aria-hidden="true" />
          </a>
        </div>

        {/* Mini resume preview */}
        <div className="mx-auto w-full max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow-xl" aria-hidden="true">
          <div className="border-b-4 border-blue-600 pb-3">
            <p className="text-xl font-extrabold text-gray-900">Your Name</p>
            <p className="text-sm font-semibold text-blue-600">Frontend Developer</p>
            <p className="mt-1 text-[10px] text-gray-500">you@email.com · +91 98765 43210 · Pune</p>
          </div>

          {[
            { heading: "Experience", lines: ["w-3/4", "w-full", "w-5/6"] },
            { heading: "Projects", lines: ["w-2/3", "w-full"] },
          ].map((section) => (
            <div key={section.heading} className="mt-4">
              <p className="mb-2 border-b border-gray-200 pb-1 text-xs font-bold text-gray-900">{section.heading}</p>
              <div className="space-y-1.5">
                {section.lines.map((width, i) => (
                  <div key={i} className={`h-2 rounded bg-gray-200 ${width}`} />
                ))}
              </div>
            </div>
          ))}

          <div className="mt-4">
            <p className="mb-2 border-b border-gray-200 pb-1 text-xs font-bold text-gray-900">Skills</p>
            <div className="flex flex-wrap gap-1.5">
              {["React", "Node.js", "MongoDB", "Tailwind"].map((skill) => (
                <span key={skill} className="rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-[10px] text-blue-700">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function ExploreBySkill() {
  return (
    <section className="bg-[#f8f7fc] py-16 sm:py-20">
      <Container>
        <SectionHeading title="Explore jobs by skill" text="Pick a skill to see matching openings right now." />
        <ul className="flex flex-wrap gap-3">
          {POPULAR_SKILLS.map((skill) => (
            <li key={skill}>
              <a
                href={`/jobs?keyword=${encodeURIComponent(skill)}`}
                className="inline-block rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:border-purple-500 hover:bg-purple-600 hover:text-white"
              >
                {skill}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function CareerGuides() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <SectionHeading title="Career guides" text="Short, practical reads to help you through the hiring process." />
        <div className="grid gap-5 md:grid-cols-3">
          {GUIDES.map(({ icon: Icon, title, text, href }) => (
            <a
              key={title}
              href={href}
              className="group flex flex-col rounded-xl border border-gray-200 bg-white p-6 transition hover:border-purple-300 hover:shadow-md"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-purple-100 text-lg text-purple-700">
                <Icon aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-semibold text-gray-900">{title}</h3>
              <p className="mt-1.5 flex-1 text-sm leading-6 text-gray-600">{text}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-purple-700">
                Read guide
                <FaArrowRight className="text-xs transition group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="bg-[#f8f7fc] py-16 sm:py-20">
      <Container>
        <SectionHeading center title="Questions candidates ask" />
        <Faq items={FAQ} />
      </Container>
    </section>
  );
}

/* ============================================================================
 * PAGE  (the Footer already ends with a "Get started" banner, so no extra CTA here)
 * ========================================================================== */

export default function ForCandidates() {
  return (
    <main>
      <Hero />
      <Benefits />
      <HowItWorks />
      <ResumeSpotlight />
      <ExploreBySkill />
      <CareerGuides />
      <FaqSection />
    </main>
  );
}