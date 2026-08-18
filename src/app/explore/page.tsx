import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CodeAnalyzerForm } from "@/components/explore/code-analyzer-form";
import { HoverableText } from "@/components/common/hoverable-text";
import { StrokeText } from "@/components/common/StrokeText";
import { MaskedHeading } from "@/components/common/MaskedHeading";

export default function ExplorePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#09090b] text-white">
      <Header />
      <main className="flex-grow container mx-auto px-4 pt-28 sm:pt-36 pb-16 sm:pb-24">
        <div className="text-center mb-10 space-y-3">
          <div className="flex justify-center">
            <StrokeText
              text="AI POWERED TOOLS"
              fontSize={18}
              strokeColor="#a1a1aa"
              fillColor="#ffffff"
              strokeWidth={1.2}
              trigger="mount"
              fillMode="wipe"
              letterSpacing={3}
            />
          </div>
          <MaskedHeading
            text="Code Readability Analyzer"
            mediaType="gradient"
            gradient="linear-gradient(135deg, #ffffff 0%, #f4f4f5 45%, #d4d4d8 70%, #a1a1aa 100%)"
            className="font-headline font-bold text-4xl sm:text-5xl md:text-6xl text-white uppercase tracking-tight"
          />
          <div className="mt-4 text-base sm:text-lg text-zinc-300 max-w-3xl mx-auto text-center leading-relaxed">
            Powered by GenAI, this tool analyzes your code snippets for readability and maintainability, providing scores and suggestions for improvement.
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <CodeAnalyzerForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
