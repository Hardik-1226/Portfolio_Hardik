import { timeline } from "@/lib/data";
import { ScrollAnimation } from "@/components/common/scroll-animation";
import { HoverableText } from "../common/hoverable-text";

export function TimelineSection() {
  return (
    <section id="timeline" className="py-32 sm:py-40">
      <div className="container mx-auto px-4">
        <div className="text-left mb-24">
          <ScrollAnimation>
            <h2 className="font-headline text-4xl sm:text-5xl tracking-tight">My Journey</h2>
            <div className="mt-4 text-2xl text-muted-foreground max-w-2xl">
              A timeline of my key <HoverableText imageUrl="https://picsum.photos/seed/milestones/200/200" imageHint="stone path" className="font-headline font-bold text-3xl">milestones</HoverableText> and <HoverableText imageUrl="https://picsum.photos/seed/experiences/200/200" imageHint="personal journey" className="font-headline font-bold text-3xl">experiences</HoverableText> in the world of tech.
            </div>
          </ScrollAnimation>
        </div>
        <div className="relative max-w-5xl mx-auto">
          <div className="absolute top-0 h-full w-0.5 bg-border left-4 md:left-1/2 md:-translate-x-1/2" aria-hidden="true"></div>
          <ul className="space-y-24">
            {timeline.map((item, index) => {
              return (
                <li key={index} className="relative">
                  <div className="absolute top-1 left-4 w-5 h-5 bg-primary rounded-full -translate-x-1/2 border-4 border-background md:left-1/2"></div>
                  <div className="md:grid md:grid-cols-2 md:gap-x-16 items-center">
                    <ScrollAnimation
                      as="div"
                      delay={100}
                      className="pl-12 md:pl-0 md:text-right"
                    >
                      <div className="flex justify-end items-center gap-8">
                        <p className="font-body font-extrabold text-9xl sm:text-[10rem] text-black leading-none">
                          {(index + 1).toString().padStart(2, '0')}.
                        </p>
                      </div>
                    </ScrollAnimation>

                    <ScrollAnimation
                      as="div"
                      delay={200}
                      className="pl-12 md:pl-0 mt-8 md:mt-0"
                    >
                      <h4 className="font-body text-4xl sm:text-5xl font-bold">{item.title}</h4>
                      <p className="text-xl text-muted-foreground mt-4">{item.description}</p>
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
