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

  const contactItems = [
    {
      id: "email",
      label: "Email Address",
      value: contact.email,
      buttonText: "Copy / Mail",
      icon: <Mail className="h-4 w-4 text-white" />,
      accentColor: "#a855f7",
      action: () => handleAction("email"),
    },
    {
      id: "github",
      label: "GitHub Profile",
      value: "github.com/Hardik-1226",
      buttonText: "Visit Profile",
      icon: <Github className="h-4 w-4 text-white" />,
      accentColor: "#38bdf8",
      action: () => handleAction("github"),
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      value: "linkedin.com/in/hardik-varshney",
      buttonText: "Connect",
      icon: <Linkedin className="h-4 w-4 text-white" />,
      accentColor: "#0284c7",
      action: () => handleAction("linkedin"),
    },
    {
      id: "instagram",
      label: "Instagram",
      value: "instagram.com/hardik.varshney",
      buttonText: "Follow",
      icon: <Instagram className="h-4 w-4 text-white" />,
      accentColor: "#ec4899",
      action: () => handleAction("instagram"),
    },
    {
      id: "phone",
      label: "Phone / WhatsApp",
      value: contact.phone,
      buttonText: "Call / Copy",
      icon: <Phone className="h-4 w-4 text-white" />,
      accentColor: "#22c55e",
      action: () => handleAction("phone"),
    },
    {
      id: "resume",
      label: "Resume / CV",
      value: "Hardik_Varshney.pdf",
      buttonText: "Download CV",
      icon: <FileText className="h-4 w-4 text-white" />,
      accentColor: "#f59e0b",
      action: () => handleAction("resume"),
    },
  ];

  return (
    <section id="contact" className="py-24 sm:py-32 bg-transparent text-slate-100 relative overflow-hidden">
      <div className="absolute inset-x-0 top-12 flex items-center justify-center pointer-events-none z-0">
        <span className="text-[14vw] font-headline font-black text-white/[0.18] tracking-widest select-none drop-shadow-[0_2px_15px_rgba(0,0,0,0.6)]">
          CONNECT
        </span>
      </div>
      <div className="container mx-auto px-4 text-center relative z-10 space-y-6">

        <div className="flex justify-center my-2 relative z-10">
          <StrokeText
            text="GET IN TOUCH"
            fontSize={52}
            strokeColor="#c084fc"
            fillColor="#ffffff"
            strokeWidth={1.8}
            drawDuration={1.8}
            trigger="scroll"
            fillMode="wipe"
            letterSpacing={2}
          />
        </div>
        <p className="text-slate-200 text-lg font-medium relative z-10">Thanks for visiting... I hope you enjoyed your stay!</p>

        <div className="flex justify-center my-4 relative z-10">
          <StrokeText
            text="ALWAYS CURIOUS • CONSTANTLY LEARNING"
            fontSize={24}
            strokeColor="#c084fc"
            fillColor="#f8fafc"
            strokeWidth={1.2}
            trigger="scroll"
            fillMode="wipe"
            letterSpacing={2}
          />
        </div>

        {/* Quick Send Message using CurvedInput */}
        <div className="max-w-2xl mx-auto my-8 p-6 rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          <div className="text-center mb-4">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-purple-500/20 text-purple-300 border border-purple-500/30 mb-2">
              ✦ Quick Direct Contact
            </span>
            <p className="text-slate-200 text-sm sm:text-base font-normal">
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
              backgroundColor="#100a1c"
              borderColor="#581c87"
              buttonColor="#a855f7"
              buttonTextColor="#ffffff"
              textColor="#f8fafc"
              placeholderColor="#94a3b8"
              shadowSize="lg"
              shadowColor="#7e22ce"
              icon={<Send className="h-4 w-4 text-white" />}
              value={userMsg}
              onChange={setUserMsg}
              onSubmit={handleQuickMessage}
            />
          </div>
        </div>

        {/* Contact Details Grid using CurvedInput components */}
        <div className="mt-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white drop-shadow-md">
              Connect Across Channels
            </h3>
            <p className="text-slate-300 text-sm sm:text-base mt-2">
              Click any curved channel card to copy, dial, or visit directly
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
            {contactItems.map((item) => (
              <div 
                key={item.id}
                className="group relative p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md transition-all duration-300 hover:border-purple-400/50 hover:bg-white/[0.07] hover:-translate-y-1 shadow-lg hover:shadow-purple-500/10 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-3 px-1">
                  <div className="flex items-center gap-2">
                    <span 
                      className="w-8 h-8 rounded-lg flex items-center justify-center shadow-md"
                      style={{ backgroundColor: `${item.accentColor}33`, borderColor: `${item.accentColor}66`, borderWidth: 1 }}
                    >
                      {item.icon}
                    </span>
                    <span className="font-bold text-sm text-slate-200 tracking-wide">
                      {item.label}
                    </span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-white transition-colors" />
                </div>

                <div className="my-2">
                  <CurvedInput
                    value={item.value}
                    buttonText={item.buttonText}
                    theme="dark"
                    bend={14}
                    height={56}
                    width="100%"
                    fontSize={13}
                    backgroundColor="#0c0714"
                    borderColor={`${item.accentColor}55`}
                    buttonColor={item.accentColor}
                    buttonTextColor="#ffffff"
                    textColor="#f8fafc"
                    placeholderColor="#94a3b8"
                    shadowSize="sm"
                    shadowColor={item.accentColor}
                    icon={item.icon}
                    showIcon={true}
                    onSubmit={item.action}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-slate-400 font-code text-sm">
          <p className="font-semibold text-slate-300">Based in New Delhi, India</p>
          <p className="mt-1 text-slate-400">{dateTime}</p>
        </div>
        
        <div className="mt-16">
          <CharacterCarousel />
        </div>
      </div>
    </section>
  );
}
