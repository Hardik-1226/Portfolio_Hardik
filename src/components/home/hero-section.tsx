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
                <h1 className="font-headline font-black text-5xl sm:text-6xl md:text-7xl tracking-tight">
                  <MaskedHeading
                    text="Hey, I'm Hardik."
                    mediaType="gradient"
                    gradient="linear-gradient(135deg, #ffffff 0%, #f8fafc 45%, #e2e8f0 70%, #c084fc 100%)"
                    className="font-headline font-black text-5xl sm:text-6xl md:text-7xl text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]"
                    trigger="mount"
                  />
                </h1>
              </div>
              <div className="flex justify-center my-3">
                <StrokeText
                  text="GRADUATE ENGINEER & DEVELOPER"
                  fontSize={26}
                  strokeColor="#c084fc"
                  fillColor="#f8fafc"
                  strokeWidth={1.3}
                  drawDuration={1.5}
                  trigger="mount"
                  fillMode="wipe"
                  letterSpacing={2}
                />
              </div>
              <div>Graduate Engineer Trainee at Coforge</div>
              <div className="text-xl sm:text-2xl text-slate-200 font-normal">
                Full-Stack Developer specializing in React.js, FastAPI & Java, with hands-on experience in building scalable marketplaces, legal automation, and test frameworks to{' '}
                <HoverableText
                  imageUrl="data:image/png;base64,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"
                  imageHint="inspiration lightbulb"
                  className="font-headline font-bold text-3xl text-white"
                >
                  inspire
                </HoverableText>{' '}
                and deliver real-world impact.
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 relative w-full h-[520px] sm:h-[600px] overflow-hidden rounded-3xl [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_98%)] shadow-2xl">
            {/* Soft border and inner vignette glow */}
            <div className="absolute inset-0 pointer-events-none rounded-3xl border border-white/10 [mask-image:radial-gradient(ellipse_at_center,transparent_40%,black_100%)] z-10" />
            <div className="absolute inset-0 pointer-events-none rounded-3xl [box-shadow:inset_0_0_50px_25px_#060010] z-10" />
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
              overlayColor="#060010"
            />
          </div>
        </div>

        {/* Curved Loop Text with Bulletpoints on Home / Hero Page */}
        <div className="mt-14 sm:mt-20 overflow-visible">
          <CurvedLoop
            marqueeText="✦ GRADUATE ENGINEER TRAINEE AT COFORGE ✦ B.TECH CSE (AIML) ✦ FULL-STACK DEVELOPER ✦ REACT.JS & FASTAPI ✦ TEST AUTOMATION ✦ SELENIUM & JMETER ✦ MONGODB ATLAS ✦ 300+ LEETCODE ✦"
            speed={2.2}
            curveAmount={140}
            className="fill-purple-300 tracking-widest text-3xl sm:text-4xl drop-shadow-[0_2px_10px_rgba(192,132,252,0.5)]"
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
