"use client";

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export function Typewriter({ children, speed = 25, className, as: Comp = 'div' }: { children: React.ReactNode, speed?: number, className?: string, as?: React.ElementType }) {
    const [displayedChildren, setDisplayedChildren] = useState<React.ReactNode[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isAnimating, setIsAnimating] = useState(false);

    const nodes = React.useMemo(() => React.Children.toArray(children).flatMap(node => {
        if (typeof node === 'string') {
            return node.split('').map((char, index) => <span key={`char-${index}`}>{char}</span>);
        }
        return [<span key={`node-${Math.random()}`}>{node}</span>];
    }), [children]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isAnimating) {
                    setIsAnimating(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        const currentRef = containerRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [isAnimating]);

    useEffect(() => {
        if (!isAnimating) return;

        setDisplayedChildren([]);
        let i = 0;
        const interval = setInterval(() => {
            if (i < nodes.length) {
                setDisplayedChildren(prev => [...prev, nodes[i]]);
                i++;
            } else {
                clearInterval(interval);
            }
        }, speed);

        return () => clearInterval(interval);
    }, [isAnimating, nodes, speed]);

    const Caret = () => <span className="inline-block w-0.5 h-6 bg-primary animate-pulse ml-1" />;

    return (
        <Comp ref={containerRef} className={cn(className, 'min-h-[1.5em]')}>
            {displayedChildren.map((child, i) => <React.Fragment key={i}>{child}</React.Fragment>)}
            {isAnimating && displayedChildren.length < nodes.length && <Caret />}
        </Comp>
    );
}
