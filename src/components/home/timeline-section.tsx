import { timeline } from "@/lib/data";
import { ScrollAnimation } from "@/components/common/scroll-animation";

export function TimelineSection() {
  return (
    <section id="timeline" className="py-32 sm:py-40 bg-sky-100 dark:bg-sky-950">
      <div className="container mx-auto px-4">
        <div className="text-left mb-24">
          <ScrollAnimation>
            <h2 className="font-headline text-4xl sm:text-5xl tracking-tight">My Journey</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
              A timeline of my key milestones and experiences in the world of tech.
            </p>
          </ScrollAnimation>
        </div>
        <div className="relative max-w-5xl mx-auto">
          <div className="absolute top-0 h-full w-0.5 bg-border left-4 md:left-1/2 md:-translate-x-1/2" aria-hidden="true"></div>
          <ul className="space-y-24">
            {timeline.map((item, index) => {
              return (
                <li key={index} className="relative">
                  <div className="absolute top-1 left-4 w-5 h-5 bg-primary rounded-full -translate-x-1/2 border-4 border-background md:left-1/2"></div>
                  <div className="md:grid md:grid-cols-2 md:gap-x-16 items-start">
                    <ScrollAnimation
                      as="div"
                      delay={100}
                      className="pl-12 md:pl-0 md:text-right"
                    >
                      <p className="font-body font-bold text-8xl sm:text-9xl text-foreground/10 leading-none">
                        {(index + 1).toString().padStart(2, '0')}.
                      </p>
                    </ScrollAnimation>

                    <ScrollAnimation
                      as="div"
                      delay={200}
                      className="pl-12 md:pl-0 mt-8 md:mt-0"
                    >
                      <h4 className="font-body text-3xl sm:text-4xl font-bold">{item.title}</h4>
                      <p className="text-muted-foreground text-lg mt-4">{item.description}</p>
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
