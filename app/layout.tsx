import type { Metadata } from 'next';
import Script from 'next/script';
import { Suspense } from 'react';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CookieConsent from '@/components/layout/CookieConsent';
import YandexMetrikaPageTracker from '@/components/analytics/YandexMetrikaPageTracker';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://bakingconverter.com'),
    title: {
      default: 'Grams to Cups Converter (g to cups) | BakingConverter',
      template: '%s',
    },
  description:
    'Free grams to cups converter for flour, sugar, butter and 50+ ingredients. Instant US cup conversions, charts, and reverse cups-to-grams calculator.',
  openGraph: {
    title: 'Grams to Cups Converter (g to cups) | BakingConverter',
    description:
      'Free grams to cups converter for flour, sugar, butter and 50+ ingredients. Instant US cup conversions, charts, and reverse cups-to-grams calculator.',
    siteName: 'BakingConverter',
    type: 'website',
    images: [{ url: '/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Grams to Cups Converter (g to cups) | BakingConverter',
    description:
      'Free grams to cups converter for flour, sugar, butter and 50+ ingredients. Instant US cup conversions, charts, and reverse cups-to-grams calculator.',
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
        {/* Yandex.Metrika */}
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {
                if (document.scripts[j].src === r) { return; }
              }
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a);
            })(window, document,'script','https://mc.yandex.ru/metrika/tag.js', 'ym');
            ym(108426727, 'init', {webvisor:true, clickmap:true, accurateTrackBounce:true, trackLinks:true});
          `}
        </Script>
        <Suspense fallback={null}>
          <YandexMetrikaPageTracker />
        </Suspense>
        <noscript>
          <div><img src="https://mc.yandex.ru/watch/108426727" style={{position:'absolute', left:'-9999px'}} alt="" /></div>
        </noscript>
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
