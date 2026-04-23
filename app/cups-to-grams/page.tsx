import type { Metadata } from 'next';
import HomeLanding from '@/components/home/HomeLanding';

export const metadata: Metadata = {
  title: 'Cups to Grams Converter | BakingConverter',
  description:
    'Free cups to grams converter for flour, sugar, butter and more. Convert US cups to grams instantly with ingredient-specific charts and accurate baking data.',
  openGraph: {
    title: 'Cups to Grams Converter | BakingConverter',
    description:
      'Free cups to grams converter for flour, sugar, butter and more. Convert US cups to grams instantly with ingredient-specific charts and accurate baking data.',
    type: 'website',
    images: [{ url: '/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cups to Grams Converter | BakingConverter',
    description:
      'Free cups to grams converter for flour, sugar, butter and more. Convert US cups to grams instantly with ingredient-specific charts and accurate baking data.',
    images: ['/og-default.png'],
  },
  alternates: { canonical: '/cups-to-grams/' },
};

export default function CupsToGramsHomePage() {
  return (
    <HomeLanding
      heroTitle="Cups to Grams Converter"
      heroSubtitle="Convert US cups to grams instantly for flour, sugar, butter, milk and more - with ingredient-specific charts and no guesswork."
      initialMode="cups_to_grams"
    />
  );
}
