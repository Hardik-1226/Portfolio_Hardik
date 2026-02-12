'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const DEFAULT_PARTICLE_COUNT = 10;
const DEFAULT_SPOTLIGHT_RADIUS = 260;
const DEFAULT_GLOW_COLOR = '132, 0, 255';
const MOBILE_BREAKPOINT = 768;

const createParticleElement = (x: number, y: number, color = DEFAULT_GLOW_COLOR) => {
  const el = document.createElement('div');
  el.className = 'magic-bento-particle';
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 5;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

const calculateSpotlightValues = (radius: number) => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.75
});

const updateCardGlowProperties = (card: HTMLElement, mouseX: number, mouseY: number, glow: number, radius: number) => {
  const rect = card.getBoundingClientRect();
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;

  card.style.setProperty('--glow-x', `${relativeX}%`);
  card.style.setProperty('--glow-y', `${relativeY}%`);
  card.style.setProperty('--glow-intensity', glow.toString());
  card.style.setProperty('--glow-radius', `${radius}px`);
};

export default function MagicBentoController() {
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const particlesInitializedRef = useRef(false);
  const memoizedParticlesRef = useRef<HTMLDivElement[]>([]);
  const timeoutsRef = useRef<number[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
    if (isMobile) return;

    const cards = Array.from(document.querySelectorAll<HTMLElement>('.magic-bento-card'));
    if (!cards.length) return;

    const spotlight = document.createElement('div');
    spotlight.className = 'magic-bento-spotlight';
    spotlight.style.cssText = `
      position: fixed;
      width: 700px;
      height: 700px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${DEFAULT_GLOW_COLOR}, 0.15) 0%,
        rgba(${DEFAULT_GLOW_COLOR}, 0.08) 15%,
        rgba(${DEFAULT_GLOW_COLOR}, 0.04) 25%,
        rgba(${DEFAULT_GLOW_COLOR}, 0.02) 40%,
        rgba(${DEFAULT_GLOW_COLOR}, 0.01) 65%,
        transparent 70%
      );
      z-index: 40;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const initializeParticles = (card: HTMLElement) => {
      if (particlesInitializedRef.current) return;
      const { width, height } = card.getBoundingClientRect();
      memoizedParticlesRef.current = Array.from({ length: DEFAULT_PARTICLE_COUNT }, () =>
        createParticleElement(Math.random() * width, Math.random() * height)
      );
      particlesInitializedRef.current = true;
    };

    const clearParticles = () => {
      timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
      timeoutsRef.current = [];

      document.querySelectorAll<HTMLElement>('.magic-bento-particle').forEach(particle => {
        gsap.to(particle, {
          scale: 0,
          opacity: 0,
          duration: 0.3,
          ease: 'back.in(1.7)',
          onComplete: () => particle.remove()
        });
      });
    };

    const spawnParticles = (card: HTMLElement) => {
      if (!particlesInitializedRef.current) initializeParticles(card);

      memoizedParticlesRef.current.forEach((particle, index) => {
        const timeoutId = window.setTimeout(() => {
          const clone = particle.cloneNode(true) as HTMLDivElement;
          card.appendChild(clone);

          gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });

          gsap.to(clone, {
            x: (Math.random() - 0.5) * 100,
            y: (Math.random() - 0.5) * 100,
            rotation: Math.random() * 360,
            duration: 2 + Math.random() * 2,
            ease: 'none',
            repeat: -1,
            yoyo: true
          });

          gsap.to(clone, {
            opacity: 0.3,
            duration: 1.5,
            ease: 'power2.inOut',
            repeat: -1,
            yoyo: true
          });
        }, index * 80);

        timeoutsRef.current.push(timeoutId);
      });
    };

    const handleMouseMove = (event: MouseEvent) => {
      const { proximity, fadeDistance } = calculateSpotlightValues(DEFAULT_SPOTLIGHT_RADIUS);
      let minDistance = Infinity;
      let hoveringCard = false;

      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const inside =
          event.clientX >= rect.left &&
          event.clientX <= rect.right &&
          event.clientY >= rect.top &&
          event.clientY <= rect.bottom;

        if (inside) hoveringCard = true;

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.hypot(event.clientX - centerX, event.clientY - centerY) - Math.max(rect.width, rect.height) / 2;
        const effectiveDistance = Math.max(0, distance);
        minDistance = Math.min(minDistance, effectiveDistance);

        let glowIntensity = 0;
        if (effectiveDistance <= proximity) glowIntensity = 1;
        else if (effectiveDistance <= fadeDistance) glowIntensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity);

        updateCardGlowProperties(card, event.clientX, event.clientY, glowIntensity, DEFAULT_SPOTLIGHT_RADIUS);
      });

      if (spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          left: event.clientX,
          top: event.clientY,
          duration: 0.1,
          ease: 'power2.out'
        });

        const targetOpacity =
          minDistance <= proximity
            ? 0.75
            : minDistance <= fadeDistance
              ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.75
              : 0;

        gsap.to(spotlightRef.current, {
          opacity: hoveringCard ? targetOpacity : 0,
          duration: hoveringCard ? 0.2 : 0.4,
          ease: 'power2.out'
        });
      }
    };

    const handleMouseLeave = () => {
      cards.forEach(card => card.style.setProperty('--glow-intensity', '0'));
      if (spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
      clearParticles();
    };

    const attachCardListeners = (card: HTMLElement) => {
      const handleEnter = () => {
        spawnParticles(card);
        gsap.to(card, { rotateX: 3, rotateY: 3, duration: 0.2, ease: 'power2.out', transformPerspective: 1000 });
      };

      const handleLeave = () => {
        clearParticles();
        gsap.to(card, { rotateX: 0, rotateY: 0, x: 0, y: 0, duration: 0.3, ease: 'power2.out' });
      };

      const handleMove = (event: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;
        const magnetX = (x - centerX) * 0.03;
        const magnetY = (y - centerY) * 0.03;

        gsap.to(card, {
          rotateX,
          rotateY,
          x: magnetX,
          y: magnetY,
          duration: 0.15,
          ease: 'power2.out',
          transformPerspective: 1000
        });
      };

      card.addEventListener('mouseenter', handleEnter);
      card.addEventListener('mouseleave', handleLeave);
      card.addEventListener('mousemove', handleMove);

      return () => {
        card.removeEventListener('mouseenter', handleEnter);
        card.removeEventListener('mouseleave', handleLeave);
        card.removeEventListener('mousemove', handleMove);
      };
    };

    const cleanupCardListeners = cards.map(card => attachCardListeners(card));

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cleanupCardListeners.forEach(cleanup => cleanup());
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      spotlightRef.current?.remove();
      clearParticles();
    };
  }, []);

  return null;
}
