"use client";

import { useState, useEffect } from "react";
import { contact } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Mail, Linkedin, Github, Copy, ArrowUpRight } from "lucide-react";
import { CharacterCarousel } from "@/components/common/character-carousel";
import { HoverableText } from "../common/hoverable-text";
import Beams from "../common/Beams";

export function ContactSection() {
  const { toast } = useToast();
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setDateTime(
        `${now.toLocaleDateString(undefined, {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })} - ${now.toLocaleTimeString()}`
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contact.email);
    toast({
      title: "Email Copied!",
      description: "You can now paste it to contact me.",
    });
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-slate-950 text-slate-100 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.5 }}>
        <Beams 
          beamWidth={2.5}
          beamHeight={20}
          beamNumber={10}
          lightColor="#ffffff"
          speed={1.5}
          noiseIntensity={1.2}
          scale={0.15}
          rotation={0}
        />
      </div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <p className="text-slate-300 mb-4">Thanks for visiting... I hope you enjoyed your stay!</p>
        <h2 className="font-headline text-3xl sm:text-4xl tracking-tight mb-4">
          Always <HoverableText imageUrl="https://picsum.photos/seed/curious/200/200" imageHint="magnifying glass" className="font-headline font-bold text-6xl sm:text-7xl text-slate-100">curious</HoverableText>. Constantly <HoverableText imageUrl="https://picsum.photos/seed/learning-contact/200/200" imageHint="brain gears" className="font-headline font-bold text-6xl sm:text-7xl text-slate-100">learning</HoverableText>.
        </h2>
        <a href={`mailto:${contact.email}`} className="font-headline text-3xl sm:text-4xl inline-block border-b-2 border-slate-100/80 pb-1 hover:text-primary transition-colors group">
          <Mail className="inline-block mr-2 -mt-1 h-7 w-7 transition-transform group-hover:scale-110"/>{contact.email}
        </a>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Button size="lg" variant="outline" className="rounded-full bg-transparent border-slate-200/40 text-slate-100 hover:bg-slate-800/70 hover:text-slate-100" onClick={handleCopyEmail}>
            <Copy className="mr-2 h-4 w-4" /> Copy Email
          </Button>
          <Button size="lg" variant="outline" className="rounded-full bg-transparent border-slate-200/40 text-slate-100 hover:bg-slate-800/70 hover:text-slate-100" asChild>
            <a href={contact.resume} download>
               View Resume <ArrowUpRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button size="lg" variant="outline" className="rounded-full bg-transparent border-slate-200/40 text-slate-100 hover:bg-slate-800/70 hover:text-slate-100" asChild>
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
               LinkedIn <Linkedin className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button size="lg" variant="outline" className="rounded-full bg-transparent border-slate-200/40 text-slate-100 hover:bg-slate-800/70 hover:text-slate-100" asChild>
            <a href={contact.github} target="_blank" rel="noopener noreferrer">
              GitHub <Github className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>

        <div className="mt-12 text-slate-400 font-code">
          <p>Based in New Delhi, India</p>
          <p>{dateTime}</p>
        </div>
        
        <div className="mt-20">
          <CharacterCarousel />
        </div>
      </div>
    </section>
  );
}
