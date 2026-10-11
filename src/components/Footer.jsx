import { useEffect, useState } from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaArrowUp, FaWhatsapp } from "react-icons/fa";

/* ---------- Data (edit links here) ---------- */

// wa.me needs the country code first (91 for India), digits only
const WHATSAPP_NUMBER = "919021710342";

const SOCIALS = [
    { label: "Facebook", href: "#", icon: FaFacebookF },
    { label: "Twitter", href: "#", icon: FaTwitter },
    { label: "LinkedIn", href: "#", icon: FaLinkedinIn },
    { label: "Instagram", href: "#", icon: FaInstagram },
];

const LINK_COLUMNS = [
    {
        title: "Useful links",
        links: [
            { label: "Find a job", href: "/jobs" },
            { label: "Companies", href: "/companies" },
            { label: "About us", href: "/about" },
            { label: "Post a job", href: "/employers/post-job" },
            { label: "Testimonials", href: "/#testimonials" },
        ],
    },
    {
        title: "Categories",
        links: [
            { label: "UI Designer", href: "/jobs?category=ui-designer" },
            { label: "UX Designer", href: "/jobs?category=ux-designer" },
            { label: "Graphic Designer", href: "/jobs?category=graphic-designer" },
            { label: "Web Developer", href: "/jobs?category=web-developer" },
            { label: "More", href: "/jobs" },
        ],
    },
    {
        title: "Follow us",
        links: [
            { label: "LinkedIn", href: "#" },
            { label: "Facebook", href: "#" },
            { label: "Instagram", href: "#" },
            { label: "Dribbble", href: "#" },
            { label: "Behance", href: "#" },
        ],
    },
];

/* ---------- Footer ---------- */

export default function Footer() {
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    useEffect(() => {
        const onScroll = () => setShowScrollTop(window.scrollY > 200);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (!email.trim()) return;
        // TODO: send `email` to your newsletter API
        setSubscribed(true);
        setEmail("");
    };

    return (
        <footer>
            {/* ---------- CTA banner (straddles the white / grey boundary) ---------- */}
            <div className="relative bg-white">
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[#f6f3f4]" aria-hidden="true" />

                <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
                    <div className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-700 p-8 text-white shadow-xl shadow-purple-700/20 md:flex-row md:p-12">
                        <h2 className="text-center text-2xl font-semibold leading-snug md:text-left md:text-4xl">
                            Let's get connected and start finding your dream job
                        </h2>
                        <a
                            href="/signup"
                            className="shrink-0 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-purple-700 transition hover:bg-purple-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        >
                            Get started
                        </a>
                    </div>
                </div>
            </div>

            {/* ---------- Main footer ---------- */}
            <div className="bg-[#f6f3f4]">
                <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-10 pt-14 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.4fr]">
                    {/* Brand */}
                    <div className="md:col-span-2 lg:col-span-1">
                        <a href="/" aria-label="JobBoard home">
                            <img src="/images/footer_logo.png" alt="JobBoard" className="h-10 w-auto" />
                        </a>
                        <p className="mt-4 max-w-xs text-sm leading-6 text-gray-500">
                            A simple place to find work you want, and the people who are hiring for it.
                        </p>

                        <ul className="mt-6 flex gap-3">
                            {SOCIALS.map(({ label, href, icon: Icon }) => (
                                <li key={label}>
                                    <a
                                        href={href}
                                        aria-label={label}
                                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-purple-600 shadow-sm ring-1 ring-gray-200 transition hover:bg-purple-600 hover:text-white hover:ring-purple-600"
                                    >
                                        <Icon aria-hidden="true" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Link columns */}
                    {LINK_COLUMNS.map((column) => (
                        <nav key={column.title} aria-label={column.title}>
                            <h3 className="mb-4 font-semibold text-gray-900">{column.title}</h3>
                            <ul className="space-y-2.5 text-sm text-gray-600">
                                {column.links.map((link) => (
                                    <li key={link.label}>
                                        <a href={link.href} className="transition hover:text-purple-700">
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    ))}

                    {/* Newsletter */}
                    <div className="md:col-span-2 lg:col-span-1">
                        <h3 className="mb-4 font-semibold text-gray-900">Newsletter</h3>
                        <p className="mb-4 text-sm leading-6 text-gray-500">
                            Get new job alerts and career tips in your inbox.
                        </p>

                        {subscribed ? (
                            <p className="rounded-xl bg-white px-4 py-3 text-sm font-medium text-emerald-700 ring-1 ring-emerald-200" role="status">
                                Thanks, you're subscribed.
                            </p>
                        ) : (
                            <form
                                onSubmit={handleSubscribe}
                                className="flex overflow-hidden rounded-xl border border-purple-300 bg-white focus-within:border-purple-600 focus-within:ring-4 focus-within:ring-purple-600/10"
                            >
                                <label className="min-w-0 flex-1">
                                    <span className="sr-only">Email address</span>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        className="w-full px-4 py-3 text-sm outline-none placeholder:text-gray-400"
                                    />
                                </label>
                                <button
                                    type="submit"
                                    className="shrink-0 bg-purple-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-700"
                                >
                                    Subscribe
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                {/* ---------- Bottom bar ---------- */}
                <div className="border-t border-gray-200">
                    <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-gray-500 sm:flex-row sm:px-6">
                        <p>© {new Date().getFullYear()} JobBoard. All rights reserved.</p>
                        <p className="flex gap-5">
                            <a href="/privacy" className="transition hover:text-purple-700">
                                Privacy policy
                            </a>
                            <a href="/terms" className="transition hover:text-purple-700">
                                Terms &amp; conditions
                            </a>
                        </p>
                    </div>
                </div>
            </div>

            {/* ---------- Floating buttons ---------- */}
            <div className="fixed bottom-6 right-4 z-40 flex flex-col gap-3 sm:right-6">
                <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Chat on WhatsApp"
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition hover:bg-green-600"
                >
                    <FaWhatsapp size={22} aria-hidden="true" />
                </a>

                <button
                    type="button"
                    onClick={scrollToTop}
                    aria-label="Scroll to top"
                    tabIndex={showScrollTop ? 0 : -1}
                    className={`flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 text-white shadow-lg transition-all duration-300 hover:bg-purple-700 ${
                        showScrollTop ? "scale-100 opacity-100" : "pointer-events-none scale-75 opacity-0"
                    }`}
                >
                    <FaArrowUp size={18} aria-hidden="true" />
                </button>
            </div>
        </footer>
    );
}