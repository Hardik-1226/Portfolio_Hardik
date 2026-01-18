import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { HoverableText } from "@/components/common/hoverable-text";

export function HeroSection() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-image');

  return (
    <section className="py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
          <div className="lg:col-span-3">
            <div className="font-body text-4xl sm:text-5xl md:text-6xl tracking-tight !leading-tight space-y-1 text-left">
              <div>
                I'm Hardik, a{' '}
                <HoverableText imageUrl="https://picsum.photos/seed/student/200/200" imageHint="student technology" className="font-headline">
                  student
                </HoverableText>{' '}
                and{' '}
                <HoverableText imageUrl="https://picsum.photos/seed/developer/200/200" imageHint="code editor" className="font-headline">
                  developer
                </HoverableText>
                ,
              </div>
              <div>
                building things for the web. I love to
                <br />
                <HoverableText imageUrl="https://picsum.photos/seed/inspire/200/200" imageHint="inspiration lightbulb" className="font-headline">
                  inspire
                </HoverableText>{' '}
                and create meaningful products.
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
