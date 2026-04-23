import type { Metadata } from 'next';
import HomeLanding from '@/components/home/HomeLanding';
import { SITE_URL, SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Grams to Cups Converter (g to cups) | BakingConverter',
  description:
    'Free grams to cups converter for flour, sugar, butter and 50+ ingredients. Instant US cup conversions, charts, and reverse cups-to-grams calculator.',
  openGraph: {
    title: 'Grams to Cups Converter (g to cups) | BakingConverter',
    description:
      'Free grams to cups converter for flour, sugar, butter and 50+ ingredients. Instant US cup conversions, charts, and reverse cups-to-grams calculator.',
    url: SITE_URL,
    siteName: SITE_NAME,
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
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return <HomeLanding
    heroTitle="Grams to Cups Converter"
    heroSubtitle="Convert grams to US cups instantly for flour, sugar, butter, milk and more - with ingredient-specific charts and no guesswork."
    initialMode="grams_to_cups"
  />;
}
