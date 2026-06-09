import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BentoGrid from "@/components/BentoGrid";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Hero />
        <BentoGrid />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
