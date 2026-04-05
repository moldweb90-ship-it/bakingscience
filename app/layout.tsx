import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CookieConsent from '@/components/layout/CookieConsent';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://bakingconverter.com'),
    title: {
      default: 'Grams to Cups - Baking Conversion Chart | BakingConverter',
      template: '%s',
    },
  description:
    "Baking conversion charts done right - not 'roughly'. Convert grams to cups for 50+ ingredients. Precise results for every recipe.",
  openGraph: {
    title: 'Grams to Cups - Baking Conversion Chart | BakingConverter',
    description:
      "Baking conversion charts done right - not 'roughly'. Convert grams to cups for 50+ ingredients. Precise results for every recipe.",
    siteName: 'BakingConverter',
    type: 'website',
    images: [{ url: '/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Grams to Cups - Baking Conversion Chart | BakingConverter',
    description:
      "Baking conversion charts done right - not 'roughly'. Convert grams to cups for 50+ ingredients. Precise results for every recipe.",
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
        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-5QMXE3P83M"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-5QMXE3P83M');
          `}
        </Script>
      </body>
    </html>
  );
}
