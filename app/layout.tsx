import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
export const metadata: Metadata = {
  title: "Initials Image Generator - Custom Avatars & Profile Images",
  description:
    "Create personalized avatars and initials images with custom colors and sizes. Open-source, built with Next.js, TypeScript, and Canvas. Contribute on GitHub!",
  openGraph: {
    title: "Initials Image Generator - Custom Avatars",
    description:
      "Generate stunning avatars and initials images for profiles, branding, or placeholders. Open-source and community-driven.",
    url: "https://initials-image-generator-mauve.vercel.app",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.png",
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