import { useEffect, useState } from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaFacebook, FaArrowUp, FaWhatsapp } from "react-icons/fa";
export default function Footer() {

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 200) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div className="bg-gray-100 pt-30">
            {/* CTA Banner */}
            <div className="max-w-6xl mx-auto -mt-50 px-4 relative z-10">
                <div className=" bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
                    <h2 className="text-2xl md:text-4xl font-semibold text-center md:text-left leading-snug">
                        Let’s Get Connected And Start <br />
                        Finding Your Dream Job
                    </h2>
                    <button className="bg-purple-400 hover:bg-purple-500 text-white px-6 py-3 rounded-lg font-medium  transition cursor-pointer">
                        Click Here
                    </button>
                </div>
            </div>

            {/* Footer */}
            <div className="max-w-6xl mx-auto px-4 mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">

                {/* Brand */}
                <div>
                    <h3 className="text-2xl font-bold flex items-center gap-2">
                        Job<span className="text-gray-800">Board</span>
                    </h3>
                    <p className="text-gray-500 mt-4 text-sm leading-relaxed">
                        The standard chunk of Lorem Ipsum used since the 1500s is reproduced
                        below for those interested.
                    </p>

                    <div className="flex items-center gap-2 mt-6 text-purple-600">
                        <div className="flex gap-3 mt-6">
                            <div className="p-2 bg-white shadow-sm rounded-full hover:bg-purple-600 hover:text-white transition cursor-pointer">
                                <FaFacebookF />
                            </div>
                            <div className="p-2 bg-white shadow-sm rounded-full hover:bg-purple-600 hover:text-white transition cursor-pointer">
                                <FaTwitter />
                            </div>
                            <div className="p-2 bg-white shadow-sm rounded-full hover:bg-purple-600 hover:text-white transition cursor-pointer">
                                <FaLinkedinIn />
                            </div>
                            <div className="p-2 bg-white shadow-sm rounded-full hover:bg-purple-600 hover:text-white transition cursor-pointer">
                                <FaInstagram />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Useful Links */}
                <div>
                    <h4 className="font-semibold text-lg mb-4">Useful Links</h4>
                    <ul className="space-y-2 text-gray-600">
                        <li>Find a Job</li>
                        <li>Compaies</li>
                        <li>About Us</li>
                        <li>Post a Job</li>
                        <li>Testimonial</li>
                    </ul>
                </div>

                {/* Category */}
                <div>
                    <h4 className="font-semibold text-lg mb-4">Category</h4>
                    <ul className="space-y-2 text-gray-600">
                        <li>UI Designer</li>
                        <li>UX Designer</li>
                        <li>Grapic Designer</li>
                        <li>Web Developers</li>
                        <li>More</li>
                    </ul>
                </div>

                {/* Follow */}
                <div>
                    <h4 className="font-semibold text-lg mb-4">Follow Us</h4>
                    <ul className="space-y-2 text-gray-600">
                        <li>Linked In</li>
                        <li>facebook</li>
                        <li>Instagram</li>
                        <li>Dribbble</li>
                        <li>Behance</li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h4 className="font-semibold text-lg mb-4">Newsletter</h4>

                    <p className="text-gray-500 text-sm mb-5 leading-relaxed">
                        Sign up to our archi. point to recent updates & office
                    </p>

                    <div className="flex items-center border-2 border-purple-500 rounded-xl overflow-hidden">
                        <input
                            type="email"
                            placeholder="Enter a Email"
                            className="flex-1 min-w-0 px-4 py-3 text-sm outline-none"
                        />

                        <button className="shrink-0 bg-purple-600 text-white px-5 py-3 font-medium  cursor-pointer">
                            Send
                        </button>
                    </div>
                </div>
            </div>

            {/* Floating Icons */}
            <div className="fixed bottom-25 right-6 flex flex-col gap-3">
                <a
                    href="https://wa.me/9021710342"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <button className="bg-green-400 text-white p-3 rounded-full shadow cursor-pointer hover:bg-green-500 transition">
                        <FaWhatsapp size={20} />
                    </button>
                </a>
            </div>
            {/* Scroll Top */}
            <button
                onClick={scrollToTop}
                className={`fixed bottom-6 right-6 p-3 rounded-full shadow transition-all duration-300 cursor-pointer
                    ${visible ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"}
                    bg-gray-200 hover:bg-gray-300`}
            >
                <FaArrowUp size={20} />
            </button>

            {/* Bottom */}
            <div className="text-center text-gray-500 text-sm py-6 mt-10 border-t">
                Privacy and Terms & Conditions
            </div>
        </div>
    );
}