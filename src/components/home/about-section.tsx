import { skills } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Code2, Server, GitMerge, BrainCircuit, Boxes } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ScrollAnimation } from "../common/scroll-animation";
import { HoverableText } from "../common/hoverable-text";
import { Typewriter } from "../common/typewriter";
import Grainient from "../common/Grainient";

const categoryIcons: { [key: string]: React.ReactNode } = {
  "Frontend": <Code2 className="h-6 w-6 text-accent" />,
  "Backend": <Server className="h-6 w-6 text-accent" />,
  "Tools": <GitMerge className="h-6 w-6 text-accent" />,
  "AI": <BrainCircuit className="h-6 w-6 text-accent" />,
  "Other": <Boxes className="h-6 w-6 text-accent" />,
};

export function AboutSection() {
  const aboutImage = PlaceHolderImages.find(img => img.id === 'about-visual');

  return (
    <section id="about" className="py-24 sm:py-32 bg-[#708090] relative">
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.4 }}>
        <Grainient 
          timeSpeed={0.15}
          colorBalance={0.1}
          warpStrength={0.8}
          warpFrequency={4.0}
          warpSpeed={1.5}
          warpAmplitude={40.0}
          blendAngle={45.0}
          blendSoftness={0.1}
          rotationAmount={400.0}
          noiseScale={1.5}
          grainAmount={0.08}
          grainScale={2.5}
          grainAnimated={true}
          contrast={1.3}
          gamma={1.0}
          saturation={1.1}
          centerX={0.0}
          centerY={0.0}
          zoom={0.8}
          color1="#FF9FFC"
          color2="#5227FF"
          color3="#B19EEF"
        />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
            <span className="text-[13vw] font-headline font-extrabold text-white/10 select-none">
              ABOUT
            </span>
          </div>
          <ScrollAnimation className="relative z-10">
            <h1 className="font-headline text-8xl sm:text-6xl tracking-tight font-bold text-white">About Me</h1>
          </ScrollAnimation>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-6 text-center lg:text-left">
            <div className="space-y-5 text-2xl font-serif font-light text-white text-pretty">
              <Typewriter>
                    I'm a B.Tech student who loves building clean <HoverableText
                  imageUrl="https://picsum.photos/seed/interfaces/200/200"
                  imageHint="clean interface"
                  className="font-headline font-bold text-3xl"
                >
                  interfaces
                </HoverableText>, scalable <HoverableText
                  imageUrl="https://picsum.photos/seed/systems/200/200"
                  imageHint="scalable systems"
                  className="font-headline font-bold text-3xl"
                >
                  systems
                </HoverableText>, and practical <HoverableText
                  imageUrl="https://picsum.photos/seed/tools/200/200"
                  imageHint="practical tools"
                  className="font-headline font-bold text-3xl"
                >
                  tools
                </HoverableText> that help people.
              </Typewriter>
              <Typewriter>
                  I enjoy experimenting with modern web stacks, shipping fast, and continuously improving my craft. My passion lies at the intersection of design, technology, and user experience.
              </Typewriter>
            </div>
            {aboutImage && (
              <div className="pt-8 flex justify-center lg:justify-start">
                <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md aspect-square rounded-lg overflow-hidden border">
                  <Image 
                    src={aboutImage.imageUrl} 
                    alt={aboutImage.description} 
                    fill 
                    className="object-cover" 
                    data-ai-hint={aboutImage.imageHint}
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  />
                </div>
              </div>
            )}
          </div>
          <div className="space-y-8">
            <h3 className="font-headline text-3xl tracking-tight text-center lg:text-left">My Skillset</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
              {Object.entries(skills).map(([category, skillList], index) => (
                <ScrollAnimation key={category} delay={index * 150}>
                  <Card className="h-full bg-card/60 backdrop-blur-sm border-border/50 transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1.5 hover:border-primary">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-4 font-headline text-xl">
                        {categoryIcons[category] || <CheckCircle2 className="h-6 w-6 text-accent" />}
                        <span>{category}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 pt-2">
                        {skillList.map((skill) => (
                          <li key={skill} className="flex items-center gap-3">
                            <CheckCircle2 className="h-4 w-4 text-chart-2 shrink-0" />
                            <span className="text-muted-foreground">{skill}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
