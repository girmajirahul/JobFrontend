const Hero = () => {
    return (
        <section
            className="pt-10 bg-gray-50 bg-cover bg-center bg-no-repeat relative"
            style={{ backgroundImage: "url('/images/black-lines.png')" }}
        >
            {/* Optional Overlay */}
            {/* <div className="absolute inset-0 bg-white/80"></div> */}

            <div className="relative max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-10 items-center">

                {/* Left Content */}
                <div className="p-2">
                    <p className="text-purple-600 text-lg font-medium mb-2">
                        We Have 208,000+ Live Jobs
                    </p>

                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                        Your <span className="text-purple-600">Dream</span> Job Is Waiting For You
                    </h1>

                    <p className="mt-4 text-gray-600">
                        Type your keyword, then click search to find your perfect job.
                    </p>

                    {/* Search Box */}
                    <div className="mt-6 bg-white shadow-lg rounded-xl p-4 flex flex-col md:flex-row gap-4">
                        <input
                            type="text"
                            placeholder="Job Title, Keywords"
                            className="flex-1 border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <input
                            type="text"
                            placeholder="City or Postcode"
                            className="flex-1 border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition">
                            Find Job
                        </button>
                    </div>

                    <p className="mt-4 text-sm md:text-base text-gray-500">
                        <span className="text-black font-medium">Popular Searches</span>: Designer, Senior, Architecture, iOS, etc.
                    </p>
                </div>

                {/* Right Image */}
                <div className="relative flex justify-center items-center">

                    {/* Background Circles */}
                    <div className="absolute w-[400px] h-[400px] bg-purple-100 rounded-full blur-2xl"></div>
                    <div className="absolute w-[300px] h-[300px] border-2 border-purple-200 rounded-full"></div>

                    {/* Main Image */}
                    <div className="relative z-10">
                        <img
                            src="/images/man.png"
                            alt="banner"
                            className="w-[250px] md:w-[320px]"
                        />
                    </div>

                    {/* Floating Icons Circle 1 */}
                    <div className="absolute top-10 right-10 w-20 h-20 bg-white shadow-md rounded-full flex items-center justify-center animate-bounce">
                        <img src="/images/microsoft.svg" alt="" className="w-8" />
                    </div>

                    {/* Floating Icons Circle 2 */}
                    <div className="absolute bottom-10 left-5 w-28 h-28 bg-white shadow-lg rounded-full flex items-center justify-center">
                        <img src="/images/google.svg" className="w-50 absolute top-2 left-2" alt="" />
                        {/* <img src="/images/.svg" className="w-6 absolute bottom-2 left-1/2 -translate-x-1/2" alt="" /> */}
                    </div>

                    {/* Decorative Circle */}
                    <div className="absolute -bottom-10 right-20 w-16 h-16 border-2 border-purple-300 rounded-full">
                         <img src="/images/amazon.svg" className="w-40 absolute bottom-2 left-1/2 -translate-x-1/2" alt="" /> 

                    </div>

                </div>
            </div>
        </section>
    );
};

export default Hero;