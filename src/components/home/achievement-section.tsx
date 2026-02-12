import { achievements } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ScrollAnimation } from "@/components/common/scroll-animation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";
import { Award, BookOpen, Mic } from "lucide-react";
import Lightning from "../common/Lightning";

const achievementIcons: { [key: string]: React.ReactNode } = {
    "hackathon": <Award className="h-8 w-8 text-primary" />,
    "academic": <BookOpen className="h-8 w-8 text-primary" />,
    "publication": <Mic className="h-8 w-8 text-primary" />,
};

export function AchievementSection() {
    const getImage = (id: string) => {
        return PlaceHolderImages.find(img => img.id === id);
    }

  return (
    <section id="achievements" className="py-24 sm:py-32 bg-[#f8feff] relative overflow-hidden">
      {/* Lightning Background */}
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.3 }}>
        <Lightning 
          hue={230}
          xOffset={0}
          speed={1.0}
          intensity={0.8}
          size={1.5}
        />
      </div>
      <div className="container mx-auto px-4 text-white relative z-10">
        <div className="text-center text-white mb-16 relative">
          <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
            <span className="text-[15vw] font-headline font-extrabold text-white/10 select-none">
              ACHIEVE
            </span>
          </div>
          <ScrollAnimation className="relative z-10">
            <h2 className="font-headline text-4xl sm:text-5xl tracking-tight font-bold text-foreground">My Achievements</h2>
            <p className="mt-4 text-2xl text-muted-foreground max-w-2xl mx-auto">
              A few of the milestones I'm proud of.
            </p>
          </ScrollAnimation>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((ach, index) => {
            const achImage = getImage(ach.image);
            const icon = achievementIcons[ach.icon] || <Award className="h-8 w-8 text-primary" />;
            return (
              <ScrollAnimation key={ach.title} delay={index * 150}>
                <Card className="overflow-hidden h-full flex flex-col group bg-background/80 backdrop-blur-sm border-border/50">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                        {icon}
                        <CardTitle>{ach.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col">
                    <p className="text-muted-foreground flex-grow">{ach.description}</p>
                    {achImage && (
                      <div className="relative aspect-video mt-4 rounded-md overflow-hidden">
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
