import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CookieConsent from '@/components/layout/CookieConsent';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://bakingconverter.com'),
  title: {
    default: 'BakingConverter - Precision Baking Conversions (Grams to Cups)',
    template: '%s | BakingConverter',
  },
  description:
    'Stop guessing. Convert baking ingredients from grams to cups with scientific accuracy. Accounts for sifted, packed, and spooned methods. Free interactive calculator for 20+ ingredients.',
  openGraph: {
    title: 'BakingConverter - Precision Baking Conversions (Grams to Cups)',
    description:
      'Stop guessing. Convert baking ingredients from grams to cups with scientific accuracy.',
    siteName: 'BakingConverter',
    type: 'website',
    images: [{ url: '/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BakingConverter - Precision Baking Conversions (Grams to Cups)',
    description:
      'Stop guessing. Convert baking ingredients from grams to cups with scientific accuracy.',
    images: ['/og-default.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-cream text-slate-800 antialiased flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-accent focus:text-white focus:px-4 focus:py-2 focus:rounded-button"
        >
          Skip to main content
        </a>
        <Header />
        <main
          id="main-content"
          className="flex-1 mx-auto w-full max-w-page px-4 sm:px-6 lg:px-8"
        >
          {children}
        </main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
