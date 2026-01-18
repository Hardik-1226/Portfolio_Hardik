import { skills } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Code2, Server, GitMerge, BrainCircuit, Boxes } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ScrollAnimation } from "../common/scroll-animation";

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
    <section id="about" className="py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-6 text-center lg:text-left">
            <h2 className="font-headline text-4xl sm:text-5xl tracking-tight">About Me</h2>
            <div className="space-y-4 text-lg text-muted-foreground text-justify">
              <p>
                I’m a B.Tech student who loves building clean interfaces, scalable systems, and practical tools that help people.
              </p>
              <p>
                I enjoy experimenting with modern web stacks, shipping fast, and continuously improving my craft. My passion lies at the intersection of design, technology, and user experience.
              </p>
            </div>
            {aboutImage && (
              <div className="pt-8 flex justify-center lg:justify-start">
                <div className="relative w-full max-w-sm aspect-square rounded-lg overflow-hidden border">
                  <Image 
                    src={aboutImage.imageUrl} 
                    alt={aboutImage.description} 
                    fill 
                    className="object-cover" 
                    data-ai-hint={aboutImage.imageHint}
                    sizes="(max-width: 640px) 100vw, 50vw"
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
