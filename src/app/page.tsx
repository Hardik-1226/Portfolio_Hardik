import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/home/hero-section";
import { ProjectsSection } from "@/components/home/projects-section";
import { AboutSection } from "@/components/home/about-section";
import { ContactSection } from "@/components/home/contact-section";
import { TimelineSection } from "@/components/home/timeline-section";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <ProjectsSection />
        <TimelineSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}