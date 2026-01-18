import { timeline } from "@/lib/data";
import { ScrollAnimation } from "@/components/common/scroll-animation";

export function TimelineSection() {
  return (
    <section id="timeline" className="py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <ScrollAnimation>
            <h2 className="font-headline text-4xl sm:text-5xl tracking-tight">My Journey</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              A timeline of my key milestones and experiences in the world of tech.
            </p>
          </ScrollAnimation>
        </div>
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute top-0 h-full w-0.5 bg-border left-4" aria-hidden="true"></div>
          <ul className="space-y-16">
            {timeline.map((item, index) => (
              <ScrollAnimation as="li" key={index} className="relative pl-12" delay={index * 150}>
                <div className="absolute top-1 left-4 w-5 h-5 bg-primary rounded-full -translate-x-1/2 border-4 border-background"></div>
                <p className="font-headline text-5xl text-primary mb-1">{item.year}</p>
                <h4 className="font-headline text-2xl mt-1 mb-2">{item.title}</h4>
                <p className="text-muted-foreground">{item.description}</p>
              </ScrollAnimation>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
