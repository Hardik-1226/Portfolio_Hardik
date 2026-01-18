import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";
import { slugify } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function ProjectsSection() {
  const getImage = (id: string) => {
    return PlaceHolderImages.find(img => img.id === id);
  }

  return (
    <section id="projects" className="py-24 sm:py-32 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl sm:text-5xl tracking-tight">Featured Projects</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            A selection of projects where I've turned ideas into reality.
          </p>
        </div>
        <div className="space-y-28">
          {projects.map((project, index) => {
            const projectImage = getImage(project.image);
            const slug = slugify(project.title);
            const isEven = index % 2 === 0;

            return (
              <div key={project.title} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                <div className={`relative aspect-video rounded-lg overflow-hidden border-2 p-4 bg-background shadow-lg ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  {projectImage && (
                    <Image
                      src={projectImage.imageUrl}
                      alt={project.title}
                      width={1280}
                      height={720}
                      className="object-cover w-full h-full rounded-md"
                      data-ai-hint={projectImage.imageHint}
                    />
                  )}
                </div>
                <div className={`space-y-4 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="w-12 h-12 bg-secondary text-secondary-foreground flex items-center justify-center rounded-full font-headline font-bold text-xl mb-4">
                    {project.logo}
                  </div>
                  <h3 className="font-headline text-3xl tracking-tight">{project.title}</h3>
                  <h4 className="font-headline text-xl text-muted-foreground">{project.subtitle}</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                  <p className="text-muted-foreground pt-2">{project.description}</p>
                  <Button asChild className="rounded-full mt-4">
                    <Link href={`/projects/${slug}`}>
                      View Case Study <ArrowRight className="ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}