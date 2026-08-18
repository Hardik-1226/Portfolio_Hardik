import { certifications } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ScrollAnimation } from "@/components/common/scroll-animation";
import { StrokeText } from "@/components/common/StrokeText";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export function CertificationsSection() {
    const getImage = (id: string) => {
        return PlaceHolderImages.find(img => img.id === id);
    }

  return (
    <section id="certifications" className="py-24 sm:py-32 bg-transparent text-white relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 relative space-y-3">
          <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
            <span className="text-[14vw] font-headline text-center font-bold text-white/[0.04] uppercase tracking-widest select-none">
                CERTIFY
            </span>
          </div>
          <ScrollAnimation className="relative z-10 space-y-3">
            <div className="flex justify-center my-2">
              <StrokeText
                text="MY CERTIFICATIONS"
                fontSize={56}
                strokeColor="#a1a1aa"
                fillColor="#ffffff"
                strokeWidth={1.8}
                drawDuration={1.8}
                trigger="scroll"
                fillMode="wipe"
                letterSpacing={3}
              />
            </div>
            <div className="mt-4 text-lg sm:text-xl text-zinc-300 font-normal max-w-2xl mx-auto">
              Industry credentials and verified proficiencies in Generative AI, cloud, and test automation.
            </div>
          </ScrollAnimation>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => {
            const certImage = getImage(cert.image);
            return (
              <ScrollAnimation key={cert.title} delay={index * 150}>
                <Card className="overflow-hidden h-full flex flex-col group bg-zinc-900/60 backdrop-blur-md border border-white/10 text-white hover:border-white/30 transition-all rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
                  {certImage && (
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={certImage.imageUrl}
                        alt={cert.title}
                        fill
                        className="object-cover grayscale hover:grayscale-0 transition-transform duration-500 group-hover:scale-105"
                        data-ai-hint={certImage.imageHint}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-white font-headline font-bold text-xl uppercase tracking-wide">{cert.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="outline" className="border-white/20 bg-white/5 text-zinc-300 font-mono text-xs uppercase">{cert.issuer}</Badge>
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

export default CertificationsSection;
