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

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: slugify(project.title),
  }));
}

export default function ProjectDetailsPage({ params }: { params: { slug:string } }) {
  const project = projects.find(p => slugify(p.title) === params.slug);

  if (!project) {
    notFound();
  }

  const getImage = (id: string) => {
    return PlaceHolderImages.find(img => img.id === id);
  }
  const projectImage = getImage(project.image);

  return (
    <div className="flex flex-col min-h-screen dark">
      <Header />
      <main className="flex-grow pt-32 sm:pt-40 pb-16 sm:pb-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Button asChild variant="ghost" className="pl-0">
              <Link href="/#projects">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Link>
            </Button>
          </div>
          <article className="max-w-4xl mx-auto">
            <h1 className="font-headline text-4xl sm:text-5xl tracking-tight mb-4 text-center text-foreground">{project.title}</h1>
            
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              {project.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
            </div>

            {projectImage && (
              <div className="relative aspect-video mb-8 rounded-lg overflow-hidden border">
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
            
            <div className="space-y-6 text-2xl text-muted-foreground text-center">
              <div className="lead text-3xl">{project.description}</div>
              
              <h3 className="font-headline text-2xl pt-4 border-t mt-12 text-foreground">Project Goals</h3>
              <div>The main goal of this project was to explore the <HoverableText imageUrl="https://picsum.photos/seed/possibilities/200/200" imageHint="galaxy stars" className="font-headline font-bold text-3xl">possibilities</HoverableText> of integrating modern web <HoverableText imageUrl="https://picsum.photos/seed/technologies/200/200" imageHint="circuit board" className="font-headline font-bold text-3xl">technologies</HoverableText> to solve a real-world problem. We focused on creating a seamless user experience, ensuring scalability, and maintaining a high level of code quality through best practices in frontend and backend development.</div>
              
              <h3 className="font-headline text-2xl pt-4 border-t mt-12 text-foreground">Challenges Faced</h3>
              <div>One of the biggest challenges was to ensure the application was <HoverableText imageUrl="https://picsum.photos/seed/performant/200/200" imageHint="fast car" className="font-headline font-bold text-3xl">performant</HoverableText> across all devices. We overcame this by implementing server-side rendering with Next.js and optimizing our static assets. Another challenge was managing state in a complex application, which we solved using React's context API combined with custom hooks for a clean and <HoverableText imageUrl="https://picsum.photos/seed/maintainable/200/200" imageHint="gears machine" className="font-headline font-bold text-3xl">maintainable</HoverableText> architecture.</div>

              <h3 className="font-headline text-2xl pt-4 border-t mt-12 text-foreground">What I Learned</h3>
              <div>This project was a great <HoverableText imageUrl="https://picsum.photos/seed/learning-exp/200/200" imageHint="brain lightbulb" className="font-headline font-bold text-3xl">learning experience</HoverableText>. I deepened my understanding of full-stack development, especially in building and deploying scalable applications with Vercel. I also improved my skills in creating responsive and accessible user interfaces with Tailwind CSS and ShadCN UI.</div>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
