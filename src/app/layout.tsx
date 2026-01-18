import type {Metadata} from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from "@/components/ui/toaster";
import { ChatbotWidget } from '@/components/common/chatbot-widget';

export const metadata: Metadata = {
  title: 'Hardik HQ',
  description: 'Hardik\'s personal portfolio. B.Tech Student & Web Developer.',
  openGraph: {
    title: 'Hardik HQ',
    description: 'Hardik\'s personal portfolio. B.Tech Student & Web Developer.',
    url: 'https://hardik-hq.firebaseapp.com',
    siteName: 'Hardik HQ',
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Literata:opsz,wght@7..72,400;7..72,700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("font-body antialiased")}>
        {children}
        <Toaster />
        <ChatbotWidget />
      </body>
    </html>
  );
}
