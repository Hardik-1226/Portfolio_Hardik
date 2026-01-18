import { timeline } from "@/lib/data";
import { ScrollAnimation } from "@/components/common/scroll-animation";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function TimelineSection() {
  const getImage = (id: string | undefined) => {
    if (!id) return undefined;
    return PlaceHolderImages.find(img => img.id === id);
  }

  return (
    <section id="timeline" className="py-32 sm:py-40 bg-sky-100/50 dark:bg-sky-950/25">
      <div className="container mx-auto px-4">
        <div className="text-center mb-24">
          <ScrollAnimation>
            <h2 className="font-headline text-4xl sm:text-5xl tracking-tight">My Journey</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              A timeline of my key milestones and experiences in the world of tech.
            </p>
          </ScrollAnimation>
        </div>
        <div className="relative max-w-5xl mx-auto">
          <div className="absolute top-0 h-full w-0.5 bg-border left-4 md:left-1/2 md:-translate-x-1/2" aria-hidden="true"></div>
          <ul className="space-y-32">
            {timeline.map((item, index) => {
              const timelineImage = getImage(item.image);
              const isEven = index % 2 === 0;

              return (
                <li key={index} className="relative">
                  <div className="absolute top-1 left-4 w-5 h-5 bg-primary rounded-full -translate-x-1/2 border-4 border-background md:left-1/2"></div>
                  <div className={cn("md:grid md:grid-cols-5 md:gap-8 items-center")}>
                    <ScrollAnimation
                      as="div"
                      delay={100}
                      className={cn("pl-12 md:pl-0 col-span-2", isEven ? 'md:order-1 md:text-right' : 'md:order-3 md:text-left')}
                    >
                      <p className="font-headline text-8xl text-primary/80 mb-2">{item.year}</p>
                      <h4 className="font-headline text-3xl mt-1 mb-2">{item.title}</h4>
                      <p className="text-muted-foreground text-lg">{item.description}</p>
                    </ScrollAnimation>
                    
                    <div className="hidden md:block col-span-1"></div>

                    <ScrollAnimation
                      as="div"
                      delay={200}
                      className={cn("flex justify-center mt-8 md:mt-0 col-span-2", isEven ? 'md:order-2' : 'md:order-1')}
                    >
                      {timelineImage && (
                        <div className="relative w-64 h-64 md:w-80 md:h-80">
                            <Image
                              src={timelineImage.imageUrl}
                              alt={item.title}
                              fill
                              className="object-cover rounded-full shadow-lg"
                              data-ai-hint={timelineImage.imageHint}
                              sizes="(max-width: 768px) 16rem, 20rem"
                            />
                        </div>
                      )}
                    </ScrollAnimation>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
