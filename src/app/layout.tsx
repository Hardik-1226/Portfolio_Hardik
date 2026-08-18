import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from "@/components/ui/toaster";
import { ChatbotWidget } from "@/components/common/chatbot-widget";
import SplashCursor from "@/components/common/splash-cursor";
import MagicBentoController from "@/components/common/magic-bento-controller";
import RippleDistortion from "@/components/common/RippleDistortion";

export const metadata: Metadata = {
  title: 'Hardik Varshney',
  description: 'Hardik\'s personal portfolio. B.Tech Student & Web Developer.',
  openGraph: {
    title: 'Hardik Varshney',
    description: 'Hardik\'s personal portfolio. B.Tech Student & Web Developer.',
    url: 'https://Hardikvarshney.xyz', // replace with your actual domain
    siteName: 'Hardik Varshney',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Favicon: place your icon file in the public directory (e.g. public/favicon.ico or .png) */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Antonio:wght@400;600;700&family=Barlow+Condensed:wght@500;600;700;800;900&family=Bebas+Neue&family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("font-body antialiased relative bg-[#09090b] text-white min-h-screen selection:bg-white selection:text-black")}>
        {/* Energetic High-Contrast Ambient Background & Grid */}
        <div className="fixed inset-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
          {/* Luminous energetic radial beams */}
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-gradient-to-b from-white/[0.12] via-zinc-400/[0.04] to-transparent blur-[120px] rounded-full" />
          <div className="absolute top-1/3 -left-48 w-[600px] h-[600px] bg-gradient-to-tr from-zinc-500/[0.08] via-zinc-400/[0.02] to-transparent blur-[140px] rounded-full" />
          <div className="absolute bottom-10 -right-48 w-[700px] h-[700px] bg-gradient-to-tl from-white/[0.08] via-zinc-600/[0.03] to-transparent blur-[150px] rounded-full" />
          
          {/* Subtle modern tech grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff07_1px,transparent_1px),linear-gradient(to_bottom,#ffffff07_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-80" />

          <RippleDistortion
            brushSize={160}
            strength={0.22}
            swirl={1}
            rings={4}
            grayscale
            quality="low"
            className="w-full h-full opacity-60 brightness-95"
            style={{ width: '100vw', height: '100vh' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#09090b]/80 via-[#09090b]/50 to-[#09090b]/90 pointer-events-none" />
        </div>
        <SplashCursor />
        <MagicBentoController />
        {children}
        <Toaster />
        <ChatbotWidget />
      </body>
    </html>
  );
}
