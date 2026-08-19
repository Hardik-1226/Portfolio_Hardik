"use client";

import Link from "next/link";
import { projects } from "@/lib/data";
import { slugify } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, ExternalLink } from "lucide-react";
import { ScrollAnimation } from "@/components/common/scroll-animation";
import { HoverableText } from "../common/hoverable-text";
import { StrokeText } from "@/components/common/StrokeText";
import RotatingText from "@/components/common/RotatingText";
import ScrollStack, { ScrollStackItem } from "@/components/common/ScrollStack";

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24 sm:py-32 bg-transparent text-white relative overflow-visible">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 relative space-y-3">
          <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none -top-12">
            <span className="text-[14vw] font-headline font-bold text-white/[0.04] uppercase tracking-widest select-none">
              PROJECTS
            </span>
          </div>
          <ScrollAnimation className="relative z-10 space-y-3">
            <div className="flex justify-center my-2">
              <StrokeText
                text="FEATURED PROJECTS"
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
            <div className="mt-4 text-2xl text-slate-200">
              <RotatingText 
                texts={['INNOVATIVE SOLUTIONS', 'SCALABLE SYSTEMS', 'TECHNICAL EXCELLENCE', 'REAL-WORLD IMPACT']}
                rotationInterval={3000}
                staggerDuration={0.05}
                className="font-headline font-black text-2xl sm:text-3xl text-white uppercase tracking-wider"
              />
            </div>
            <div className="mt-4 text-lg sm:text-xl text-slate-300 font-medium max-w-2xl mx-auto">
              A curated selection of software systems engineered for high performance, reliability, and business impact.
            </div>
          </ScrollAnimation>
        </div>

        {/* Desktop View: Interactive ScrollStack (md: and above) */}
        <div className="hidden md:block">
          <ScrollStack
            className="w-full"
            useWindowScroll
            itemDistance={120}
            itemStackDistance={35}
            stackPosition="22%"
            scaleEndPosition="18%"
            baseScale={0.9}
            blurAmount={3}
          >
            {projects.map((project) => {
              const slug = slugify(project.title);

              return (
                <ScrollStackItem
                  key={project.title}
                  itemClassName="bg-zinc-900/80 border border-white/15 overflow-hidden text-white rounded-3xl backdrop-blur-xl shadow-[0_16px_48px_rgba(0,0,0,0.7)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] via-transparent to-black/60 pointer-events-none" />
                  
                  {/* Clean, perfectly centered project card layout */}
                  <div className="relative z-10 p-6 sm:p-10 md:p-12 max-w-4xl mx-auto flex flex-col items-center text-center space-y-4">
                    
                    {/* Top Center Logo Badge */}
                    <div className="w-14 h-14 bg-white/10 border border-white/20 text-white flex items-center justify-center rounded-2xl font-headline font-bold text-2xl shadow-[0_0_20px_rgba(255,255,255,0.15)] uppercase">
                      {project.logo}
                    </div>

                    {/* Project Title & Subtitle */}
                    <div className="space-y-1">
                      <h3 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold text-white uppercase tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                        {project.title}
                      </h3>
                      <h4 className="font-headline text-lg sm:text-xl md:text-2xl text-zinc-300 font-medium uppercase tracking-wider">
                        {project.subtitle}
                      </h4>
                    </div>

                    {/* Tags Pill Badges */}
                    <div className="flex flex-wrap justify-center gap-2 pt-1">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/[0.06] border border-white/10 text-zinc-300 text-xs sm:text-sm font-mono font-medium backdrop-blur-md"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-white" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Project Description */}
                    <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-2xl mx-auto pt-2 font-normal">
                      {project.description}
                    </p>

                    {/* Centered Action Buttons Bar */}
                    <div className="flex flex-wrap justify-center items-center gap-3.5 pt-4">
                      <Button asChild className="rounded-full px-6 py-2.5 bg-white hover:bg-zinc-200 text-black font-semibold shadow-lg transition-all">
                        <Link href={`/projects/${slug}`}>
                          View Case Study <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                      {project.github && (
                        <Button asChild variant="outline" className="rounded-full px-5 py-2.5 border-white/20 bg-white/5 hover:bg-white/10 text-white transition-colors">
                          <Link href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2 h-4 w-4" /> GitHub
                          </Link>
                        </Button>
                      )}
                      {project.demo && (
                        <Button asChild variant="outline" className="rounded-full px-5 py-2.5 border-white/20 bg-white/5 hover:bg-white/10 text-white transition-colors">
                          <Link href={project.demo} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </ScrollStackItem>
              );
            })}
          </ScrollStack>
        </div>

        {/* Mobile View: Natural, Smooth Vertical Flow (< md screens) */}
        <div className="block md:hidden space-y-6">
          {projects.map((project) => {
            const slug = slugify(project.title);

            return (
              <div
                key={`mobile-${project.title}`}
                className="relative bg-zinc-900/80 border border-white/15 overflow-hidden text-white rounded-3xl backdrop-blur-xl shadow-[0_12px_32px_rgba(0,0,0,0.6)] p-6 flex flex-col items-center text-center space-y-4"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] via-transparent to-black/60 pointer-events-none" />

                <div className="relative z-10 w-full flex flex-col items-center space-y-3.5">
                  {/* Top Center Logo Badge */}
                  <div className="w-12 h-12 bg-white/10 border border-white/20 text-white flex items-center justify-center rounded-2xl font-headline font-bold text-xl uppercase">
                    {project.logo}
                  </div>

                  {/* Project Title & Subtitle */}
                  <div className="space-y-1">
                    <h3 className="font-headline text-3xl font-bold uppercase tracking-wide text-white">
                      {project.title}
                    </h3>
                    <h4 className="font-headline text-base text-zinc-300 font-medium uppercase tracking-wider">
                      {project.subtitle}
                    </h4>
                  </div>

                  {/* Tags Pill Badges */}
                  <div className="flex flex-wrap justify-center gap-1.5 pt-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-white/[0.06] border border-white/10 text-zinc-300 text-xs font-mono font-medium"
                      >
                        <span className="w-1 h-1 rounded-full bg-white" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Project Description */}
                  <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                    {project.description}
                  </p>

                  {/* Action Buttons Bar */}
                  <div className="flex flex-col w-full gap-2.5 pt-2">
                    <Button asChild className="rounded-full w-full py-2.5 bg-white hover:bg-zinc-200 text-black font-semibold text-sm shadow-md">
                      <Link href={`/projects/${slug}`}>
                        View Case Study <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <div className="flex gap-2 w-full">
                      {project.github && (
                        <Button asChild variant="outline" className="rounded-full flex-1 py-2 border-white/20 bg-white/5 text-white text-xs">
                          <Link href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-1.5 h-3.5 w-3.5" /> GitHub
                          </Link>
                        </Button>
                      )}
                      {project.demo && (
                        <Button asChild variant="outline" className="rounded-full flex-1 py-2 border-white/20 bg-white/5 text-white text-xs">
                          <Link href={project.demo} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-1.5 h-3.5 w-3.5" /> Demo
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;
