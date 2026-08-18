"use client";

import Link from "next/link";
import BubbleMenu from "@/components/common/BubbleMenu";

const menuItems = [
  {
    label: "home",
    href: "#",
    ariaLabel: "Home",
    rotation: -4,
    hoverStyles: { bgColor: "#ffffff", textColor: "#09090b" },
  },
  {
    label: "projects",
    href: "#projects",
    ariaLabel: "Projects",
    rotation: 4,
    hoverStyles: { bgColor: "#ffffff", textColor: "#09090b" },
  },
  {
    label: "journey",
    href: "#timeline",
    ariaLabel: "Timeline Journey",
    rotation: -4,
    hoverStyles: { bgColor: "#ffffff", textColor: "#09090b" },
  },
  {
    label: "about",
    href: "#about",
    ariaLabel: "About",
    rotation: 4,
    hoverStyles: { bgColor: "#ffffff", textColor: "#09090b" },
  },
  {
    label: "awards",
    href: "#achievements",
    ariaLabel: "Achievements & Awards",
    rotation: -4,
    hoverStyles: { bgColor: "#ffffff", textColor: "#09090b" },
  },
  {
    label: "certifications",
    href: "#certifications",
    ariaLabel: "Certifications",
    rotation: 4,
    hoverStyles: { bgColor: "#ffffff", textColor: "#09090b" },
  },
  {
    label: "contact",
    href: "#contact",
    ariaLabel: "Contact Me",
    rotation: -4,
    hoverStyles: { bgColor: "#ffffff", textColor: "#09090b" },
  },
];

export function Header() {
  return (
    <header className="relative z-[1001]">
      <BubbleMenu
        items={menuItems}
        menuAriaLabel="Toggle navigation"
        menuBg="#18181b"
        menuContentColor="#ffffff"
        useFixedPosition={true}
        animationEase="back.out(1.5)"
        animationDuration={0.45}
        staggerDelay={0.08}
      />
    </header>
  );
}

export default Header;
