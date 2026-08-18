"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { timeline } from "@/lib/data";
import { ScrollAnimation } from "@/components/common/scroll-animation";
import { HoverableText } from "../common/hoverable-text";
import { StrokeText } from "@/components/common/StrokeText";
import { GraduationCap, Briefcase, Award, Code, Sparkles } from "lucide-react";

export function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  const getIconForIndex = (idx: number) => {
    switch (idx) {
      case 0:
        return <GraduationCap className="w-4 h-4 text-white" />;
      case 1:
        return <Award className="w-4 h-4 text-zinc-300" />;
      case 2:
        return <Code className="w-4 h-4 text-zinc-200" />;
      case 3:
      default:
        return <Briefcase className="w-4 h-4 text-white" />;
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
      const stepThresholds = [0.05, 0.32, 0.60, 0.85];
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
      className="py-28 sm:py-36 relative overflow-hidden bg-transparent text-white min-h-screen"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-24 relative space-y-3">
          {/* Background Ambient Watermark Text */}
          <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none -top-10">
            <span className="text-[14vw] font-headline font-black text-white/[0.04] uppercase tracking-widest select-none">
              JOURNEY
            </span>
          </div>

          <ScrollAnimation className="relative z-10 space-y-3">
            <div className="flex justify-center my-2">
              <StrokeText
                text="MY JOURNEY"
                fontSize={56}
                strokeColor="#a1a1aa"
                fillColor="#ffffff"
                strokeWidth={1.8}
                drawDuration={1.8}
                trigger="scroll"
                fillMode="wipe"
                letterSpacing={3}
              />
            </div>
            <div className="mt-4 text-lg sm:text-xl text-zinc-300 font-normal max-w-2xl mx-auto">
              A chronology of academic rigor, technical leadership, and industry engineering.
            </div>
          </ScrollAnimation>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Base vertical track line */}
          <div
            className="absolute top-0 bottom-0 w-[1px] bg-white/10 left-4 md:left-1/2 md:-translate-x-1/2"
            aria-hidden="true"
          />

          {/* Dynamic illuminated monochrome scroll progress beam */}
          <div
            className="absolute top-0 w-[2px] bg-gradient-to-b from-white via-zinc-200 to-zinc-400 left-4 md:left-1/2 md:-translate-x-1/2 rounded-full shadow-[0_0_16px_rgba(255,255,255,0.9)] transition-all duration-200 ease-out"
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
                    className={`absolute top-4 left-4 w-7 h-7 rounded-full -translate-x-1/2 border transition-all duration-700 md:left-1/2 z-20 flex items-center justify-center ${
                      isUnlocked
                        ? "bg-black border-white scale-125 shadow-[0_0_20px_rgba(255,255,255,0.8)]"
                        : "bg-zinc-950 border-white/20 scale-75 opacity-40"
                    }`}
                  >
                    <div
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-700 ${
                        isCurrent
                          ? "bg-white animate-ping scale-110"
                          : isUnlocked
                          ? "bg-white scale-100 shadow-[0_0_8px_rgba(255,255,255,0.9)]"
                          : "bg-white/30 scale-50"
                      }`}
                    />
                  </div>

                  <div className="md:grid md:grid-cols-2 md:gap-x-16 items-center">
                    {/* Big Galgo-Condensed Number Column */}
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
                              ? { scale: isCurrent ? 1.05 : 1, opacity: 1 }
                              : { scale: 0.8, opacity: 0 }
                          }
                          transition={{ type: "spring", stiffness: 260, damping: 20 }}
                          className={`font-headline font-bold text-7xl sm:text-8xl md:text-9xl leading-none uppercase tracking-tight select-none transition-all duration-500 ${
                            isCurrent
                              ? "text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.6)]"
                              : isUnlocked
                              ? "text-zinc-400 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
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
                        className={`p-6 sm:p-8 rounded-2xl transition-all duration-500 backdrop-blur-xl ${
                          isCurrent
                            ? "bg-zinc-900/80 border border-white/40 shadow-[0_0_35px_rgba(255,255,255,0.12)] scale-[1.02]"
                            : isUnlocked
                            ? "bg-zinc-900/50 border border-white/15 shadow-[0_12px_32px_rgba(0,0,0,0.5)]"
                            : "bg-zinc-900/20 border border-white/5 opacity-20"
                        }`}
                      >
                        <div
                          className={`flex items-center gap-2 mb-3 ${
                            !isEven ? "md:justify-end" : ""
                          }`}
                        >
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wider uppercase transition-colors ${
                              isCurrent
                                ? "bg-white text-black border border-white shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                                : "bg-white/5 text-zinc-300 border border-white/10"
                            }`}
                          >
                            {getIconForIndex(index)}
                            {item.year}
                          </span>
                          {isCurrent && (
                            <span className="hidden sm:inline-flex items-center gap-1 text-xs font-mono font-medium text-zinc-300">
                              <Sparkles className="w-3.5 h-3.5 text-white" /> Present Focus
                            </span>
                          )}
                        </div>

                        <h4 className="font-headline text-2xl sm:text-3xl font-bold uppercase tracking-wide text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                          {item.title}
                        </h4>
                        <p className="text-sm sm:text-base text-zinc-300 mt-3 leading-relaxed font-normal">
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
