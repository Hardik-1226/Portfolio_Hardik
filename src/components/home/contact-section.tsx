"use client";

import { contact } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Mail, Download, Linkedin, Github, AtSign, Send } from "lucide-react";

export function ContactSection() {
  const { toast } = useToast();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contact.email);
    toast({
      title: "Email Copied!",
      description: "You can now paste it to contact me.",
    });
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-card/50 relative overflow-hidden">
      <AtSign className="absolute -left-4 -top-4 text-primary/10 w-32 h-32 animate-pulse" />
      <Send className="absolute -right-8 -bottom-8 text-accent/10 w-40 h-40 animate-pulse" style={{ animationDelay: '500ms' }} />
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="font-headline text-4xl sm:text-5xl tracking-tight">Get In Touch</h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-center">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of an amazing team.
        </p>
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Button size="lg" className="rounded-full" onClick={handleCopyEmail}>
            <Mail className="mr-2 h-5 w-5" /> {contact.email}
          </Button>
          <Button size="lg" variant="secondary" className="rounded-full" asChild>
            <a href={contact.resume} download>
              <Download className="mr-2 h-5 w-5" /> Download Resume
            </a>
          </Button>
          <Button size="icon" variant="outline" className="rounded-full" asChild>
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
          </Button>
          <Button size="icon" variant="outline" className="rounded-full" asChild>
            <a href={contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
