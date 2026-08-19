"use client";

import { skills } from "@/lib/data";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ScrollAnimation } from "../common/scroll-animation";
import { HoverableText } from "../common/hoverable-text";
import { StrokeText } from "../common/StrokeText";
import { CurvedLoop } from "../common/CurvedLoop";
import { LogoLoop } from "../common/LogoLoop";
import { Code2, Server, Terminal, Wrench, Layers, CheckCircle2 } from "lucide-react";
import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiJavascript, 
  SiTailwindcss, 
  SiNodedotjs, 
  SiPython, 
  SiFastapi, 
  SiSupabase, 
  SiPostgresql, 
  SiGit, 
  SiDocker, 
  SiOpencv, 
  SiThreedotjs,
  SiSelenium,
  SiJenkins,
  SiPostman,
  SiJira,
  SiMongodb,
  SiMysql
} from "react-icons/si";

const techLogos = [
  { node: <SiReact className="text-[#61DAFB] text-2xl" />, title: "React", href: "https://react.dev" },
  { node: <SiFastapi className="text-[#009688] text-2xl" />, title: "FastAPI", href: "https://fastapi.tiangolo.com" },
  { node: <SiPython className="text-[#3776AB] text-2xl" />, title: "Python", href: "https://www.python.org" },
  { node: <SiMongodb className="text-[#47A248] text-2xl" />, title: "MongoDB Atlas", href: "https://mongodb.com" },
  { node: <SiSelenium className="text-[#43B02A] text-2xl" />, title: "Selenium", href: "https://selenium.dev" },
  { node: <SiJenkins className="text-[#D24939] text-2xl" />, title: "Jenkins", href: "https://jenkins.io" },
  { node: <SiPostman className="text-[#FF6C37] text-2xl" />, title: "Postman", href: "https://postman.com" },
  { node: <SiJira className="text-[#0052CC] text-2xl" />, title: "Jira", href: "https://jira.com" },
  { node: <SiNextdotjs className="text-white text-2xl" />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript className="text-[#3178C6] text-2xl" />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss className="text-[#06B6D4] text-2xl" />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiMysql className="text-[#4479A1] text-2xl" />, title: "MySQL", href: "https://mysql.com" },
  { node: <SiGit className="text-[#F05032] text-2xl" />, title: "Git", href: "https://git-scm.com" },
  { node: <SiOpencv className="text-[#5C3EE8] text-2xl" />, title: "OpenCV", href: "https://opencv.org" },
];

const categoryIcons: Record<string, React.ReactNode> = {
  "Languages": <Terminal className="h-4 w-4 text-white" />,
  "Frontend": <Code2 className="h-4 w-4 text-zinc-300" />,
  "Backend & Database": <Server className="h-4 w-4 text-zinc-300" />,
  "Testing & CI/CD": <CheckCircle2 className="h-4 w-4 text-white" />,
  "Data & ML": <Wrench className="h-4 w-4 text-zinc-300" />,
  "Infrastructure & Concepts": <Layers className="h-4 w-4 text-zinc-300" />,
};

export function AboutSection() {
  const aboutImage = PlaceHolderImages.find(img => img.id === 'about-visual');

  return (
    <section id="about" className="py-24 sm:py-32 bg-transparent text-white relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
            <span className="text-[14vw] font-headline font-bold text-white/[0.04] uppercase tracking-widest select-none">
              ABOUT
            </span>
          </div>
          <ScrollAnimation className="relative z-10 space-y-3">
            <div className="flex justify-center my-2">
              <StrokeText
                text="ABOUT ME"
                fontSize={56}
                strokeColor="#e2e8f0"
                fillColor="#ffffff"
                strokeWidth={2.0}
                drawDuration={1.8}
                trigger="scroll"
                fillMode="wipe"
                letterSpacing={3}
              />
            </div>
          </ScrollAnimation>
        </div>

        {/* Curved Loop Marquee */}
        <div className="my-10">
          <CurvedLoop
            marqueeText="✦ REACT.JS ✦ FASTAPI ✦ JAVA ✦ SELENIUM ✦ JMETER ✦ MONGODB ATLAS ✦ SOCKET.IO ✦ TAILWIND CSS ✦ NEXT.JS ✦ 300+ LEETCODE ✦"
            speed={2}
            curveAmount={80}
            className="fill-white tracking-widest text-2xl sm:text-3xl drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)]"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-start mt-12">
          {/* Bio Column */}
          <div className="space-y-6">
            <div className="font-body text-xl sm:text-2xl leading-relaxed space-y-4">
              <div className="text-white font-medium">
                I'm a Graduate Engineer Trainee at Coforge and full-stack developer dedicated to building impactful applications that create real-world value.
              </div>
              <div className="text-zinc-300 text-base sm:text-lg font-normal leading-relaxed">
                Specializing in React.js, FastAPI, Java, and Enterprise Test Automation (Selenium, JMeter, Jenkins). With experience building e-commerce platforms, AI legal agents, and automated test frameworks with 95%+ pass rates, I focus on performance, reliability, and clean engineering.
              </div>
            </div>

            {aboutImage && (
              <div className="pt-6 flex justify-center lg:justify-start">
                <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md aspect-square rounded-2xl overflow-hidden border border-white/15 shadow-2xl">
                  <Image 
                    src={aboutImage.imageUrl} 
                    alt={aboutImage.description} 
                    fill 
                    className="object-cover transition-all duration-500 hover:scale-105" 
                    data-ai-hint={aboutImage.imageHint}
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Sleek Skillset Presentation */}
          <div className="space-y-6">
            <div className="flex justify-center lg:justify-start my-2">
              <StrokeText
                text="TECHNICAL SKILLSET"
                fontSize={36}
                strokeColor="#a1a1aa"
                fillColor="#ffffff"
                strokeWidth={1.5}
                drawDuration={1.6}
                trigger="scroll"
                fillMode="wipe"
                letterSpacing={3}
              />
            </div>
            
            <ScrollAnimation delay={100} className="space-y-4">
              {Object.entries(skills).map(([category, items]) => (
                <div
                  key={category}
                  className="group rounded-2xl p-4 sm:p-5 bg-zinc-900/60 hover:bg-zinc-900/90 border border-white/10 hover:border-white/30 transition-all duration-300 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="p-1.5 rounded-lg bg-white/5 border border-white/10">
                      {categoryIcons[category] || <Code2 className="h-4 w-4 text-white" />}
                    </div>
                    <h3 className="font-headline font-bold text-lg uppercase tracking-wider text-white">
                      {category}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 text-xs sm:text-sm rounded-lg bg-white/5 group-hover:bg-white/10 text-zinc-300 group-hover:text-white border border-white/5 group-hover:border-white/20 transition-colors font-mono font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </ScrollAnimation>
          </div>
        </div>

        {/* Interactive Infinite Tech Logo Loop at the End of About Section */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="text-center text-xs uppercase tracking-widest text-slate-400 mb-6 font-semibold">
            Tech Stack & Core Technologies
          </div>
          <LogoLoop
            logos={techLogos}
            speed={35}
            direction="left"
            logoHeight={34}
            gap={48}
            hoverSpeed={10}
            scaleOnHover
            className="py-2"
          />
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
