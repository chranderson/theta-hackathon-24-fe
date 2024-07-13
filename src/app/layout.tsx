import type { Metadata } from 'next';
import './globals.css';

import { Inter as FontSans } from 'next/font/google';
import { cn } from '@/lib/utils';
import Header from '@/app/components/header';
import Footer from './components/footer';
import { env } from '@/lib/env';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
});
export const metadata: Metadata = {
  title: `${env.NEXT_PUBLIC_TEAM_NAME}`,
  description: `${env.NEXT_PUBLIC_APP_NAME} 2024 entry`
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background font-mono antialiased',
          fontSans.variable
        )}
      >
        <div className="relative bg-background flex min-h-screen flex-col ">
          <Header />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
