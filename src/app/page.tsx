import Navbar from "@/components/Navbar";
import Preloader from "@/components/Preloader";
import Hero from "@/components/Hero";
import ProjectsMarquee from "@/components/ProjectsMarquee";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black relative selection:bg-cyan selection:text-black">
      <Preloader />
      <Navbar />
      <Hero />
      <ProjectsMarquee />
      <About />
      <Footer />
    </main>
  );
}
