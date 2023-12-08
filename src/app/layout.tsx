import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from './components/Header';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: 'Text Editor Example w/React',
  description: 'Text Editor Example w/React',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} h-screenUI max-w-lg mx-auto bg-primary`}
      >
        <Header />
        <main className="h-[calc(100dvh-48px)] bg-white">{children}</main>
      </body>
    </html>
  );
}
