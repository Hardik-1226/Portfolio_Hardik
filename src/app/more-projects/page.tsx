import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import RotatingText from "@/components/common/RotatingText";
import { StrokeText } from "@/components/common/StrokeText";
import { MaskedHeading } from "@/components/common/MaskedHeading";

export default function MoreProjectsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#040108] text-white">
      <Header />
      <main className="flex-grow container mx-auto px-4 pt-32 sm:pt-40 pb-16 sm:pb-24 flex flex-col items-center justify-center text-center">
        <div className="flex justify-center mb-3">
          <StrokeText
            text="PROJECT ARCHIVE"
            fontSize={16}
            strokeColor="#c084fc"
            fillColor="#f8fafc"
            strokeWidth={1.2}
            trigger="mount"
            fillMode="wipe"
            letterSpacing={2}
          />
        </div>
        <MaskedHeading
          text="More Projects"
          mediaType="gradient"
          gradient="linear-gradient(135deg, #ffffff 0%, #f8fafc 45%, #e2e8f0 70%, #c084fc 100%)"
          className="font-headline text-4xl sm:text-5xl md:text-6xl tracking-tight mb-4 text-white font-extrabold"
        />
        <div className="mb-6">
          <RotatingText
            texts={['Innovative Solutions', 'Creative Designs', 'Technical Excellence', 'Coming Soon!']}
            mainClassName="px-3 sm:px-4 md:px-5 bg-gradient-to-r from-purple-500 to-pink-500 text-white overflow-hidden py-1 sm:py-2 md:py-3 justify-center rounded-lg font-semibold text-lg sm:text-xl"
            staggerFrom="last"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2500}
          />
        </div>
        <p className="text-xl text-slate-300 mb-8 max-w-lg">
          More exciting projects and experiments are coming soon. Stay tuned!
        </p>
        <Button asChild variant="outline" className="border-white/20 bg-white/5 hover:bg-white/10 text-white rounded-full">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </main>
      <Footer />
    </div>
  );
}
