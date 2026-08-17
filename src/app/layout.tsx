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
        <link href="https://fonts.googleapis.com/css2?family=Literata:opsz,wght@7..72,400;7..72,700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("font-body antialiased relative bg-[#040108] text-white min-h-screen")}>
        <div className="fixed inset-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
          <RippleDistortion
            brushSize={160}
            strength={0.22}
            swirl={1}
            rings={4}
            grayscale
            quality="low"
            className="w-full h-full opacity-80 brightness-80"
            style={{ width: '100vw', height: '100vh' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#040108]/65 via-[#060210]/40 to-[#040108]/75 pointer-events-none" />
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
