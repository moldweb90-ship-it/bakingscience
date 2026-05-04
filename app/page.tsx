import type { Metadata } from 'next';
import HomeLanding from '@/components/home/HomeLanding';
import { SITE_URL, SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Grams to Cups Converter - Exact Baking Charts',
  description:
    'Stop guessing: grams to cups changes by ingredient. Compare flour, sugar, butter, oats, water and more with exact US baking charts and quick calculators.',
  openGraph: {
    title: 'Grams to Cups Converter - Exact Baking Charts',
    description:
      'Grams to cups changes by ingredient. Compare flour, sugar, butter, oats, water and more with exact US baking charts.',
    url: SITE_URL,
    siteName: SITE_NAME,
    type: 'website',
    images: [{ url: '/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Grams to Cups Converter - Exact Baking Charts',
    description:
      'Grams to cups changes by ingredient. Compare flour, sugar, butter, oats, water and more with exact US baking charts.',
    images: ['/og-default.png'],
  },
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return <HomeLanding
    heroTitle="Grams to Cups Converter"
    heroSubtitle="Stop using one generic answer. Convert grams to US cups by ingredient: flour, sugar, butter, peanut butter, milk, oats, rice and more."
    initialMode="grams_to_cups"
  />;
}
