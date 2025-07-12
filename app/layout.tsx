import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Initials Image Generator - Create Custom Avatar Images',
  description: 'Generate beautiful initials images with customizable colors and dimensions. Perfect for avatars, placeholders, and branding.',
  keywords: ['initials', 'image generator', 'avatar', 'placeholder', 'custom images'],
  authors: [{ name: 'Initials Generator' }],
  openGraph: {
    title: 'Initials Image Generator',
    description: 'Generate beautiful initials images with customizable colors and dimensions',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}