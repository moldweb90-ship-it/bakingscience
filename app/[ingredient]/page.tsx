import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import HubQuickCalculator from '@/components/calculator/HubQuickCalculator';
import PopularConversionsTable from '@/components/calculator/PopularConversionsTable';
import NutritionFacts from '@/components/calculator/NutritionFacts';
import FAQAccordion from '@/components/seo/FAQAccordion';
import RelatedIngredientsCards from '@/components/ui/RelatedIngredientsCards';
import AdBanner from '@/components/ads/AdBanner';
import { ingredients, Ingredient } from '@/lib/converter';
import { generateHubTitle, generateHubDescription } from '@/lib/title-generator';
import { generateCanonicalHub, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo-utils';
import { SITE_URL } from '@/lib/constants';

interface HubPageProps {
  params: Promise<{ ingredient: string }>;
}

export async function generateStaticParams() {
  return Object.keys(ingredients).map((id) => ({ ingredient: id }));
}

export async function generateMetadata({ params }: HubPageProps): Promise<Metadata> {
  const { ingredient } = await params;
  const ing = ingredients[ingredient];
  if (!ing) return { title: 'Not Found' };

  const title = generateHubTitle(ing.name);
  const description = generateHubDescription(ing.name, ing);
  const canonical = generateCanonicalHub(ingredient);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'BakingScience',
      type: 'article',
      images: [{ url: '/og-default.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-default.png'],
    },
    alternates: {
      canonical,
    },
  };
}

export default async function IngredientHubPage({ params }: HubPageProps) {
  const { ingredient: ingredientId } = await params;
  const ing = ingredients[ingredientId];

  if (!ing) notFound();

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: ing.name },
  ];

  const isFat = ing.type === 'fat';
  const isLiquid = ing.type === 'liquid';
  const isFlour = ing.category === 'flour';

  const faqSchema = generateFAQSchema(100, ing.name, ingredientId, ing.faq);
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems.map((item) => ({
    name: item.label,
    item: item.href ? `${SITE_URL}${item.href}` : undefined,
  })));

  const typeLabel = isFlour ? 'flour' : isFat ? 'fat' : isLiquid ? 'liquid' : ing.category;

  return (
    <div className="py-8 sm:py-12">
      {/* JSON-LD Schemas */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Section 1: Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* Section 2: Header */}
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
          {ing.name} &mdash; Grams to Cups Conversion Calculator
        </h1>
        <p className="text-lg text-slate-600">
          Precise measurements for {typeLabel} using three methods{isFat ? ' and multiple states' : ''}
        </p>
      </header>

      {/* Section 3: Quick Calculator */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Quick Converter</h2>
        <HubQuickCalculator ingredientId={ingredientId} />
      </section>

      {/* Ad Slot after Quick Calculator */}
      <section className="mb-10">
        <AdBanner />
      </section>

      {/* Section 4: Description */}
      <section className="mb-10 max-w-3xl">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">About {ing.name}</h2>
        <div className="space-y-4 text-slate-700 leading-relaxed">
          <p>{ing.description}</p>
          <p>
            {ing.name} has a density of <strong>{ing.base_density_g_per_ml} g/ml</strong> when measured
            using the Spoon &amp; Level method.
            {isFat && ing.states && (
              <> Its volume changes depending on state: solid, softened, or melted.</>
            )}
            {!isFat && !isLiquid && (
              <> Like all dry ingredients, the measurement method significantly affects the volume.</>
            )}
            {isLiquid && (
              <> As a liquid ingredient, the measurement method does not affect volume &mdash; grams to cups conversion is consistent.</>
            )}
          </p>
          <p>
            This ingredient belongs to the <strong>{ing.category}</strong> category and is classified
            as a <strong>{ing.type}</strong> ingredient. Per 100g, it provides {ing.nutrition_per_100g.calories} calories,
            {ing.nutrition_per_100g.protein_g}g protein, {ing.nutrition_per_100g.carbs_g}g carbohydrates,
            and {ing.nutrition_per_100g.fat_g}g fat.
          </p>
          <p className="text-xs text-slate-400">
            Density data sourced from {ing.density_source}. US Cup = 236.588ml (NIST).
            Results are estimates &mdash; actual volume may vary by &plusmn;5% depending on brand and batch.
          </p>
        </div>
      </section>

      {/* Section 5: Popular Conversions Table */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Popular Conversions</h2>
        <PopularConversionsTable
          ingredientId={ingredientId}
          ingredientName={ing.name}
          commonWeights={ing.common_weights_g}
        />
      </section>

      {/* Section 6: Pro Tips */}
      {ing.pro_tips.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Expert Tips</h2>
          <div className="space-y-4">
            {ing.pro_tips.map((tip, index) => (
              <div key={index} className="callout-tip">
                <div className="flex gap-3">
                  <span className="text-xl flex-shrink-0 mt-0.5">\ud83d\udca1</span>
                  <p className="text-slate-700 text-sm leading-relaxed">{tip}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Section 7: Nutrition Facts */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Nutrition Facts</h2>
        <NutritionFacts
          ingredientName={ing.name}
          nutrition={ing.nutrition_per_100g}
        />
      </section>

      {/* Section 8: Related Ingredients */}
      {ing.related_ingredients.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Related Ingredients</h2>
          <RelatedIngredientsCards
            relatedIds={ing.related_ingredients}
            currentIngredientName={ing.name}
          />
        </section>
      )}

      {/* Section 9: FAQ */}
      {ing.faq.length > 0 && (
        <section className="mb-10 max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
          <FAQAccordion faqs={ing.faq} />
        </section>
      )}

      {/* Section 10: Ad Slot after FAQ */}
      <section className="mb-8">
        <AdBanner />
      </section>
    </div>
  );
}
