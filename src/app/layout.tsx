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
      <body className={cn("font-body antialiased relative bg-[#0c0e17] text-[#f8fafc] min-h-screen selection:bg-purple-200 selection:text-zinc-900")}>
        {/* Soft Dreamy Pastel Ambient Background & Subtle Grid */}
        <div className="fixed inset-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
          {/* Diffused soft pastel radial orbs */}
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[950px] h-[600px] bg-gradient-to-b from-purple-300/[0.15] via-indigo-300/[0.06] to-transparent blur-[140px] rounded-full" />
          <div className="absolute top-1/4 -left-48 w-[650px] h-[650px] bg-gradient-to-tr from-teal-200/[0.09] via-sky-300/[0.04] to-transparent blur-[150px] rounded-full" />
          <div className="absolute top-2/3 -right-48 w-[750px] h-[750px] bg-gradient-to-tl from-pink-300/[0.11] via-rose-300/[0.04] to-transparent blur-[160px] rounded-full" />
          <div className="absolute bottom-0 left-1/3 w-[600px] h-[500px] bg-gradient-to-t from-amber-200/[0.07] via-indigo-200/[0.03] to-transparent blur-[150px] rounded-full" />
          
          {/* Subtle soft tech grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff09_1px,transparent_1px),linear-gradient(to_bottom,#ffffff09_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_65%_55%_at_50%_40%,#000_75%,transparent_100%)] opacity-70" />

          <RippleDistortion
            brushSize={160}
            strength={0.22}
            swirl={1}
            rings={4}
            grayscale
            quality="low"
            className="w-full h-full opacity-50 brightness-95"
            style={{ width: '100vw', height: '100vh' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c0e17]/75 via-[#0c0e17]/45 to-[#0c0e17]/85 pointer-events-none" />
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
