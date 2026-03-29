import React, { useState } from "react";
import Hero from "./HeroSection/Herosection";
import HowItWorks from "./HeroSection/HowItWorks";
import TalentSection from "./HeroSection/TalentSection";
import JobCategories from "./HeroSection/Jobcategories";
import LatestJobs from "./HeroSection/LatestJobs";
import Testimonials from "./HeroSection/Testimonials";
import Footer from "./Footer";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import AIAssistant from "./AIAssistant";

// Navbar Component with Mobile Sidebar
const Navbar = () => {
    const { user, logout } = useAuth()
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };
    return (
        <>
            <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                    {/* Logo */}
                    <div className="text-2xl font-bold text-purple-600">JobBoard</div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
                        <a href="#" className="hover:text-purple-600">Home</a>
                        <a href="#" className="hover:text-purple-600">For Candidates</a>
                        <a href="#" className="hover:text-purple-600">For Employers</a>
                        {/* <a href="#" className="hover:text-purple-600">Pages</a>
                        <a href="#" className="hover:text-purple-600">Blog</a> */}
                    </div>

                    {/* Desktop Buttons */}
                    <div className="hidden md:flex space-x-3">
                        {!user ? (
                            <>
                                <button
                                    className="px-4 py-2 border border-purple-500 text-purple-600 rounded-lg cursor-pointer"
                                    onClick={() => navigate("/signup")}
                                >
                                    Sign Up
                                </button>

                                <button
                                    className="px-4 py-2 bg-purple-600 text-white rounded-lg cursor-pointer"
                                    onClick={() => navigate("/login")}
                                >
                                    Login
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    className="px-4 py-2 border border-purple-500 text-purple-600 rounded-lg cursor-pointer"
                                    onClick={() => {
                                        if (user.role === "jobseeker") navigate("/dashboard/student");
                                        else if (user.role === "employer") navigate("/dashboard/employer");
                                        else if (user.role === "admin") navigate("/dashboard/admin");
                                    }}
                                >
                                    Dashboard
                                </button>

                                <button
                                    className="px-4 py-2 bg-purple-600 text-white rounded-lg cursor-pointer"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>

                    {/* Mobile Hamburger */}
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(true)} className="text-2xl">☰</button>
                    </div>
                </div>
            </nav>

            {/* Sidebar Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 z-40"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="p-4 flex justify-between items-center border-b">
                    <h2 className="text-xl font-bold text-purple-600">Menu</h2>
                    <button onClick={() => setIsOpen(false)} className="text-xl">✕</button>
                </div>

                <div className="flex flex-col p-4 space-y-4 text-gray-700 font-medium">
                    <a href="#" onClick={() => setIsOpen(false)}>Home</a>
                    <a href="#" onClick={() => setIsOpen(false)}>For Candidates</a>
                    <a href="#" onClick={() => setIsOpen(false)}>For Employers</a>
                    {/* <a href="#" onClick={() => setIsOpen(false)}>Pages</a>
                    <a href="#" onClick={() => setIsOpen(false)}>Blog</a> */}
                </div>

                <div className="p-4 border-t space-y-3">
                    {!user ? (
                        <>
                            <button
                                className="w-full px-4 py-2 border border-purple-500 text-purple-600 rounded-lg cursor-pointer"
                                onClick={() => {
                                    navigate("/signup");
                                    setIsOpen(false);
                                }}
                            >
                                Sign Up
                            </button>

                            <button
                                className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg cursor-pointer"
                                onClick={() => {
                                    navigate("/login");
                                    setIsOpen(false);
                                }}
                            >
                                Login
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                className="w-full px-4 py-2 border border-purple-500 text-purple-600 rounded-lg cursor-pointer"
                                onClick={() => {
                                    if (user.role === "jobseeker") navigate("/dashboard/student");
                                    else if (user.role === "employer") navigate("/dashboard/employer");
                                    else if (user.role === "admin") navigate("/dashboard/admin");
                                    setIsOpen(false);
                                }}
                            >
                                Dashboard
                            </button>

                            <button
                                className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg cursor-pointer"
                                onClick={() => {
                                    handleLogout();
                                    setIsOpen(false);
                                }}
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};


// Main Page
const JobBoard = () => {
    return (
        <div>
            <Navbar />
            <Hero />
            <HowItWorks />
            <TalentSection />
            <JobCategories />
            <LatestJobs />
            <Testimonials />
            <AIAssistant />
            <Footer />
        </div>
    );
};

export default JobBoard;
