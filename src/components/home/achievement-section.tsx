import { achievements } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ScrollAnimation } from "@/components/common/scroll-animation";
import { StrokeText } from "@/components/common/StrokeText";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Award, BookOpen, Mic } from "lucide-react";

const achievementIcons: { [key: string]: React.ReactNode } = {
    "hackathon": <Award className="h-6 w-6 text-white" />,
    "academic": <BookOpen className="h-6 w-6 text-white" />,
    "publication": <Mic className="h-6 w-6 text-white" />,
};

export function AchievementSection() {
    const getImage = (id: string) => {
        return PlaceHolderImages.find(img => img.id === id);
    }

  return (
    <section id="achievements" className="py-24 sm:py-32 bg-transparent text-white relative overflow-hidden">
      <div className="container mx-auto px-4 text-white relative z-10">
        <div className="text-center text-white mb-16 relative space-y-3">
          <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
            <span className="text-[14vw] font-headline font-bold text-white/[0.04] uppercase tracking-widest select-none">
              ACHIEVE
            </span>
          </div>
          <ScrollAnimation className="relative z-10 space-y-3">
            <div className="flex justify-center my-2">
              <StrokeText
                text="MY ACHIEVEMENTS"
                fontSize={56}
                strokeColor="#e2e8f0"
                fillColor="#ffffff"
                strokeWidth={2.0}
                drawDuration={1.8}
                trigger="scroll"
                fillMode="wipe"
                letterSpacing={3}
              />
            </div>
            <p className="mt-4 text-lg sm:text-xl text-slate-300 font-medium max-w-2xl mx-auto">
              National hackathons, competitive problem-solving milestones, and community impact.
            </p>
          </ScrollAnimation>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((ach, index) => {
            const achImage = getImage(ach.image);
            const icon = achievementIcons[ach.icon] || <Award className="h-6 w-6 text-white" />;

            return (
              <ScrollAnimation key={ach.title} delay={index * 150}>
                <Card className="overflow-hidden h-full flex flex-col group bg-zinc-900/60 backdrop-blur-md border border-white/10 text-white hover:border-white/30 transition-all rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
                  {achImage && (
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={achImage.imageUrl}
                        alt={ach.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        data-ai-hint={achImage.imageHint}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-white/10 rounded-xl text-white border border-white/15">
                            {icon}
                        </div>
                        <div>
                            <CardTitle className="font-headline font-bold text-xl uppercase tracking-wider text-white">{ach.title}</CardTitle>
                        </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">{ach.description}</p>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default AchievementSection;
