import type { Metadata } from 'next';
import './globals.css';
import '@rainbow-me/rainbowkit/styles.css';

import { Inter as FontSans } from 'next/font/google';
import { cn } from '@/lib/utils';
import Header from '@/app/components/header';
import Footer from './components/footer';
import { env } from '@/lib/env';
import Providers from './providers';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
});
export const metadata: Metadata = {
  title: `${env.NEXT_PUBLIC_TEAM_NAME}`,
  description: `${env.NEXT_PUBLIC_APP_NAME}`
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
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <Providers>
          <div className="relative bg-background flex min-h-screen flex-col ">
            <Header />
            {children}
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
