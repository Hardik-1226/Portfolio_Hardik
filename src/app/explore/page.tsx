import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CodeAnalyzerForm } from "@/components/explore/code-analyzer-form";

export default function ExplorePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 pt-32 sm:pt-40 pb-16 sm:pb-24">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl sm:text-5xl tracking-tight">Code Readability Analyzer</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto text-justify">
            Powered by GenAI, this tool analyzes your code snippets for readability and maintainability, providing scores and suggestions for improvement.
          </p>
        </div>
        <CodeAnalyzerForm />
      </main>
      <Footer />
    </div>
  );
}
