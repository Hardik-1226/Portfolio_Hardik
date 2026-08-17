import { projects } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { slugify } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { HoverableText } from '@/components/common/hoverable-text';
import { StrokeText } from '@/components/common/StrokeText';
import { MaskedHeading } from '@/components/common/MaskedHeading';
import Prism from '@/components/common/Prism';

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: slugify(project.title),
  }));
}

export default function ProjectDetailsPage({ params }: { params: { slug: string } }) {
  const project = projects.find(p => slugify(p.title) === params.slug);

  if (!project) {
    notFound();
  }

  const getImage = (id: string) => {
    return PlaceHolderImages.find(img => img.id === id);
  };
  const projectImage = getImage(project.image);

  return (
    <div className="flex flex-col min-h-screen dark bg-[#040108] text-white">
      <Header />
      <main className="flex-grow pt-28 sm:pt-36 pb-16 sm:pb-24 bg-[#0f0b16] relative overflow-hidden">
        <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0, opacity: 0.35 }}>
          <Prism
            animationType="rotate"
            timeScale={0.3}
            height={3.5}
            baseWidth={5.5}
            scale={3.6}
            hueShift={0}
            colorFrequency={1}
            noise={0.2}
            glow={1.2}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="mb-6 max-w-4xl mx-auto">
            <Button asChild variant="outline" className="border-white/20 bg-white/5 hover:bg-white/10 text-white rounded-full">
              <Link href="/#projects">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Link>
            </Button>
          </div>
          <article className="max-w-4xl mx-auto">
            <div className="text-center space-y-3 mb-6">
              <div className="flex justify-center">
                <StrokeText
                  text="CASE STUDY & OVERVIEW"
                  fontSize={16}
                  strokeColor="#c084fc"
                  fillColor="#f8fafc"
                  strokeWidth={1.2}
                  trigger="mount"
                  fillMode="wipe"
                  letterSpacing={2}
                />
              </div>
              <MaskedHeading
                text={project.title}
                mediaType="gradient"
                gradient="linear-gradient(135deg, #ffffff 0%, #f8fafc 45%, #e2e8f0 70%, #c084fc 100%)"
                className="font-headline text-4xl sm:text-5xl md:text-6xl tracking-tight text-white font-black"
              />
            </div>
            
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              {project.tags.map(tag => (
                <Badge key={tag} className="bg-purple-500/20 text-purple-200 border-purple-500/30 px-3 py-1 text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            {projectImage && (
              <div className="relative aspect-video mb-10 rounded-2xl overflow-hidden border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
                <Image 
                  src={projectImage.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  data-ai-hint={projectImage.imageHint}
                />
              </div>
            )}
            
            <div className="space-y-6 text-xl text-slate-300 text-center leading-relaxed">
              <div className="lead text-2xl sm:text-3xl text-white font-medium">{project.description}</div>
              
              <h3 className="font-headline text-2xl pt-6 border-t border-white/10 mt-12 text-white font-bold">Project Goals</h3>
              <div>
                The main goal of this project was to explore the <HoverableText imageUrl="https://picsum.photos/seed/possibilities/200/200" imageHint="galaxy stars" className="font-headline font-bold text-2xl text-purple-300">possibilities</HoverableText> of integrating modern web <HoverableText imageUrl="https://picsum.photos/seed/technologies/200/200" imageHint="circuit board" className="font-headline font-bold text-2xl text-purple-200">technologies</HoverableText> to solve a real-world problem. We focused on creating a seamless user experience, ensuring scalability, and maintaining a high level of code quality through best practices in frontend and backend development.
              </div>
              
              <h3 className="font-headline text-2xl pt-6 border-t border-white/10 mt-12 text-white font-bold">Challenges Faced</h3>
              <div>
                One of the biggest challenges was to ensure the application was <HoverableText imageUrl="https://picsum.photos/seed/performant/200/200" imageHint="fast car" className="font-headline font-bold text-2xl text-purple-300">performant</HoverableText> across all devices. We overcame this by implementing server-side rendering with Next.js and optimizing our static assets. Another challenge was managing state in a complex application, which we solved using React's context API combined with custom hooks for a clean and <HoverableText imageUrl="https://picsum.photos/seed/maintainable/200/200" imageHint="gears machine" className="font-headline font-bold text-2xl text-purple-200">maintainable</HoverableText> architecture.
              </div>

              <h3 className="font-headline text-2xl pt-6 border-t border-white/10 mt-12 text-white font-bold">What I Learned</h3>
              <div>
                This project was a great <HoverableText imageUrl="https://picsum.photos/seed/learning-exp/200/200" imageHint="brain lightbulb" className="font-headline font-bold text-2xl text-purple-300">learning experience</HoverableText>. I deepened my understanding of full-stack development, especially in building and deploying scalable applications with Vercel. I also improved my skills in creating responsive and accessible user interfaces with Tailwind CSS and modern UI principles.
              </div>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
