import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import FAQAccordion from "@/components/seo/FAQAccordion";
import NutritionFacts from "@/components/calculator/NutritionFacts";
import RelatedIngredientsCards from "@/components/ui/RelatedIngredientsCards";
import AdBanner from "@/components/ads/AdBanner";
import CupToGramsQuickCalculator from "@/components/calculator/CupToGramsQuickCalculator";
import PopularCupConversionsTable from "@/components/calculator/PopularCupConversionsTable";
import { cupsToGrams, ingredients } from "@/lib/converter";
import { COMMON_CUP_VALUES, formatCupLabel, REVERSE_ENABLED_INGREDIENTS } from "@/lib/cups-to-grams";
import { SITE_URL } from "@/lib/constants";
import { generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo-utils";
import { buildCupToGramsUrl } from "@/lib/slug-utils";

interface ReverseHubPageProps {
  params: Promise<{ ingredient: string }>;
}

function cupWord(cups: number): string {
  return cups > 1 ? "cups" : "cup";
}

export async function generateStaticParams() {
  return REVERSE_ENABLED_INGREDIENTS.map((ingredient) => ({ ingredient }));
}

export async function generateMetadata({ params }: ReverseHubPageProps): Promise<Metadata> {
  const { ingredient: ingredientId } = await params;
  const ing = ingredients[ingredientId];
  if (!ing || !REVERSE_ENABLED_INGREDIENTS.includes(ingredientId)) return { title: "Not Found" };

  const title = `${ing.name} - Cups to Grams Calculator (3 Methods Compared)`;
  const aliasSnippet = ing.aliases.length > 0 ? ` Also known as ${ing.aliases.join(", ")}.` : "";
  const description = `Convert cups of ${ing.name.toLowerCase()} to grams with precision. Includes 1/8, 1/4, 1/3, 1/2, 3/4, 1, and 1 1/4 cups.${aliasSnippet} Spoon & Level, Dip & Sweep, Sifted.`;
  const canonical = `${SITE_URL}/${ingredientId}/cups-to-grams/`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "BakingConverter",
      type: "article",
      images: [{ url: "/og-default.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-default.png"],
    },
    alternates: { canonical },
  };
}

function buildCupFaq(ingredientId: string) {
  const ing = ingredients[ingredientId];
  if (!ing) return [];
  return COMMON_CUP_VALUES.slice(1, 9).map((cups) => {
    const spoon = Math.round(cupsToGrams(cups, ingredientId, "spoon_level"));
    const dip = Math.round(cupsToGrams(cups, ingredientId, "dip_sweep"));
    return {
      question: `How many grams is ${formatCupLabel(cups)} ${cupWord(cups)} of ${ing.name.toLowerCase()}?`,
      answer: `${formatCupLabel(cups)} ${cupWord(cups)} of ${ing.name.toLowerCase()} weighs approximately ${spoon}g using Spoon & Level, or ${dip}g with Dip & Sweep.`,
    };
  });
}

export default async function IngredientCupsToGramsHubPage({ params }: ReverseHubPageProps) {
  const { ingredient: ingredientId } = await params;
  const ing = ingredients[ingredientId];
  if (!ing || !REVERSE_ENABLED_INGREDIENTS.includes(ingredientId)) notFound();

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: ing.name, href: `/${ingredientId}/` },
    { label: "Cups to Grams" },
  ];

  const faqs = [...buildCupFaq(ingredientId), ...ing.faq.slice(0, 3)];
  const faqSchema = generateFAQSchema(1, ing.name, ingredientId, faqs);
  const breadcrumbSchema = generateBreadcrumbSchema(
    breadcrumbItems.map((item) => ({
      name: item.label,
      item: item.href ? `${SITE_URL}${item.href}` : undefined,
    })),
  );

  return (
    <div className="py-8 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Breadcrumbs items={breadcrumbItems} />

      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
          {ing.name} - Cups to Grams Conversion Calculator
        </h1>
        <p className="text-lg text-slate-600">
          Convert cups to grams for {ing.name.toLowerCase()} with method-based precision.
        </p>
        <div className="mt-4">
          <p className="text-sm font-medium text-slate-700 mb-2">Conversion direction</p>
          <div className="flex flex-wrap gap-2">
            <Link href={`/${ingredientId}/`} className="tab-button">
              Grams -&gt; Cups
            </Link>
            <Link href={`/${ingredientId}/cups-to-grams/`} className="tab-button tab-button-active">
              Cups -&gt; Grams
            </Link>
          </div>
        </div>
      </header>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Quick Converter</h2>
        <CupToGramsQuickCalculator ingredientId={ingredientId} />
      </section>

      <section className="mb-10">
        <AdBanner />
      </section>

      <section className="mb-10 max-w-3xl">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">About {ing.name}</h2>
        <div className="space-y-4 text-slate-700 leading-relaxed">
          <p>{ing.description}</p>
          <p>
            For reverse conversion, 1 cup of <strong>{ing.name.toLowerCase()}</strong> weighs approximately{" "}
            <strong>{Math.round(cupsToGrams(1, ingredientId, "spoon_level"))}g</strong> with Spoon &amp; Level.
          </p>
          <p className="text-xs text-slate-400">
            Density data sourced from {ing.density_source}. US Cup = 236.588ml (NIST). Results are estimates.
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Popular Conversions</h2>
        <PopularCupConversionsTable ingredientId={ingredientId} />
      </section>

      {ing.pro_tips.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Expert Tips</h2>
          <div className="space-y-4">
            {ing.pro_tips.map((tip, index) => (
              <div key={index} className="callout-tip">
                <div className="flex gap-3">
                  <span className="text-xl flex-shrink-0 mt-0.5">{"\uD83D\uDCA1"}</span>
                  <p className="text-slate-700 text-sm leading-relaxed">{tip}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Nutrition Facts</h2>
        <NutritionFacts ingredientName={ing.name} nutrition={ing.nutrition_per_100g} />
      </section>

      {ing.related_ingredients.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Related Ingredients</h2>
          <RelatedIngredientsCards relatedIds={ing.related_ingredients} currentIngredientName={ing.name} />
        </section>
      )}

      <section className="mb-10 max-w-3xl">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions About {ing.name} Cups to Grams</h2>
        <FAQAccordion faqs={faqs} />
      </section>

      <section className="mb-8">
        <AdBanner />
      </section>
    </div>
  );
}

