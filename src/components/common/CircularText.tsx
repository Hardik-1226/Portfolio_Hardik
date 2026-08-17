"use client";

import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

export interface CircularTextProps {
  text?: string;
  spinDuration?: number;
  onHover?: 'speedUp' | 'slowDown' | 'pause' | 'goBonkers';
  className?: string;
  style?: React.CSSProperties;
}

export const CircularText: React.FC<CircularTextProps> = ({
  text = 'HARDIK*VARSHNEY*',
  spinDuration = 20,
  onHover = 'speedUp',
  className = '',
  style = {}
}) => {
  const letters = Array.from(text);
  const controls = useAnimation();
  const [currentDuration, setCurrentDuration] = useState(spinDuration);

  useEffect(() => {
    controls.start({
      rotate: 360,
      transition: {
        ease: 'linear',
        duration: currentDuration,
        repeat: Infinity
      }
    });
  }, [controls, currentDuration]);

  const handleHoverStart = () => {
    if (onHover === 'speedUp') {
      setCurrentDuration(spinDuration / 4);
    } else if (onHover === 'slowDown') {
      setCurrentDuration(spinDuration * 2);
    } else if (onHover === 'pause') {
      controls.stop();
    } else if (onHover === 'goBonkers') {
      setCurrentDuration(spinDuration / 10);
    }
  };

  const handleHoverEnd = () => {
    setCurrentDuration(spinDuration);
  };

  return (
    <motion.div
      className={`relative inline-flex items-center justify-center select-none w-14 h-14 sm:w-16 sm:h-16 ${className}`.trim()}
      style={style}
      animate={controls}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
    >
      {letters.map((letter, i) => {
        const rotation = (360 / letters.length) * i;
        return (
          <span
            key={i}
            className="absolute font-headline font-black text-[9px] sm:text-[10px] uppercase tracking-widest text-purple-200"
            style={{
              transform: `rotate(${rotation}deg) translateY(-23px)`,
              transformOrigin: 'center center'
            }}
          >
            {letter}
          </span>
        );
      })}
      {/* Center glowing badge/dot */}
      <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-sky-400 shadow-[0_0_10px_rgba(192,132,252,0.9)] animate-pulse" />
    </motion.div>
  );
};

export default CircularText;
