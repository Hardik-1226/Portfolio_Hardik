'use client';

import React, {
  useCallback,
  useEffect,
  useRef,
  ReactNode,
  CSSProperties
} from 'react';

export type ConfigKey =
  | 'startWidth'
  | 'startHeight'
  | 'startRadius'
  | 'endRadius'
  | 'mediaZoom'
  | 'scrollDistance'
  | 'holdDistance'
  | 'smoothing'
  | 'overlayScrim'
  | 'useWindowScroll'
  | 'enabled';

export interface ScrollExpandProps {
  src?: string;
  mediaType?: 'image' | 'video';
  poster?: string;
  alt?: string;
  title?: string;
  scrollHint?: string;
  startWidth?: number;
  startHeight?: number;
  startRadius?: number;
  endRadius?: number;
  mediaZoom?: number;
  mediaOpacity?: number;
  mediaClassName?: string;
  scrollDistance?: number;
  holdDistance?: number;
  smoothing?: number;
  overlayScrim?: number;
  useWindowScroll?: boolean;
  enabled?: boolean;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  [key: string]: unknown;
}

export const ScrollExpand: React.FC<ScrollExpandProps> = ({
  src = '',
  mediaType = 'image',
  poster = '',
  alt = '',
  title = '',
  scrollHint = '',
  startWidth = 42,
  startHeight = 58,
  startRadius = 24,
  endRadius = 0,
  mediaZoom = 1.35,
  mediaOpacity,
  mediaClassName = '',
  scrollDistance = 1.2,
  holdDistance = 0.35,
  smoothing = 0.1,
  overlayScrim = 0.45,
  useWindowScroll = false,
  enabled = true,
  children,
  className = '',
  style,
  ...rest
}: ScrollExpandProps) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const mediaRef = useRef<HTMLImageElement & HTMLVideoElement>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const scrimRef = useRef<HTMLDivElement | null>(null);
  const hintRef = useRef<HTMLDivElement | null>(null);

  const propsRef = useRef<Required<Pick<ScrollExpandProps, ConfigKey>>>(
    {} as Required<Pick<ScrollExpandProps, ConfigKey>>
  );
  propsRef.current = {
    startWidth,
    startHeight,
    startRadius,
    endRadius,
    mediaZoom,
    scrollDistance,
    holdDistance,
    smoothing,
    overlayScrim,
    useWindowScroll,
    enabled
  };

  const applyProgress = useCallback((p: number) => {
    const frame = frameRef.current;
    const media = mediaRef.current;
    if (!frame || !media) return;
    const c = propsRef.current;

    const e = smoothstep(0, 1, p);

    const w = c.startWidth + (100 - c.startWidth) * e;
    const h = c.startHeight + (100 - c.startHeight) * e;
    const ix = Math.max(0, (100 - w) / 2);
    const iy = Math.max(0, (100 - h) / 2);
    const r = c.startRadius + (c.endRadius - c.startRadius) * e;
    frame.style.clipPath = `inset(${iy}% ${ix}% ${iy}% ${ix}% round ${r}px)`;

    media.style.transform = `scale(${c.mediaZoom + (1 - c.mediaZoom) * e})`;

    if (scrimRef.current) scrimRef.current.style.opacity = `${c.overlayScrim * e}`;

    if (titleRef.current) {
      const out = smoothstep(0.4, 0.88, p);
      titleRef.current.style.opacity = `${1 - out}`;
      titleRef.current.style.transform = `translate3d(0, ${-28 * out}px, 0) scale(${1 + 0.06 * out})`;
    }

    if (hintRef.current) {
      const gone = smoothstep(0, 0.12, p);
      hintRef.current.style.opacity = `${1 - gone}`;
      hintRef.current.style.transform = `translate3d(0, ${8 * gone}px, 0)`;
    }

    if (overlayRef.current) {
      const inn = smoothstep(0.68, 1, p);
      overlayRef.current.style.opacity = `${inn}`;
      overlayRef.current.style.transform = `translate3d(0, ${18 * (1 - inn)}px, 0)`;
    }
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!root || !track || !stage) return;

    let targetProgress = 0;
    let currentProgress = 0;
    let rafId: number | null = null;

    const compute = () => {
      const c = propsRef.current;
      if (!c.enabled) {
        applyProgress(0);
        return;
      }

      const total = track.offsetHeight - stage.offsetHeight;
      if (total <= 0) return;

      let top = 0;
      if (c.useWindowScroll) {
        top = -track.getBoundingClientRect().top;
      } else {
        top = root.scrollTop;
      }

      const raw = top / total;
      const progress = clamp((raw - 0) / (c.scrollDistance - 0));
      targetProgress = progress;
    };

    const loop = () => {
      const c = propsRef.current;
      currentProgress += (targetProgress - currentProgress) * c.smoothing;
      applyProgress(currentProgress);
      rafId = requestAnimationFrame(loop);
    };

    const handleScroll = () => {
      compute();
    };

    const updateDimensions = () => {
      const vh = window.innerHeight;
      const c = propsRef.current;
      stage.style.height = `${vh}px`;
      track.style.height = `${vh * (1 + c.scrollDistance + c.holdDistance)}px`;
      compute();
    };

    window.addEventListener('resize', updateDimensions);
    updateDimensions();

    if (propsRef.current.useWindowScroll) {
      window.addEventListener('scroll', handleScroll, { passive: true });
    } else {
      root.addEventListener('scroll', handleScroll, { passive: true });
    }

    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', updateDimensions);
      if (propsRef.current.useWindowScroll) {
        window.removeEventListener('scroll', handleScroll);
      } else {
        root.removeEventListener('scroll', handleScroll);
      }
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [applyProgress]);

  const media =
    mediaType === 'video' ? (
      <video
        ref={mediaRef}
        className={`absolute inset-0 w-full h-full object-cover origin-center select-none [will-change:transform] ${mediaClassName}`.trim()}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        style={mediaOpacity !== undefined ? { opacity: mediaOpacity } : undefined}
      />
    ) : (
      <img
        ref={mediaRef}
        className={`absolute inset-0 w-full h-full object-cover origin-center select-none [will-change:transform] ${mediaClassName}`.trim()}
        src={src}
        alt={alt}
        draggable={false}
        style={mediaOpacity !== undefined ? { opacity: mediaOpacity } : undefined}
      />
    );

  return (
    <div
      ref={rootRef}
      className={`relative w-full h-full ${useWindowScroll ? '' : 'overflow-y-auto overflow-x-hidden overscroll-contain [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden'} ${className}`.trim()}
      style={style}
      {...rest}
    >
      <div ref={trackRef} className="relative w-full">
        <div ref={stageRef} className="sticky top-0 w-full overflow-hidden [--se-title-size:4rem]">
          <div
            ref={frameRef}
            className="absolute inset-0 [clip-path:inset(21%_29%_21%_29%_round_24px)] [will-change:clip-path]"
          >
            {media}
            <div
              ref={scrimRef}
              className="absolute inset-0 opacity-0 pointer-events-none bg-[linear-gradient(to_top,rgba(0,0,0,0.85),rgba(0,0,0,0.2)_45%,rgba(0,0,0,0.45))]"
            />
            {children ? (
              <div
                ref={overlayRef}
                className="absolute inset-0 flex flex-col items-center justify-center text-center p-[6%] opacity-0 [will-change:opacity,transform]"
              >
                {children}
              </div>
            ) : null}
          </div>
          {title ? (
            <div
              ref={titleRef}
              className="absolute inset-0 flex items-center justify-center m-0 px-[6%] text-center font-headline font-black leading-tight tracking-tight text-white [font-size:var(--se-title-size)] drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)] pointer-events-none [will-change:opacity,transform]"
            >
              {title}
            </div>
          ) : null}
          {scrollHint ? (
            <div
              ref={hintRef}
              className="absolute inset-x-0 bottom-6 text-center text-sm font-semibold tracking-widest uppercase text-purple-300 pointer-events-none [will-change:opacity,transform]"
            >
              {scrollHint}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

function smoothstep(min: number, max: number, value: number) {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
}

function clamp(value: number, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max);
}

export default ScrollExpand;
