"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import PillNav from "@/components/layout/pill-nav";

const navLinks = [
  { href: "/#projects", label: "Projects" },
  { href: "/#timeline", label: "Timeline" },
  { href: "/#about", label: "About" },
  { href: "/#achievements", label: "Achievements" },
  { href: "/#certifications", label: "Certifications" },
  { href: "/#contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [activeHref, setActiveHref] = useState<string | undefined>(undefined);

  useEffect(() => {
    const updateActive = () => {
      const hash = window.location.hash;
      if (hash) {
        setActiveHref(`/${hash}`);
      } else if (pathname) {
        setActiveHref(pathname);
      }
    };

    updateActive();
    window.addEventListener("hashchange", updateActive);
    return () => window.removeEventListener("hashchange", updateActive);
  }, [pathname]);

  return (
    <header className="relative z-[1000]">
      <PillNav
        items={navLinks}
        activeHref={activeHref}
        baseColor="#0f0b16"
        pillColor="#e8d4ff"
        hoveredPillTextColor="#e8d4ff"
        pillTextColor="#0f0b16"
      />
    </header>
  );
}
