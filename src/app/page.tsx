import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/home/hero-section";
import { ProjectsSection } from "@/components/home/projects-section";
import { AboutSection } from "@/components/home/about-section";
import { ContactSection } from "@/components/home/contact-section";
import { TimelineSection } from "@/components/home/timeline-section";
import { CertificationsSection } from "@/components/home/certifications-section";
import { AchievementSection } from "@/components/home/achievement-section";
import ScrollExpand from "@/components/common/ScrollExpand";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-transparent relative z-10">
      <Header />
      <main className="flex-grow bg-transparent">
        <HeroSection />
        <ProjectsSection />
        <TimelineSection />

        {/* 1. ScrollExpand Transition: My Journey -> About Me */}
        <div className="relative z-20 my-6">
          <ScrollExpand
            src="/images/about-visual.png"
            alt="About Hardik"
            title="GET TO KNOW ME"
            scrollHint="Scroll to expand"
            useWindowScroll
            startWidth={48}
            startHeight={60}
            startRadius={28}
            endRadius={0}
            mediaZoom={1.25}
            scrollDistance={0.8}
            holdDistance={0.2}
            smoothing={0.06}
            overlayScrim={0.6}
          >
            <div className="max-w-3xl mx-auto space-y-3">
              <h2 className="font-headline font-bold text-5xl sm:text-7xl text-slate-100 uppercase tracking-wide drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
                Behind the Code
              </h2>
              <p className="text-base sm:text-xl text-slate-200 font-normal max-w-2xl mx-auto">
                Blending thoughtful engineering, creative problem solving, and modern web architectures.
              </p>
            </div>
          </ScrollExpand>
        </div>

        <AboutSection />

        {/* 2. ScrollExpand Transition: About Me -> Achievements */}
        <div className="relative z-20 my-6">
          <ScrollExpand
            src="/images/achievement-hackathon.png"
            alt="Hardik Achievements"
            title="WINS & RECOGNITION"
            scrollHint="Scroll to expand"
            useWindowScroll
            startWidth={48}
            startHeight={60}
            startRadius={28}
            endRadius={0}
            mediaZoom={1.25}
            scrollDistance={0.8}
            holdDistance={0.2}
            smoothing={0.06}
            overlayScrim={0.65}
          >
            <div className="max-w-3xl mx-auto space-y-3">
              <h2 className="font-headline font-bold text-5xl sm:text-7xl text-slate-100 uppercase tracking-wide drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
                Milestones of Excellence
              </h2>
              <p className="text-base sm:text-xl text-slate-200 font-normal max-w-2xl mx-auto">
                National hackathon victories, algorithmic mastery, and leadership in tech communities.
              </p>
            </div>
          </ScrollExpand>
        </div>

        <AchievementSection />

        {/* 3. ScrollExpand Transition: Achievements -> Certifications */}
        <div className="relative z-20 my-6">
          <ScrollExpand
            src="/images/cert-achievement-hardik.jpg"
            alt="Certificate of Achievement - Hardik Varshney"
            title="CERTIFIED EXPERTISE"
            scrollHint="Scroll to expand"
            useWindowScroll
            mediaOpacity={0.40}
            startWidth={48}
            startHeight={60}
            startRadius={28}
            endRadius={0}
            mediaZoom={1.25}
            scrollDistance={0.8}
            holdDistance={0.2}
            smoothing={0.06}
            overlayScrim={0.55}
          >
            <div className="max-w-3xl mx-auto space-y-3">
              <h2 className="font-headline font-bold text-5xl sm:text-7xl text-slate-100 uppercase tracking-wide drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
                Knowledge & Credentials
              </h2>
              <p className="text-base sm:text-xl text-slate-200 font-normal max-w-2xl mx-auto">
                Validated proficiency in Oracle Generative AI, test automation suites, and modern full-stack development.
              </p>
            </div>
          </ScrollExpand>
        </div>

        <CertificationsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
