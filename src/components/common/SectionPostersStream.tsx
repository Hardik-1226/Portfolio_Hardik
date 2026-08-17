"use client";

import React from 'react';
import FlyingPosters from './FlyingPosters';
import { StrokeText } from './StrokeText';
import { Sparkles, MoveVertical } from 'lucide-react';

interface SectionPostersStreamProps {
  title?: string;
  subtitle?: string;
  items: string[];
  height?: number | string;
  planeWidth?: number;
  planeHeight?: number;
  distortion?: number;
  scrollEase?: number;
  className?: string;
}

export function SectionPostersStream({
  title = "SCROLL TRANSITION",
  subtitle = "Interactive 3D Poster Stream",
  items,
  height = 360,
  planeWidth = 300,
  planeHeight = 300,
  distortion = 2.8,
  scrollEase = 0.02,
  className = ""
}: SectionPostersStreamProps) {
  return (
    <div className={`w-full max-w-6xl mx-auto my-12 px-4 relative z-10 ${className}`}>
      <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-white/[0.02] backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        {/* Floating top bar */}
        <div className="absolute top-3 left-4 right-4 z-10 pointer-events-none flex items-center justify-between">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/15 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-purple-200">{subtitle}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-white/15 text-xs text-slate-300 backdrop-blur-md">
            <MoveVertical className="w-3.5 h-3.5 animate-bounce text-purple-400" />
            <span className="hidden sm:inline">Scroll to Fly</span>
          </div>
        </div>

        {/* 3D FlyingPosters Canvas */}
        <div style={{ height: typeof height === 'number' ? `${height}px` : height, width: '100%', position: 'relative' }}>
          <FlyingPosters
            items={items}
            planeWidth={planeWidth}
            planeHeight={planeHeight}
            distortion={distortion}
            scrollEase={scrollEase}
            cameraFov={45}
            cameraZ={20}
            className="cursor-grab active:cursor-grabbing"
          />
        </div>

        {/* Floating bottom label */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 pointer-events-none px-4 py-1 rounded-full bg-black/50 border border-white/10 text-[11px] font-mono uppercase tracking-widest text-slate-400 backdrop-blur-sm">
          {title}
        </div>
      </div>
    </div>
  );
}

export default SectionPostersStream;
