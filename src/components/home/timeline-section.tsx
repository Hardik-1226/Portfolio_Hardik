"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { timeline } from "@/lib/data";
import { ScrollAnimation } from "@/components/common/scroll-animation";
import { HoverableText } from "../common/hoverable-text";
import { MaskedHeading } from "@/components/common/MaskedHeading";
import { StrokeText } from "@/components/common/StrokeText";
import { GraduationCap, Briefcase, Award, Code, Sparkles, CheckCircle2 } from "lucide-react";

export function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  const getIconForIndex = (idx: number) => {
    switch (idx) {
      case 0:
      case 1:
      case 2:
        return <GraduationCap className="w-4 h-4 text-purple-300" />;
      case 3:
        return <Award className="w-4 h-4 text-amber-300" />;
      case 4:
        return <Code className="w-4 h-4 text-sky-300" />;
      case 5:
      default:
        return <Briefcase className="w-4 h-4 text-pink-300" />;
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate how far through the timeline container the user has scrolled
      const totalDist = rect.height - windowHeight * 0.4;
      const currentScroll = windowHeight * 0.75 - rect.top;
      const progress = Math.min(Math.max(currentScroll / totalDist, 0), 1);
      
      setScrollProgress(progress);

      // Determine the highest active step (0 to timeline.length - 1)
      // Milestone 0 (01.) triggers as soon as timeline enters view
      // Milestone 1 (02.) triggers at ~18% scroll
      // Milestone 2 (03.) triggers at ~36% scroll
      // Milestone 3 (04.) triggers at ~54% scroll
      // Milestone 4 (05.) triggers at ~72% scroll
      // Milestone 5 (06.) triggers at ~88% scroll
      const stepThresholds = [0.02, 0.18, 0.36, 0.54, 0.72, 0.88];
      let currentStep = -1;
      for (let i = 0; i < stepThresholds.length; i++) {
        if (progress >= stepThresholds[i]) {
          currentStep = i;
        }
      }
      setActiveStep(currentStep);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="timeline"
      ref={containerRef}
      className="py-32 sm:py-40 relative overflow-hidden bg-transparent text-white min-h-screen"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-24 relative space-y-3">
          {/* Background Ambient Text */}
          <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none -top-10">
            <span className="text-[13vw] font-headline font-black text-white/[0.08] tracking-widest select-none drop-shadow-[0_2px_15px_rgba(0,0,0,0.6)]">
              JOURNEY
            </span>
          </div>

          <ScrollAnimation className="relative z-10 space-y-3">

            <div className="flex justify-center my-2">
              <StrokeText
                text="MY JOURNEY"
                fontSize={52}
                strokeColor="#38bdf8"
                fillColor="#ffffff"
                strokeWidth={1.8}
                drawDuration={1.8}
                trigger="scroll"
                fillMode="wipe"
                letterSpacing={2}
              />
            </div>
            <div className="mt-4 text-xl sm:text-2xl text-slate-200 max-w-2xl mx-auto">
              A timeline of my key{" "}
              <HoverableText
                imageUrl="/images/achievement-academic.png"
                imageHint="milestones"
                className="font-headline font-bold text-3xl text-purple-300"
              >
                milestones
              </HoverableText>{" "}
              and{" "}
              <HoverableText
                imageUrl="/images/about-visual.png"
                imageHint="experiences"
                className="font-headline font-bold text-3xl text-sky-300"
              >
                experiences
              </HoverableText>{" "}
              in tech.
            </div>
          </ScrollAnimation>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Base vertical track line */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white/10 left-4 md:left-1/2 md:-translate-x-1/2"
            aria-hidden="true"
          />

          {/* Dynamic illuminated neon scroll progress beam */}
          <div
            className="absolute top-0 w-1 bg-gradient-to-b from-purple-500 via-pink-500 to-sky-400 left-4 md:left-1/2 md:-translate-x-1/2 rounded-full shadow-[0_0_16px_rgba(192,132,252,1)] transition-all duration-200 ease-out"
            style={{ height: `${Math.min(scrollProgress * 100, 100)}%` }}
            aria-hidden="true"
          />

          <ul className="space-y-24 sm:space-y-32">
            {timeline.map((item, index) => {
              const isUnlocked = activeStep >= index;
              const isCurrent = activeStep === index;
              const isEven = index % 2 === 0;

              return (
                <li key={index} className="relative">
                  {/* Glowing Node Dot in Center */}
                  <div
                    className={`absolute top-4 left-4 w-8 h-8 rounded-full -translate-x-1/2 border-2 transition-all duration-700 md:left-1/2 z-20 flex items-center justify-center ${
                      isUnlocked
                        ? "bg-[#180e29] border-purple-400 scale-125 shadow-[0_0_24px_rgba(192,132,252,1)]"
                        : "bg-[#0b0712] border-white/15 scale-75 opacity-40"
                    }`}
                  >
                    <div
                      className={`w-3 h-3 rounded-full transition-all duration-700 ${
                        isCurrent
                          ? "bg-gradient-to-r from-purple-400 via-pink-400 to-sky-400 animate-ping scale-110"
                          : isUnlocked
                          ? "bg-purple-400 scale-100 shadow-[0_0_10px_rgba(192,132,252,0.9)]"
                          : "bg-white/20 scale-50"
                      }`}
                    />
                  </div>

                  <div className="md:grid md:grid-cols-2 md:gap-x-16 items-center">
                    {/* Big Number Column */}
                    <div
                      className={`pl-12 md:pl-0 transition-all duration-700 ease-out ${
                        isEven ? "md:text-right" : "md:order-2 md:text-left"
                      } ${
                        isUnlocked
                          ? "opacity-100 translate-x-0 translate-y-0 scale-100 blur-0"
                          : isEven
                          ? "opacity-0 -translate-x-20 translate-y-16 scale-75 blur-md"
                          : "opacity-0 translate-x-20 translate-y-16 scale-75 blur-md"
                      }`}
                    >
                      <div
                        className={`flex items-center ${
                          isEven ? "md:justify-end" : "md:justify-start"
                        }`}
                      >
                        <motion.p
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={
                            isUnlocked
                              ? { scale: isCurrent ? 1.06 : 1, opacity: 1 }
                              : { scale: 0.8, opacity: 0 }
                          }
                          transition={{ type: "spring", stiffness: 260, damping: 20 }}
                          className={`font-headline font-black text-7xl sm:text-8xl md:text-9xl leading-none select-none transition-all duration-500 ${
                            isCurrent
                              ? "text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-300 to-pink-400 drop-shadow-[0_0_35px_rgba(192,132,252,0.9)]"
                              : isUnlocked
                              ? "text-transparent bg-clip-text bg-gradient-to-br from-white/90 via-purple-200/80 to-sky-300/80 drop-shadow-[0_0_20px_rgba(192,132,252,0.4)]"
                              : "text-white/10"
                          }`}
                        >
                          {(index + 1).toString().padStart(2, "0")}.
                        </motion.p>
                      </div>
                    </div>

                    {/* Milestone Card Column */}
                    <div
                      className={`pl-12 md:pl-0 mt-6 md:mt-0 transition-all duration-700 delay-150 ease-out ${
                        isEven ? "md:order-2" : "md:order-1 md:text-right"
                      } ${
                        isUnlocked
                          ? "opacity-100 translate-x-0 translate-y-0 scale-100 blur-0"
                          : isEven
                          ? "opacity-0 translate-x-20 translate-y-16 scale-80 blur-md"
                          : "opacity-0 -translate-x-20 translate-y-16 scale-80 blur-md"
                      }`}
                    >
                      <div
                        className={`p-6 sm:p-8 rounded-3xl transition-all duration-500 backdrop-blur-xl ${
                          isCurrent
                            ? "bg-white/[0.08] border-2 border-purple-400/80 shadow-[0_0_40px_rgba(192,132,252,0.35)] scale-[1.02]"
                            : isUnlocked
                            ? "bg-white/[0.04] border border-white/15 shadow-[0_12px_32px_rgba(0,0,0,0.5)]"
                            : "bg-white/[0.01] border border-white/5 opacity-20"
                        }`}
                      >
                        <div
                          className={`flex items-center gap-2 mb-3 ${
                            !isEven ? "md:justify-end" : ""
                          }`}
                        >
                          <span
                            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase transition-colors ${
                              isCurrent
                                ? "bg-purple-500/30 text-purple-200 border border-purple-400/60 shadow-[0_0_15px_rgba(192,132,252,0.5)]"
                                : "bg-white/5 text-slate-300 border border-white/10"
                            }`}
                          >
                            {getIconForIndex(index)}
                            {item.year}
                          </span>
                          {isCurrent && (
                            <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-pink-300 animate-pulse">
                              <Sparkles className="w-3.5 h-3.5" /> Present Focus
                            </span>
                          )}
                        </div>

                        <h4 className="font-headline text-2xl sm:text-3xl font-black text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                          {item.title}
                        </h4>
                        <p className="text-base sm:text-lg text-slate-200 mt-3 leading-relaxed font-normal">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default TimelineSection;
