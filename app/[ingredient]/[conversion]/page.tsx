import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import Script from 'next/script';
import Link from 'next/link';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import LeafPageCalculator from '@/components/calculator/LeafPageCalculator';
import VisualMeasurementGuide from '@/components/calculator/VisualMeasurementGuide';
import NearbyValuesTable from '@/components/calculator/NearbyValuesTable';
import RecipeContext from '@/components/calculator/RecipeContext';
import NutritionBlock from '@/components/calculator/NutritionBlock';
import ProTips from '@/components/calculator/ProTips';
import WhyItMatters from '@/components/calculator/WhyItMatters';
import FAQAccordion from '@/components/seo/FAQAccordion';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import { ingredients, convert, MEASUREMENT_METHODS } from '@/lib/converter';
import { findMatchingRecipes } from '@/lib/recipe-scaler';
import { parseConversionSlug, buildLeafUrl, buildHubUrl } from '@/lib/slug-utils';
import { generateLeafTitle, generateFallbackTitle } from '@/lib/title-generator';
import {
  generateLeafDescription,
  generateCanonicalLeaf,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateSoftwareAppSchema,
  generateHowToSchema,
  generateOpenGraph,
  generateTwitterCard,
} from '@/lib/seo-utils';
import { SITE_URL } from '@/lib/constants';

interface LeafPageProps {
  params: Promise<{ ingredient: string; conversion: string }>;
}

export async function generateStaticParams() {
  const params: { ingredient: string; conversion: string }[] = [];
  for (const ing of Object.values(ingredients)) {
    for (const weight of ing.common_weights_g) {
      params.push({
        ingredient: ing.id,
        conversion: `${weight}-grams-to-cups`,
      });
    }
  }
  return params;
}

export const revalidate = 604800;

export async function generateMetadata({ params }: LeafPageProps): Promise<Metadata> {
  const { ingredient: ingredientId, conversion } = await params;
  const ing = ingredients[ingredientId];
  if (!ing) return { title: 'Not Found' };

  const weight = parseConversionSlug(conversion);
  if (weight === null) return { title: 'Not Found' };

  const spoonLevel = convert(weight, ingredientId, 'spoon_level');
  const sifted = convert(weight, ingredientId, 'sifted');

  const title = generateLeafTitle(weight, ing.name, spoonLevel.cups);
  const description = generateLeafDescription(weight, ing.name, ingredientId);
  const canonical = generateCanonicalLeaf(ingredientId, weight);

  return {
    title,
    description,
    openGraph: {
      ...generateOpenGraph(title, description, canonical),
      type: 'article',
      images: [{ url: '/og-default.png', width: 1200, height: 630 }],
    },
    twitter: {
      ...generateTwitterCard(title, description),
      images: ['/og-default.png'],
    },
    alternates: { canonical },
  };
}

export default async function LeafPage({ params }: LeafPageProps) {
  const { ingredient: ingredientId, conversion } = await params;

  // Validate ingredient
  const ing = ingredients[ingredientId];
  if (!ing) notFound();

  // Validate slug — trailingSlash handled by next.config.ts
  const lowerConversion = conversion.toLowerCase();
  if (conversion !== lowerConversion) {
    redirect(`/${ingredientId}/${lowerConversion}/`);
  }

  // Check for decimal
  const decimalMatch = conversion.match(/^(\d+)\.(\d+)-grams-to-cups$/);
  if (decimalMatch) {
    const rounded = Math.round(parseFloat(decimalMatch[1]));
    if (rounded >= 1 && rounded <= 1000) {
      redirect(`/${ingredientId}/${rounded}-grams-to-cups/`);
    }
  }

  const weight = parseConversionSlug(conversion);
  if (weight === null) notFound();

  // Calculate conversions
  const spoonLevel = convert(weight, ingredientId, 'spoon_level');
  const sifted = convert(weight, ingredientId, 'sifted');
  const dipSweep = convert(weight, ingredientId, 'dip_sweep');

  const isFat = ing.type === 'fat';
  const isLiquid = ing.type === 'liquid';
  const stateModifier = isFat ? (ing.states?.solid ?? 1.0) : 1.0;

  // Find matching recipe
  const matches = findMatchingRecipes(ingredientId, weight);
  const matchedRecipe = matches.length > 0 ? matches[0].recipe : null;

  // Breadcrumbs
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: ing.name, href: buildHubUrl(ingredientId) },
    { label: `${weight}g to Cups` },
  ];

  // JSON-LD Schemas
  const faqSchema = generateFAQSchema(weight, ing.name, ingredientId, ing.faq);
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems.map((item) => ({
    name: item.label,
    item: item.href ? `${SITE_URL}${item.href}` : undefined,
  })));
  const softwareAppSchema = generateSoftwareAppSchema(ing.name);
  const howToSchema = generateHowToSchema(weight, ing.name, spoonLevel.cups);

  // Auto-generated FAQ questions
  const variancePercent = Math.round(((sifted.cups - dipSweep.cups) / spoonLevel.cups) * 100);
  const autoFaqs = [
    {
      question: `How many cups is ${weight}g of ${ing.name.toLowerCase()}?`,
      answer: `Using the Spoon & Level method, ${weight}g of ${ing.name.toLowerCase()} equals ${spoonLevel.cups} cups. With Dip & Sweep it's ${dipSweep.cups} cups, and sifted it's ${sifted.cups} cups.`,
    },
    {
      question: `Does the measurement method matter for ${ing.name.toLowerCase()}?`,
      answer: `Yes. The same ${weight}g can measure ${sifted.cups} cups (sifted) or ${dipSweep.cups} cups (packed). That's a ${variancePercent}% difference.`,
    },
    {
      question: `How do I measure ${ing.name.toLowerCase()} without a scale?`,
      answer: `Use the Spoon & Level method: lightly spoon the ${ing.name.toLowerCase()} into a measuring cup until overflowing, then level off with a straight edge. Do not tap or shake the cup.`,
    },
  ];

  const allFaqs = [...autoFaqs, ...ing.faq];

  // Nearby weights for Section S
  const nearbyWeights = [-100, -50, -25, -10, 10, 25, 50, 100]
    .map((o) => weight + o)
    .filter((v) => v >= 1 && v <= 1000 && v !== weight);

  // Same weight, different ingredients
  const sameWeightRelated = ing.related_ingredients
    .filter((id) => ingredients[id])
    .slice(0, 5);

  return (
    <div className="py-8 sm:py-12">
      {/* JSON-LD Schemas */}
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Script id="software-app-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />
      <Script id="howto-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      {/* Desktop Sidebar */}
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 min-w-0">
          {/* Section A: Breadcrumbs */}
          <Breadcrumbs items={breadcrumbItems} />

          {/* Interactive Calculator (Sections B-J, K, L, M, N, O, P, Q, R) */}
          <LeafPageCalculator
            ingredientId={ingredientId}
            ingredientName={ing.name}
            ingredientType={ing.type}
            weightG={weight}
            density={ing.base_density_g_per_ml}
            states={ing.states}
            photoAvailable={ing.photo_available}
            matchedRecipe={matchedRecipe}
            canonicalUrl={generateCanonicalLeaf(ingredientId, weight)}
            pageTitle={generateLeafTitle(weight, ing.name, spoonLevel.cups)}
            pageDescription={generateLeafDescription(weight, ing.name, ingredientId)}
          />

          {/* Section H: Visual Measurement Guide (server-rendered for SEO) */}
          <section className="mt-8">
            <VisualMeasurementGuide
              ingredientId={ingredientId}
              ingredientName={ing.name}
              weightG={weight}
              photoAvailable={ing.photo_available}
            />
          </section>

          {/* Section I: Nearby Values Table */}
          <section className="mt-8">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">Nearby Conversions</h2>
            <NearbyValuesTable
              currentWeight={weight}
              ingredientId={ingredientId}
              density={ing.base_density_g_per_ml}
            />
          </section>

          {/* Section L: Recipe Context (server-rendered for SEO) */}
          {matchedRecipe && (
            <section className="mt-8">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                Common Recipes Using {weight}g of {ing.name}
              </h2>
              <RecipeContext ingredientId={ingredientId} weightG={weight} />
            </section>
          )}

          {/* Section N: Nutrition Block (server-rendered) */}
          <section className="mt-8">
            <NutritionBlock
              ingredientName={ing.name}
              weightG={weight}
              nutritionPer100g={ing.nutrition_per_100g}
            />
          </section>

          {/* Section O: Pro Tips (server-rendered) */}
          {ing.pro_tips.length > 0 && (
            <section className="mt-8">
              <ProTips tips={ing.pro_tips} ingredientName={ing.name} />
            </section>
          )}

          {/* Section P: Why It Matters (server-rendered) */}
          <section className="mt-8">
            <WhyItMatters
              ingredientName={ing.name}
              weightG={weight}
              ingredientId={ingredientId}
            />
          </section>

          {/* Section Q: FAQ (server-rendered for SEO) */}
          <section className="mt-8 max-w-3xl">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
            <FAQAccordion faqs={allFaqs} />
          </section>

          {/* Section S: Related Conversions */}
          <section className="mt-8">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">More Conversions</h2>

            {/* Same ingredient, different weights */}
            <div className="mb-6">
              <h3 className="font-semibold text-slate-800 mb-3">More {ing.name} Conversions</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {nearbyWeights.map((w) => {
                  const result = convert(w, ingredientId, 'spoon_level');
                  return (
                    <Link
                      key={w}
                      href={`/${ingredientId}/${w}-grams-to-cups/`}
                      className="card p-3 text-center hover:border-accent transition-colors text-sm"
                    >
                      <span className="font-medium text-accent">{w}g</span>
                      <span className="block text-slate-500 text-xs">{result.cups === 1 ? "1 cup" : `${result.cups} cups`}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Same weight, different ingredients */}
            {sameWeightRelated.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-slate-800 mb-3">{weight}g of Other Ingredients</h3>
                <div className="flex flex-wrap gap-2">
                  {sameWeightRelated.map((relId) => {
                    const rel = ingredients[relId];
                    if (!rel) return null;
                    return (
                      <Link
                        key={relId}
                        href={`/${relId}/${weight}-grams-to-cups/`}
                        className="btn-secondary text-sm px-3 py-2 min-h-[36px]"
                      >
                        {weight}g {rel.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Popular conversions */}
            <div>
              <h3 className="font-semibold text-slate-800 mb-3">Most Popular {ing.name} Conversions</h3>
              <div className="flex flex-wrap gap-2">
                {ing.common_weights_g.slice(0, 10).map((w) => (
                  <Link
                    key={w}
                    href={`/${ingredientId}/${w}-grams-to-cups/`}
                    className="text-xs bg-slate-100 hover:bg-accent-light hover:text-accent-hover text-slate-600 px-3 py-1.5 rounded-full transition-colors"
                  >
                    {w}g to cups
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Section T: Ad Slot #3 */}
          <section className="mt-8">
            <AdBanner />
          </section>
        </div>

        {/* Section U: Sidebar (Desktop Only) */}
        <aside className="hidden lg:block w-[300px] flex-shrink-0">
          <div className="sticky top-20 space-y-6">
            <AdSidebar />
            <div className="card p-4">
              <h3 className="font-semibold text-slate-900 mb-3 text-sm">Popular Ingredients</h3>
              <ul className="space-y-2">
                {Object.values(ingredients).slice(0, 8).map((i) => (
                  <li key={i.id}>
                    <Link href={`/${i.id}/`} className="text-sm text-slate-600 hover:text-accent transition-colors">
                      {i.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
