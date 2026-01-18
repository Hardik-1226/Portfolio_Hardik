import { skills } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-6">
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
            <h3 className="font-headline text-3xl tracking-tight">My Skillset</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
