import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProjectsMarquee from "@/components/ProjectsMarquee";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black relative selection:bg-cyan selection:text-black">
      <Navbar />
      <Hero />
      <ProjectsMarquee />
      <About />
      <Footer />
    </main>
  );
}
