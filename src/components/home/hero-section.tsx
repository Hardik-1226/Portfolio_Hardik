import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { HoverableText } from "@/components/common/hoverable-text";

export function HeroSection() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-image');

  return (
    <section className="py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
          <div className="lg:col-span-3 space-y-6 text-center lg:text-left">
            <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl tracking-tight">
              Hey, how’s it going? I’m <HoverableText imageUrl="https://picsum.photos/seed/hardik/200/200" imageHint="portrait person">Hardik.</HoverableText>
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground font-headline">
              <HoverableText imageUrl="https://picsum.photos/seed/student/200/200" imageHint="student technology">B.Tech Student</HoverableText> & <HoverableText imageUrl="https://picsum.photos/seed/developer/200/200" imageHint="code editor">Web Developer.</HoverableText>
            </p>
            <p className="text-xl sm:text-2xl text-muted-foreground/90">
              Building modern, scalable digital products that actually solve problems.
            </p>
            <p className="max-w-xl mx-auto lg:mx-0 text-lg text-muted-foreground/80">
              Passionate about full-stack development, UI engineering, and practical AI integration. Always learning. Always shipping.
            </p>
          </div>
          <div className="lg:col-span-2 relative h-80 w-80 lg:h-96 lg:w-96 mx-auto">
            {heroImage && (
              <Image 
                src={heroImage.imageUrl}
                alt={heroImage.description}
                width={600}
                height={600}
                className="rounded-lg object-cover w-full h-full"
                data-ai-hint={heroImage.imageHint}
                priority
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
