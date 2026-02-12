"use client";

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface ScrollAnimationProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  delay?: number;
  as?: React.ElementType;
}

export function ScrollAnimation({
  children,
  className,
  delay = 0,
  as: Comp = 'div' as React.ElementType,
  ...props
}: ScrollAnimationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<any>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Set visibility based on whether the element is intersecting
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const { style, ...restProps } = props;
  const CompAsAny = Comp as any;
  return (
    <CompAsAny
      ref={domRef}
      className={cn(
        'transition-all duration-1000 ease-out',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12',
        className
      )}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      {...restProps}
    >
      {children}
    </CompAsAny>
  );
}
