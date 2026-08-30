import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'ArchLens — Architecture Memory for AI Development',
  description:
    'Understand how every pull request changes your software architecture. ArchLens helps developers detect architectural drift in AI-assisted codebases.',
  openGraph: {
    title: 'ArchLens — Architecture Memory for AI Development',
    description:
      'Understand how every pull request changes your software architecture. ArchLens helps developers detect architectural drift in AI-assisted codebases.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ArchLens — Architecture Memory for AI Development',
    description:
      'Understand how every pull request changes your software architecture. ArchLens helps developers detect architectural drift in AI-assisted codebases.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
