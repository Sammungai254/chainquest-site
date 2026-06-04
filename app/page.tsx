import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Pricing from "@/components/sections/Pricing";
import Booking from "@/components/sections/Booking";
import Portfolio from "@/components/sections/Portfolio";
import Insights from "@/components/sections/Insights";
import Community from "@/components/sections/Community";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#080e1e]">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Pricing />
      <Portfolio />
      <Insights />
      <Community />
      <Testimonials />
      <Booking />
      <Contact />
      <Footer />
    </main>
  );
}
