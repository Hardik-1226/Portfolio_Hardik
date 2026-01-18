"use client";

import { useState, useEffect } from "react";
import { contact } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Mail, Linkedin, Github, Copy, ArrowUpRight } from "lucide-react";
import { CharacterCarousel } from "@/components/common/character-carousel";

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
    <section id="contact" className="py-24 sm:py-32 bg-card/50">
      <div className="container mx-auto px-4 text-center">
        <p className="text-muted-foreground mb-4">Thanks for visiting... I hope you enjoyed your stay!</p>
        <h2 className="font-headline text-4xl sm:text-5xl tracking-tight mb-4">Always curious. Constantly learning.</h2>
        <a href={`mailto:${contact.email}`} className="font-headline text-2xl sm:text-3xl inline-block border-b-2 border-foreground pb-1 hover:text-primary-foreground hover:border-primary-foreground transition-colors group">
          <Mail className="inline-block mr-2 -mt-1 h-7 w-7 transition-transform group-hover:scale-110"/>{contact.email}
        </a>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Button size="lg" variant="outline" className="rounded-full" onClick={handleCopyEmail}>
            <Copy className="mr-2 h-4 w-4" /> Copy Email
          </Button>
          <Button size="lg" variant="outline" className="rounded-full" asChild>
            <a href={contact.resume} download>
               View Resume <ArrowUpRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button size="lg" variant="outline" className="rounded-full" asChild>
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
               LinkedIn <Linkedin className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button size="lg" variant="outline" className="rounded-full" asChild>
            <a href={contact.github} target="_blank" rel="noopener noreferrer">
              GitHub <Github className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>

        <div className="mt-12 text-muted-foreground font-code">
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
