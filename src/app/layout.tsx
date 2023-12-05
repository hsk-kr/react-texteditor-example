import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from './components/Header';

const inter = Inter({ subsets: ['latin'] });

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
        className={`${inter.className} flex flex-col h-screenUI max-w-lg mx-auto bg-primary `}
      >
        <Header />
        <main className="flex-1 bg-white">{children}</main>
      </body>
    </html>
  );
}
