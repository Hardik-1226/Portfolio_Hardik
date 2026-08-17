"use client";

import Link from "next/link";
import BubbleMenu from "@/components/common/BubbleMenu";
import CircularText from "@/components/common/CircularText";

const menuItems = [
  {
    label: "home",
    href: "#",
    ariaLabel: "Home",
    rotation: -6,
    hoverStyles: { bgColor: "#a855f7", textColor: "#ffffff" },
  },
  {
    label: "about",
    href: "#about",
    ariaLabel: "About",
    rotation: 6,
    hoverStyles: { bgColor: "#c084fc", textColor: "#0f0b16" },
  },
  {
    label: "projects",
    href: "#projects",
    ariaLabel: "Projects",
    rotation: -5,
    hoverStyles: { bgColor: "#818cf8", textColor: "#ffffff" },
  },
  {
    label: "journey",
    href: "#timeline",
    ariaLabel: "Timeline Journey",
    rotation: 7,
    hoverStyles: { bgColor: "#38bdf8", textColor: "#0f0b16" },
  },
  {
    label: "awards",
    href: "#achievements",
    ariaLabel: "Achievements & Awards",
    rotation: -6,
    hoverStyles: { bgColor: "#fb7185", textColor: "#ffffff" },
  },
  {
    label: "certifications",
    href: "#certifications",
    ariaLabel: "Certifications",
    rotation: 5,
    hoverStyles: { bgColor: "#34d399", textColor: "#0f0b16" },
  },
  {
    label: "contact",
    href: "#contact",
    ariaLabel: "Contact Me",
    rotation: -7,
    hoverStyles: { bgColor: "#e879f9", textColor: "#0f0b16" },
  },
];

export function Header() {
  return (
    <header className="relative z-[1001]">
      <BubbleMenu
        logo={
          <Link
            href="/"
            className="inline-flex items-center justify-center select-none"
            title="Hardik Varshney — Home"
          >
            <CircularText
              text="HARDIK*VARSHNEY*"
              onHover="speedUp"
              spinDuration={20}
              className="hover:scale-105 transition-transform"
            />
          </Link>
        }
        items={menuItems}
        menuAriaLabel="Toggle navigation"
        menuBg="#10081d"
        menuContentColor="#f8fafc"
        useFixedPosition={true}
        animationEase="back.out(1.5)"
        animationDuration={0.45}
        staggerDelay={0.08}
      />
    </header>
  );
}

export default Header;
