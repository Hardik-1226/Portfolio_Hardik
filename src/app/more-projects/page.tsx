import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function MoreProjectsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 pt-32 sm:pt-40 pb-16 sm:pb-24 flex flex-col items-center justify-center text-center">
        <h1 className="font-headline text-4xl sm:text-5xl tracking-tight mb-4">More Projects</h1>
        <p className="text-xl text-muted-foreground mb-8">
          More exciting projects are coming soon. Stay tuned!
        </p>
        <Button asChild variant="outline">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </main>
      <Footer />
    </div>
  );
}
