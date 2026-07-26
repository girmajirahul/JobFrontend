import AIAssistant from "../../components/AIAssistant";
import Footer from "../../components/Footer";
import Hero from "../../components/HeroSection/Herosection";
import HowItWorks from "../../components/HeroSection/HowItWorks";
import JobCategories from "../../components/HeroSection/Jobcategories";
import LatestJobs from "../../components/HeroSection/LatestJobs";
import TalentSection from "../../components/HeroSection/TalentSection";
import Testimonials from "../../components/HeroSection/Testimonials";
import Navbar from "../../components/Navbar";



const HomePage = () => {
  return (
    <>
      <Navbar />

      <main className="pt-16">
        <Hero />
        <HowItWorks />
        <TalentSection />
        <JobCategories />
        <LatestJobs />
        <Testimonials />
        <AIAssistant />
      </main>

      <Footer />
    </>
  );
};

export default HomePage;