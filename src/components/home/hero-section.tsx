import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { HoverableText } from "@/components/common/hoverable-text";

export function HeroSection() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-image');
  const hardikPortraitImage = PlaceHolderImages.find(img => img.id === 'hardik-portrait');

  return (
    <section className="py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
          <div className="lg:col-span-3">
            <div className="font-body text-2xl sm:text-3xl md:text-4xl tracking-tight leading-snug text-center space-y-4">
              <div>
                Hey, how's it going? I'm{' '}
                <HoverableText
                  imageUrl={hardikPortraitImage?.imageUrl || "https://picsum.photos/seed/portrait/200/200"}
                  imageHint={hardikPortraitImage?.imageHint || "portrait person"}
                  className="font-headline font-bold text-4xl sm:text-5xl md:text-6xl"
                >
                  Hardik
                </HoverableText>
                .
              </div>
              <div>
                A{' '}
                <HoverableText
                  imageUrl="https://picsum.photos/seed/student/200/200"
                  imageHint="student technology"
                  className="font-headline font-bold text-3xl"
                >
                  student
                </HoverableText>{' '}
                and{' '}
                <HoverableText
                  imageUrl="https://picsum.photos/seed/developer/200/200"
                  imageHint="code editor"
                  className="font-headline font-bold text-3xl"
                >
                  developer
                </HoverableText>
                .
              </div>
              <div>Hoping to build meaningful products</div>
              <div>
                that help and{' '}
                <HoverableText
                  imageUrl="https://picsum.photos/seed/inspire/200/200"
                  imageHint="inspiration lightbulb"
                  className="font-headline font-bold text-3xl"
                >
                  inspire
                </HoverableText>{' '}
                others.
              </div>
            </div>
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
