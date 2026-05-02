import type { Metadata } from 'next';
import HomeLanding from '@/components/home/HomeLanding';

export const metadata: Metadata = {
  title: 'Cups to Grams Converter | 1 Cup, 1/2 Cup, 1/4 Cup Charts',
  description:
    'Convert cups to grams for flour, sugar, butter, peanut butter and more. Includes 1 cup, 1/2 cup, 1/4 cup, 3/4 cup and ingredient-specific US baking charts.',
  openGraph: {
    title: 'Cups to Grams Converter | 1 Cup, 1/2 Cup, 1/4 Cup Charts',
    description:
      'Convert cups to grams for flour, sugar, butter, peanut butter and more. Includes common cup fractions and ingredient-specific US baking charts.',
    type: 'website',
    images: [{ url: '/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cups to Grams Converter | 1 Cup, 1/2 Cup, 1/4 Cup Charts',
    description:
      'Convert cups to grams for flour, sugar, butter, peanut butter and more. Includes common cup fractions and ingredient-specific US baking charts.',
    images: ['/og-default.png'],
  },
  alternates: { canonical: '/cups-to-grams/' },
};

export default function CupsToGramsHomePage() {
  return (
    <HomeLanding
      heroTitle="Cups to Grams Converter"
      heroSubtitle="Convert US cups to grams for flour, sugar, butter, peanut butter, milk and more - with 1 cup, 1/2 cup, 1/4 cup and 3/4 cup charts."
      initialMode="cups_to_grams"
    />
  );
}
