import { Interactive3D } from "@/components/common/interactive-3d";

export function HeroSection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
          <div className="lg:col-span-3 space-y-6 text-center lg:text-left">
            <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl tracking-tight">
              Hey, how’s it going? I’m Hardik.
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground font-headline">
              B.Tech Student & Web Developer.
            </p>
            <p className="text-xl sm:text-2xl text-muted-foreground/90">
              Building modern, scalable digital products that actually solve problems.
            </p>
            <p className="max-w-xl mx-auto lg:mx-0 text-lg text-muted-foreground/80">
              Passionate about full-stack development, UI engineering, and practical AI integration. Always learning. Always shipping.
            </p>
          </div>
          <div className="lg:col-span-2 relative h-80 w-80 lg:h-96 lg:w-96 mx-auto">
            <Interactive3D />
          </div>
        </div>
      </div>
    </section>
  );
}
