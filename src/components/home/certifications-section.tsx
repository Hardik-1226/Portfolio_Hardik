import { certifications } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ScrollAnimation } from "@/components/common/scroll-animation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { HoverableText } from "../common/hoverable-text";
import Grainient from "../common/Grainient";

export function CertificationsSection() {
    const getImage = (id: string) => {
        return PlaceHolderImages.find(img => img.id === id);
    }

  return (
    <section id="certifications" className="py-24 sm:py-32 bg-[#EEEAE5] relative">
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.3 }}>
        <Grainient 
          timeSpeed={0.15}
          colorBalance={0.2}
          warpStrength={0.6}
          warpFrequency={4.0}
          warpSpeed={1.5}
          warpAmplitude={40.0}
          blendAngle={45.0}
          blendSoftness={0.2}
          rotationAmount={400.0}
          noiseScale={1.5}
          grainAmount={0.05}
          grainScale={2.5}
          grainAnimated={true}
          contrast={1.15}
          gamma={1.05}
          saturation={0.95}
          centerX={0.0}
          centerY={0.0}
          zoom={0.8}
          color1="#FFD4F5"
          color2="#A6C8FF"
          color3="#E6D9FF"
        />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
            <span className="text-[15vw] font-headline text-center font-extra-bold text-black/10 select-none">
                CERTIFY
            </span>
          </div>
          <ScrollAnimation className="relative z-10">
            <h2 className="font-headline text-4xl sm:text-5xl tracking-tight font-bold text-foreground">My Certifications</h2>
            <div className="mt-4 text-2xl text-muted-foreground max-w-2xl mx-auto">
              A testament to my commitment to continuous <HoverableText imageUrl="https://picsum.photos/seed/learning/200/200" imageHint="books study" className="font-headline font-bold text-3xl">learning</HoverableText> and skill <HoverableText imageUrl="https://picsum.photos/seed/development/200/200" imageHint="growing plant" className="font-headline font-bold text-3xl">development</HoverableText>.
            </div>
          </ScrollAnimation>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => {
            const certImage = getImage(cert.image);
            return (
              <ScrollAnimation key={cert.title} delay={index * 150}>
                <Card className="overflow-hidden h-full flex flex-col group">
                  {certImage && (
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={certImage.imageUrl}
                        alt={cert.title}
                        fill
                        className="object-cover bg-[#FAF3E0] transition-transform duration-500 group-hover:scale-105"
                        data-ai-hint={certImage.imageHint}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{cert.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="secondary">{cert.issuer}</Badge>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            );
          })}
        </div>
      </div>
    </section>
  );
}
