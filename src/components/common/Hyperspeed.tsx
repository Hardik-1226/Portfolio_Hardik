'use client';

import { useEffect, useRef } from 'react';

export const hyperspeedPresets = {
  one: {
    onSpeedUp: () => {},
    onSlowDown: () => {},
    distortion: 'turbulentDistortion',
    length: 400,
    roadWidth: 10,
    islandWidth: 2,
    lanesPerRoad: 3,
    fov: 90,
    fovSpeedUp: 150,
    speedUp: 2,
    carLightsFade: 0.4,
    totalSideLightSticks: 20,
    lightPairsPerRoadWay: 40,
    shoulderLinesWidthPercentage: 0.05,
    brokenLinesWidthPercentage: 0.1,
    brokenLinesLengthPercentage: 0.5,
    lightStickWidth: [0.12, 0.5],
    lightStickHeight: [1.3, 1.7],
    movingAwaySpeed: [60, 80],
    movingCloserSpeed: [-120, -160],
    carLightsLength: [400 * 0.03, 400 * 0.2],
    carLightsRadius: [0.05, 0.14],
    carWidthPercentage: [0.3, 0.5],
    carShiftX: [-0.8, 0.8],
    carFloorSeparation: [0, 5],
    colors: {
      roadColor: 0x080808,
      islandColor: 0x0a0a0a,
      background: 0x000000,
      shoulderLines: 0x131318,
      brokenLines: 0x131318,
      leftCars: [0xd856bf, 0x6750a2, 0xc247ac],
      rightCars: [0x03b3c3, 0x0e5ea5, 0x324555],
      sticks: 0x03b3c3
    }
  },
  two: {
    onSpeedUp: () => {},
    onSlowDown: () => {},
    distortion: 'mountainDistortion',
    length: 400,
    roadWidth: 9,
    islandWidth: 2,
    lanesPerRoad: 3,
    fov: 90,
    fovSpeedUp: 150,
    speedUp: 2,
    carLightsFade: 0.4,
    totalSideLightSticks: 50,
    lightPairsPerRoadWay: 50,
    shoulderLinesWidthPercentage: 0.05,
    brokenLinesWidthPercentage: 0.1,
    brokenLinesLengthPercentage: 0.5,
    lightStickWidth: [0.12, 0.5],
    lightStickHeight: [1.3, 1.7],

    movingAwaySpeed: [60, 80],
    movingCloserSpeed: [-120, -160],
    carLightsLength: [400 * 0.05, 400 * 0.15],
    carLightsRadius: [0.05, 0.14],
    carWidthPercentage: [0.3, 0.5],
    carShiftX: [-0.2, 0.2],
    carFloorSeparation: [0.05, 1],
    colors: {
      roadColor: 0x080808,
      islandColor: 0x0a0a0a,
      background: 0x000000,
      shoulderLines: 0x131318,
      brokenLines: 0x131318,
      leftCars: [0xff102a, 0xeb383e, 0xff102a],
      rightCars: [0xdadafa, 0xbebae3, 0x8f97e4],
      sticks: 0xdadafa
    }
  },
  three: {
    onSpeedUp: () => {},
    onSlowDown: () => {},
    distortion: 'xyDistortion',
    length: 400,
    roadWidth: 9,
    islandWidth: 2,
    lanesPerRoad: 3,
    fov: 90,
    fovSpeedUp: 150,
    speedUp: 3,
    carLightsFade: 0.4,
    totalSideLightSticks: 50,
    lightPairsPerRoadWay: 30,
    shoulderLinesWidthPercentage: 0.05,
    brokenLinesWidthPercentage: 0.1,
    brokenLinesLengthPercentage: 0.5,
    lightStickWidth: [0.02, 0.05],
    lightStickHeight: [0.3, 0.7],
    movingAwaySpeed: [20, 50],
    movingCloserSpeed: [-150, -230],
    carLightsLength: [400 * 0.05, 400 * 0.2],
    carLightsRadius: [0.03, 0.08],
    carWidthPercentage: [0.1, 0.5],
    carShiftX: [-0.5, 0.5],
    carFloorSeparation: [0, 0.1],
    colors: {
      roadColor: 0x080808,
      islandColor: 0x0a0a0a,
      background: 0x000000,
      shoulderLines: 0x131318,
      brokenLines: 0x131318,
      leftCars: [0x7d0d1b, 0xa90519, 0xff102a],
      rightCars: [0xf1eece, 0xe6e2b1, 0xdfd98a],
      sticks: 0xf1eece
    }
  },
  four: {
    onSpeedUp: () => {},
    onSlowDown: () => {},
    distortion: 'LongRaceDistortion',
    length: 400,
    roadWidth: 10,
    islandWidth: 5,
    lanesPerRoad: 2,
    fov: 90,
    fovSpeedUp: 150,
    speedUp: 2,
    carLightsFade: 0.4,
    totalSideLightSticks: 50,
    lightPairsPerRoadWay: 70,
    shoulderLinesWidthPercentage: 0.05,
    brokenLinesWidthPercentage: 0.1,
    brokenLinesLengthPercentage: 0.5,
    lightStickWidth: [0.12, 0.5],
    lightStickHeight: [1.3, 1.7],
    movingAwaySpeed: [60, 80],
    movingCloserSpeed: [-120, -160],
    carLightsLength: [400 * 0.05, 400 * 0.15],
    carLightsRadius: [0.05, 0.14],
    carWidthPercentage: [0.3, 0.5],
    carShiftX: [-0.2, 0.2],
    carFloorSeparation: [0.05, 1],
    colors: {
      roadColor: 0x080808,
      islandColor: 0x0a0a0a,
      background: 0x000000,
      shoulderLines: 0x131318,
      brokenLines: 0x131318,
      leftCars: [0xff5f73, 0xe74d60, 0xff102a],
      rightCars: [0xa4e3e6, 0x80d1d4, 0x53c2c6],
      sticks: 0xa4e3e6
    }
  },
  five: {
    onSpeedUp: () => {},
    onSlowDown: () => {},
    distortion: 'turbulentDistortion',
    length: 400,
    roadWidth: 9,
    islandWidth: 2,
    lanesPerRoad: 3,
    fov: 90,
    fovSpeedUp: 150,
    speedUp: 2,
    carLightsFade: 0.4,
    totalSideLightSticks: 50,
    lightPairsPerRoadWay: 50,
    shoulderLinesWidthPercentage: 0.05,
    brokenLinesWidthPercentage: 0.1,
    brokenLinesLengthPercentage: 0.5,
    lightStickWidth: [0.12, 0.5],
    lightStickHeight: [1.3, 1.7],
    movingAwaySpeed: [60, 80],
    movingCloserSpeed: [-120, -160],
    carLightsLength: [400 * 0.05, 400 * 0.15],
    carLightsRadius: [0.05, 0.14],
    carWidthPercentage: [0.3, 0.5],
    carShiftX: [-0.2, 0.2],
    carFloorSeparation: [0.05, 1],
    colors: {
      roadColor: 0x080808,
      islandColor: 0x0a0a0a,
      background: 0x000000,
      shoulderLines: 0x131318,
      brokenLines: 0x131318,
      leftCars: [0xdc5b20, 0xdca320, 0xdc2020],
      rightCars: [0x334bf7, 0xe5e6ed, 0xbfc6f3],
      sticks: 0xc5e8eb
    }
  },
  six: {
    onSpeedUp: () => {},
    onSlowDown: () => {},
    distortion: 'deepDistortion',
    length: 400,
    roadWidth: 18,
    islandWidth: 2,
    lanesPerRoad: 3,
    fov: 90,
    fovSpeedUp: 150,
    speedUp: 2,
    carLightsFade: 0.4,
    totalSideLightSticks: 50,
    lightPairsPerRoadWay: 50,
    shoulderLinesWidthPercentage: 0.05,
    brokenLinesWidthPercentage: 0.1,
    brokenLinesLengthPercentage: 0.5,
    lightStickWidth: [0.12, 0.5],
    lightStickHeight: [1.3, 1.7],
    movingAwaySpeed: [60, 80],
    movingCloserSpeed: [-120, -160],
    carLightsLength: [400 * 0.05, 400 * 0.15],
    carLightsRadius: [0.05, 0.14],
    carWidthPercentage: [0.3, 0.5],
    carShiftX: [-0.2, 0.2],
    carFloorSeparation: [0.05, 1],
    colors: {
      roadColor: 0x080808,
      islandColor: 0x0a0a0a,
      background: 0x000000,
      shoulderLines: 0x131318,
      brokenLines: 0x131318,
      leftCars: [0xff322f, 0xa33010, 0xa81508],
      rightCars: [0xfdfdf0, 0xf3dea0, 0xe2bb88],
      sticks: 0xfdfdf0
    }
  }
};

interface HyperspeedProps {
  preset?: keyof typeof hyperspeedPresets;
  opacity?: number;
}

export default function Hyperspeed({ 
  preset = 'one',
  opacity = 0.15
}: HyperspeedProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const width = container.clientWidth;
    const height = container.clientHeight;
    canvas.width = width;
    canvas.height = height;

    const presetConfig = hyperspeedPresets[preset];
    let time = 0;
    let isAnimating = true;

    const animate = () => {
      if (!isAnimating) return;

      ctx.clearRect(0, 0, width, height);
      ctx.globalAlpha = opacity;

      // Draw road perspective
      ctx.strokeStyle = `rgb(${(presetConfig.colors.roadColor >> 16) & 255}, ${(presetConfig.colors.roadColor >> 8) & 255}, ${presetConfig.colors.roadColor & 255})`;
      ctx.lineWidth = 2;

      // Draw speed lines
      const speed = 5 + Math.sin(time * 0.01) * 2;
      for (let i = 0; i < 20; i++) {
        const y = ((i * presetConfig.length) / 20 - (time * speed) % presetConfig.length) * (height / presetConfig.length);
        const scale = y / height;
        const lineWidth = presetConfig.roadWidth * width / 20 * scale;

        ctx.beginPath();
        ctx.moveTo(width / 2 - lineWidth / 2, y);
        ctx.lineTo(width / 2 + lineWidth / 2, y);
        ctx.stroke();
      }

      // Draw light sticks
      ctx.fillStyle = `rgb(${(presetConfig.colors.sticks >> 16) & 255}, ${(presetConfig.colors.sticks >> 8) & 255}, ${presetConfig.colors.sticks & 255})`;
      
      for (let i = 0; i < presetConfig.totalSideLightSticks; i++) {
        const stickY = ((i * presetConfig.length) / presetConfig.totalSideLightSticks - (time * speed) % presetConfig.length) * (height / presetConfig.length);
        const scale = stickY / height;

        if (scale > 0 && scale < 1) {
          const leftX = width / 2 - presetConfig.roadWidth * width / 20 * scale - 10;
          const rightX = width / 2 + presetConfig.roadWidth * width / 20 * scale + 10;
          const stickHeight = 5 * scale;

          ctx.fillRect(leftX, stickY, 3, stickHeight);
          ctx.fillRect(rightX, stickY, 3, stickHeight);
        }
      }

      ctx.globalAlpha = 1.0;
      time += 1;
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      isAnimating = false;
    };
  }, [preset, opacity]);

  return (
    <div ref={containerRef} className="w-full h-full">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
        style={{ display: 'block' }}
      />
    </div>
  );
}
