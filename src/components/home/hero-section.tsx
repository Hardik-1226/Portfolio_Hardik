import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { HoverableText } from "@/components/common/hoverable-text";
import { MaskedHeading } from "@/components/common/MaskedHeading";
import { StrokeText } from "@/components/common/StrokeText";
import DriftWall from "@/components/common/DriftWall";
import { CurvedLoop } from "@/components/common/CurvedLoop";

const driftItems = [
  { image: '/images/homePageImages/WhatsApp Image 2026-08-17 at 4.55.57 PM.jpeg', title: 'Engineering', href: '#projects' },
  { image: '/images/homePageImages/WhatsApp Image 2026-08-17 at 4.55.58 PM.jpeg', title: 'Innovate', href: '#projects' },
  { image: '/images/homePageImages/WhatsApp Image 2026-08-17 at 4.55.59 PM.jpeg', title: 'Build', href: '#projects' },
  { image: '/images/homePageImages/WhatsApp Image 2026-08-17 at 4.56.00 PM.jpeg', title: 'Deploy', href: '#projects' },
  { image: '/images/homePageImages/WhatsApp Image 2026-08-17 at 4.56.01 PM.jpeg', title: 'Scale', href: '#projects' },
  { image: '/images/homePageImages/WhatsApp Image 2026-08-17 at 4.56.02 PM (1).jpeg', title: 'Design', href: '#projects' },
  { image: '/images/homePageImages/WhatsApp Image 2026-08-17 at 4.56.02 PM.jpeg', title: 'Vision', href: '#projects' },
  { image: '/images/homePageImages/WhatsApp Image 2026-08-17 at 4.55.57 PM.jpeg', title: 'Code', href: '#projects' },
  { image: '/images/homePageImages/WhatsApp Image 2026-08-17 at 4.55.59 PM.jpeg', title: 'Architecture', href: '#projects' },
  { image: '/images/homePageImages/WhatsApp Image 2026-08-17 at 4.56.00 PM.jpeg', title: 'Create', href: '#projects' },
];

export function HeroSection() {
  const hardikPortraitImage = PlaceHolderImages.find(img => img.id === 'hardik-portrait');

  return (
    <section className="relative overflow-hidden pt-0 pb-20 sm:pt-4 sm:pb-24 bg-transparent min-h-screen">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
          <div className="lg:col-span-3">
            <div className="font-body text-2xl sm:text-3xl md:text-4xl tracking-tight leading-snug text-center space-y-5 text-white">
              <div className="space-y-2">
                <h1 className="font-headline font-bold text-5xl sm:text-7xl md:text-8xl tracking-tight uppercase">
                  <MaskedHeading
                    text="Hey, I'm Hardik."
                    mediaType="gradient"
                    gradient="linear-gradient(135deg, #ffffff 0%, #f4f4f5 45%, #d4d4d8 70%, #a1a1aa 100%)"
                    className="font-headline font-bold text-5xl sm:text-7xl md:text-8xl text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)] uppercase tracking-tight"
                    trigger="mount"
                  />
                </h1>
              </div>
              <div className="flex justify-center my-3">
                <StrokeText
                  text="GRADUATE ENGINEER & DEVELOPER"
                  fontSize={28}
                  strokeColor="#a1a1aa"
                  fillColor="#ffffff"
                  strokeWidth={1.3}
                  drawDuration={1.5}
                  trigger="mount"
                  fillMode="wipe"
                  letterSpacing={3}
                />
              </div>
              <div className="text-zinc-200 font-medium">Graduate Engineer Trainee at Coforge</div>
              <div className="text-lg sm:text-xl text-zinc-300 font-normal max-w-2xl mx-auto leading-relaxed">
                Full-Stack Developer specializing in React.js, FastAPI & Java, with hands-on experience in building scalable marketplaces, legal automation, and enterprise test frameworks to inspire and deliver real-world impact.
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 relative w-full h-[520px] sm:h-[600px] overflow-hidden rounded-3xl [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_98%)] shadow-2xl">
            {/* Soft border and inner vignette glow */}
            <div className="absolute inset-0 pointer-events-none rounded-3xl border border-white/10 [mask-image:radial-gradient(ellipse_at_center,transparent_40%,black_100%)] z-10" />
            <div className="absolute inset-0 pointer-events-none rounded-3xl [box-shadow:inset_0_0_50px_25px_#09090b] z-10" />
            <DriftWall
              items={driftItems}
              columns={4}
              tileWidth={190}
              tileHeight={130}
              gap={16}
              tilt={16}
              turn={-14}
              perspective={1200}
              depth={120}
              speed={42}
              direction="up"
              variance={0.45}
              parallax={0.6}
              lift={64}
              fade={0.2}
              dim={0.92}
              overlayColor="#09090b"
            />
          </div>
        </div>

        {/* Curved Loop Text with Bulletpoints on Home / Hero Page */}
        <div className="mt-14 sm:mt-20 overflow-visible">
          <CurvedLoop
            marqueeText="✦ GRADUATE ENGINEER TRAINEE AT COFORGE ✦ B.TECH CSE (AIML) ✦ FULL-STACK DEVELOPER ✦ REACT.JS & FASTAPI ✦ TEST AUTOMATION ✦ SELENIUM & JMETER ✦ MONGODB ATLAS ✦ 300+ LEETCODE ✦"
            speed={2.2}
            curveAmount={140}
            className="fill-white tracking-widest text-3xl sm:text-4xl drop-shadow-[0_2px_10px_rgba(255,255,255,0.4)]"
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
