import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { slugify } from "@/lib/utils";

export function ProjectsSection() {
  const getImage = (id: string) => {
    return PlaceHolderImages.find(img => img.id === id);
  }

  return (
    <section id="projects" className="py-24 sm:py-32 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl sm:text-5xl tracking-tight">My Work</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-center">A selection of projects I've built, showcasing my skills in web development and problem-solving.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => {
            const projectImage = getImage(project.image);
            const slug = slugify(project.title);
            return (
              <Link href={`/projects/${slug}`} key={project.title} className="block group">
                <Card className="flex flex-col h-full overflow-hidden transform group-hover:-translate-y-2 transition-all duration-300 ease-in-out shadow-lg hover:shadow-2xl border-2 border-transparent group-hover:border-primary">
                  {projectImage && (
                    <div className="aspect-video overflow-hidden">
                      <Image
                        src={projectImage.imageUrl}
                        alt={project.title}
                        width={600}
                        height={400}
                        className="object-cover w-full h-full"
                        data-ai-hint={projectImage.imageHint}
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="font-headline text-2xl">{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col">
                    <CardDescription className="flex-grow">{project.description}</CardDescription>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
