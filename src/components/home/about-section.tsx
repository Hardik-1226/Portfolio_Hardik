import { skills } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

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
          </div>
          <div className="space-y-8">
            <h3 className="font-headline text-3xl tracking-tight text-center lg:text-left">My Skillset</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
              {Object.entries(skills).map(([category, skillList]) => (
                <Card key={category} className="shadow-sm bg-card/80">
                  <CardHeader>
                    <CardTitle className="font-headline text-xl">{category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {skillList.map((skill) => (
                        <li key={skill} className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-accent" />
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
              {aboutImage && Object.keys(skills).length % 2 !== 0 && (
                <div className="hidden sm:flex justify-center items-center p-4">
                  <div className="relative w-full aspect-square rounded-lg overflow-hidden">
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
          </div>
        </div>
      </div>
    </section>
  );
}
