"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface HoverableTextProps {
  children: React.ReactNode;
  imageUrl: string;
  imageHint: string;
  className?: string;
}

export function HoverableText({ children, imageUrl, imageHint, className }: HoverableTextProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className={cn("italic text-accent-foreground/80", className)}>{children}</span>
      <div
        className={cn(
          "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-40 h-40 rounded-lg overflow-hidden shadow-2xl pointer-events-none transition-opacity duration-300 z-20",
          isHovered ? "opacity-100" : "opacity-0"
        )}
      >
        <Image src={imageUrl} alt="" fill className="object-cover" data-ai-hint={imageHint} sizes="10rem" />
      </div>
    </div>
  );
}
