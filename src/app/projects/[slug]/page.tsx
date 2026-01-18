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
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-32 sm:pt-40 pb-16 sm:pb-24 bg-violet-100/50 dark:bg-violet-950/[.25]">
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
            <h1 className="font-headline text-4xl sm:text-5xl tracking-tight mb-4 text-center">{project.title}</h1>
            
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              {project.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
            </div>

            {projectImage && (
              <div className="relative aspect-video mb-8 rounded-lg overflow-hidden">
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
            
            <div className="space-y-6 text-lg text-muted-foreground text-center">
              <p className="lead text-xl">{project.description}</p>
              
              <h3 className="font-headline text-2xl pt-4 border-t mt-12">Project Goals</h3>
              <p>The main goal of this project was to explore the possibilities of integrating modern web technologies to solve a real-world problem. We focused on creating a seamless user experience, ensuring scalability, and maintaining a high level of code quality through best practices in frontend and backend development.</p>
              
              <h3 className="font-headline text-2xl pt-4 border-t mt-12">Challenges Faced</h3>
              <p>One of the biggest challenges was to ensure the application was performant across all devices. We overcame this by implementing server-side rendering with Next.js and optimizing our static assets. Another challenge was managing state in a complex application, which we solved using React's context API combined with custom hooks for a clean and maintainable architecture.</p>

              <h3 className="font-headline text-2xl pt-4 border-t mt-12">What I Learned</h3>
              <p>This project was a great learning experience. I deepened my understanding of full-stack development, especially in building and deploying scalable applications with Vercel. I also improved my skills in creating responsive and accessible user interfaces with Tailwind CSS and ShadCN UI.</p>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
