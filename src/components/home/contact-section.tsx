"use client";

import { useState, useEffect } from "react";
import { contact } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import { 
  Mail, 
  Linkedin, 
  Github, 
  Instagram, 
  Phone, 
  FileText, 
  Send, 
  Copy, 
  ArrowUpRight 
} from "lucide-react";
import { CharacterCarousel } from "@/components/common/character-carousel";
import { HoverableText } from "../common/hoverable-text";
import { MaskedHeading } from "../common/MaskedHeading";
import { StrokeText } from "../common/StrokeText";
import { CurvedInput } from "../common/CurvedInput";

export function ContactSection() {
  const { toast } = useToast();
  const [dateTime, setDateTime] = useState("");
  const [userMsg, setUserMsg] = useState("");

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

  const handleQuickMessage = (msg: string) => {
    const text = msg.trim();
    if (!text) {
      toast({
        title: "Please enter a message",
        description: "Type something to send directly to Hardik.",
      });
      return;
    }
    window.location.href = `mailto:${contact.email}?subject=Message%20from%20Portfolio&body=${encodeURIComponent(text)}`;
    toast({
      title: "Opening Email Client...",
      description: "Ready to send your message to Hardik!",
    });
  };

  const handleAction = (type: string) => {
    switch (type) {
      case "email":
        navigator.clipboard.writeText(contact.email);
        toast({
          title: "Email Copied!",
          description: `${contact.email} copied to clipboard.`,
        });
        break;
      case "mail":
        window.location.href = `mailto:${contact.email}`;
        break;
      case "github":
        window.open(contact.github, "_blank", "noopener,noreferrer");
        break;
      case "linkedin":
        window.open(contact.linkedin, "_blank", "noopener,noreferrer");
        break;
      case "instagram":
        window.open(contact.instagram, "_blank", "noopener,noreferrer");
        break;
      case "phone":
        navigator.clipboard.writeText(contact.phone);
        window.location.href = `tel:${contact.phone}`;
        toast({
          title: "Phone Copied & Dialing",
          description: `${contact.phone} copied to clipboard.`,
        });
        break;
      case "resume":
        window.open(contact.resume, "_blank", "noopener,noreferrer");
        toast({
          title: "Opening Resume",
          description: "Viewing Hardik's resume PDF.",
        });
        break;
      default:
        break;
    }
  };

  const socialButtons = [
    {
      id: "linkedin",
      label: "LinkedIn",
      icon: <Linkedin className="h-7 w-7 sm:h-8 sm:w-8" />,
      iconClass: "text-zinc-400 group-hover:text-white group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.85)]",
      action: () => handleAction("linkedin"),
    },
    {
      id: "github",
      label: "GitHub",
      icon: <Github className="h-7 w-7 sm:h-8 sm:w-8" />,
      iconClass: "text-zinc-400 group-hover:text-white group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.85)]",
      action: () => handleAction("github"),
    },
    {
      id: "resume",
      label: "Resume / CV",
      icon: <FileText className="h-7 w-7 sm:h-8 sm:w-8" />,
      iconClass: "text-zinc-400 group-hover:text-white group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.85)]",
      action: () => handleAction("resume"),
    },
    {
      id: "email",
      label: "Email",
      icon: <Mail className="h-7 w-7 sm:h-8 sm:w-8" />,
      iconClass: "text-zinc-400 group-hover:text-white group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.85)]",
      action: () => handleAction("email"),
    },
    {
      id: "phone",
      label: "Phone / WhatsApp",
      icon: <Phone className="h-7 w-7 sm:h-8 sm:w-8" />,
      iconClass: "text-zinc-400 group-hover:text-white group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.85)]",
      action: () => handleAction("phone"),
    },
    {
      id: "instagram",
      label: "Instagram",
      icon: <Instagram className="h-7 w-7 sm:h-8 sm:w-8" />,
      iconClass: "text-zinc-400 group-hover:text-white group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.85)]",
      action: () => handleAction("instagram"),
    },
  ];

  return (
    <section id="contact" className="py-24 sm:py-32 bg-transparent text-zinc-100 relative overflow-hidden">
      <div className="absolute inset-x-0 top-12 flex items-center justify-center pointer-events-none z-0">
        <span className="text-[14vw] font-headline font-bold text-white/[0.04] uppercase tracking-widest select-none">
          CONNECT
        </span>
      </div>
      <div className="container mx-auto px-4 text-center relative z-10 space-y-6">

        <div className="flex justify-center my-2 relative z-10">
          <StrokeText
            text="GET IN TOUCH"
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
        <p className="text-zinc-300 text-base sm:text-lg font-normal relative z-10 max-w-xl mx-auto">
          Thanks for visiting! Reach out directly or connect with me:
        </p>

        <div className="flex justify-center my-4 relative z-10">
          <StrokeText
            text="ALWAYS CURIOUS • CONSTANTLY LEARNING"
            fontSize={22}
            strokeColor="#a1a1aa"
            fillColor="#ffffff"
            strokeWidth={1.2}
            trigger="scroll"
            fillMode="wipe"
            letterSpacing={3}
          />
        </div>

        {/* Quick Send Message using CurvedInput - Vibrant & Colorful */}
        <div className="max-w-2xl mx-auto my-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-950/50 via-zinc-900/90 to-purple-950/50 border border-indigo-500/30 backdrop-blur-xl shadow-[0_12px_45px_rgba(99,102,241,0.25)]">
          <div className="text-center mb-5">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-300 border border-indigo-500/35 mb-2 shadow-[0_0_20px_rgba(99,102,241,0.25)]">
              <Send className="w-3.5 h-3.5 text-indigo-400" />
              Quick Direct Contact
            </span>
            <p className="text-zinc-200 text-sm sm:text-base font-normal mt-1">
              Type your message or enquiry below and hit send:
            </p>
          </div>

          <div className="flex justify-center my-2">
            <CurvedInput
              placeholder="Hi Hardik, let's collaborate on a project..."
              buttonText="Send Mail"
              theme="dark"
              bend={22}
              height={64}
              width="100%"
              fontSize={15}
              backgroundColor="#0e0a1e"
              borderColor="#6366f1"
              buttonColor="#6366f1"
              buttonTextColor="#ffffff"
              textColor="#f8fafc"
              placeholderColor="#818cf8"
              shadowSize="lg"
              shadowColor="#4f46e5"
              icon={<Send className="h-4 w-4 text-white" />}
              value={userMsg}
              onChange={setUserMsg}
              onSubmit={handleQuickMessage}
            />
          </div>
        </div>

        {/* Standalone Logo Icons (No Boxes) */}
        <div className="mt-8 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-6 sm:gap-8 flex-wrap">
            {socialButtons.map((btn) => (
              <button
                key={btn.id}
                type="button"
                onClick={btn.action}
                className="p-3 rounded-full transition-transform duration-300 hover:scale-125 focus:outline-none flex items-center justify-center cursor-pointer group"
                title={btn.label}
                aria-label={btn.label}
              >
                <span className={`transition-all duration-300 ${btn.iconClass}`}>
                  {btn.icon}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-16 text-zinc-400 font-mono text-sm">
          <p className="font-semibold text-zinc-300">Based in Greater Noida / New Delhi, India</p>
          <p className="mt-1 text-zinc-500">{dateTime}</p>
        </div>
        
        <div className="mt-16">
          <CharacterCarousel />
        </div>
      </div>
    </section>
  );
}
