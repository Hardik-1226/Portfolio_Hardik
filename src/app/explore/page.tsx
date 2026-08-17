import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CodeAnalyzerForm } from "@/components/explore/code-analyzer-form";
import { HoverableText } from "@/components/common/hoverable-text";
import { StrokeText } from "@/components/common/StrokeText";
import { MaskedHeading } from "@/components/common/MaskedHeading";

export default function ExplorePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#040108] text-white">
      <Header />
      <main className="flex-grow container mx-auto px-4 pt-28 sm:pt-36 pb-16 sm:pb-24">
        <div className="text-center mb-10 space-y-3">
          <div className="flex justify-center">
            <StrokeText
              text="AI POWERED TOOLS"
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
            text="Code Readability Analyzer"
            mediaType="gradient"
            gradient="linear-gradient(135deg, #ffffff 0%, #f8fafc 45%, #e2e8f0 70%, #c084fc 100%)"
            className="font-headline font-bold text-4xl sm:text-5xl md:text-6xl text-white"
          />
          <div className="mt-4 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto text-center leading-relaxed">
            Powered by GenAI, this tool analyzes your code snippets for <HoverableText imageUrl="https://picsum.photos/seed/readability/200/200" imageHint="open book" className="font-headline font-bold text-2xl text-purple-300">readability</HoverableText> and <HoverableText imageUrl="https://picsum.photos/seed/maintainability/200/200" imageHint="tools wrench" className="font-headline font-bold text-2xl text-purple-200">maintainability</HoverableText>, providing scores and suggestions for improvement.
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
