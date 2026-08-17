"use client";

import React, { useId, useMemo, type CSSProperties, type ElementType } from 'react';

export interface MaskedHeadingProps {
  text?: string;
  tag?: ElementType;
  mediaType?: 'image' | 'video' | 'gradient';
  src?: string;
  gradient?: string;
  className?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  weight?: number | string;
  tracking?: number | string;
  lineHeight?: number | string;
  [key: string]: unknown;
}

export const MaskedHeading: React.FC<MaskedHeadingProps> = ({
  text = 'Designed in the details',
  tag: Tag = 'span',
  mediaType = 'gradient',
  src = '',
  gradient,
  className = '',
  style,
  children,
  align = 'center',
  weight = 800,
  tracking = '-0.02em',
  lineHeight = 1.1,
  ...rest
}) => {
  const rawId = useId();
  const defaultGradient = 'linear-gradient(135deg, #ffffff 0%, #f8fafc 40%, #e2e8f0 70%, #c084fc 100%)';
  const effectiveGradient = gradient || defaultGradient;
  const displayText = children ? String(children) : text;
  const words = useMemo(() => String(displayText).split(/\s+/).filter(Boolean), [displayText]);

  const backgroundStyle: CSSProperties = useMemo(() => {
    if (mediaType === 'image' && src) {
      return {
        backgroundImage: `url(${src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        color: 'transparent',
        display: 'inline-block',
      };
    }
    return {
      backgroundImage: effectiveGradient,
      backgroundSize: '100%',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      color: 'transparent',
      display: 'inline-block',
    };
  }, [mediaType, src, effectiveGradient]);

  const TagAny = Tag as any;

  return (
    <TagAny
      className={`relative inline-flex flex-wrap items-center justify-center gap-x-[0.3em] gap-y-1 font-headline font-black select-none drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)] ${className}`.trim()}
      style={{
        textAlign: align,
        fontWeight: weight,
        letterSpacing: tracking,
        lineHeight,
        opacity: 1,
        visibility: 'visible',
        ...style,
      }}
      {...rest}
    >
      {words.map((word, i) => (
        <span
          key={`${rawId}-${word}-${i}`}
          className="inline-block font-headline font-black transition-transform duration-300 hover:scale-105"
          style={backgroundStyle}
        >
          {word}
        </span>
      ))}
    </TagAny>
  );
};

export default MaskedHeading;