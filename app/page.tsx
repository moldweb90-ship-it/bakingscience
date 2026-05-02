import type { Metadata } from 'next';
import HomeLanding from '@/components/home/HomeLanding';
import { SITE_URL, SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Grams to Cups Converter | Flour, Sugar, Butter Charts',
  description:
    'Convert grams to cups for flour, sugar, butter, peanut butter and more. Ingredient-specific US cup charts for 15g, 50g, 100g, 200g, 500g and common baking weights.',
  openGraph: {
    title: 'Grams to Cups Converter | Flour, Sugar, Butter Charts',
    description:
      'Convert grams to cups for flour, sugar, butter, peanut butter and more. Ingredient-specific US cup charts for common baking weights.',
    url: SITE_URL,
    siteName: SITE_NAME,
    type: 'website',
    images: [{ url: '/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Grams to Cups Converter | Flour, Sugar, Butter Charts',
    description:
      'Convert grams to cups for flour, sugar, butter, peanut butter and more. Ingredient-specific US cup charts for common baking weights.',
    images: ['/og-default.png'],
  },
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return <HomeLanding
    heroTitle="Grams to Cups Converter"
    heroSubtitle="Convert grams to US cups for flour, sugar, butter, peanut butter, milk and more - with ingredient-specific charts and no guesswork."
    initialMode="grams_to_cups"
  />;
}
