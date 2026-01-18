"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/common/logo";

const navLinks = [
  { href: "/#projects", label: "Projects" },
  { href: "/#timeline", label: "Timeline" },
  { href: "/#about", label: "About" },
  { href: "/#achievements", label: "Achievements" },
  { href: "/#certifications", label: "Certifications" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // set initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "pt-2" : "pt-4"
      )}
    >
      <div
        className={cn(
          "flex items-center mx-auto transition-all duration-300 p-2",
          isScrolled
            ? "w-[95%] max-w-5xl rounded-full bg-card/70 backdrop-blur-lg border shadow-sm"
            : "max-w-6xl bg-transparent"
        )}
      >
        <Link href="/" className="flex items-center gap-2 font-bold text-lg p-2" aria-label="Back to homepage">
          <Logo />
        </Link>
        <nav className="hidden md:flex items-center gap-1 mx-auto">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                (pathname === link.href || (link.href.startsWith('/#') && pathname === '/'))
                  ? "text-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center">
           <Button asChild className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90">
             <Link href="/#contact">Contact</Link>
           </Button>
        </div>
      </div>
    </header>
  );
}
