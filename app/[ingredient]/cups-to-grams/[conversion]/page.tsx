import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import FAQAccordion from "@/components/seo/FAQAccordion";
import VisualMeasurementGuide from "@/components/calculator/VisualMeasurementGuide";
import NutritionBlock from "@/components/calculator/NutritionBlock";
import ProTips from "@/components/calculator/ProTips";
import WhyItMattersCupsToGrams from "@/components/calculator/WhyItMattersCupsToGrams";
import RecipeContext from "@/components/calculator/RecipeContext";
import AdBanner from "@/components/ads/AdBanner";
import AdSidebar from "@/components/ads/AdSidebar";
import CupToGramsLeafCalculator from "@/components/calculator/CupToGramsLeafCalculator";
import { cupsToGrams, ingredients } from "@/lib/converter";
import { findMatchingRecipes } from "@/lib/recipe-scaler";
import { buildCupConversionSlug, buildCupToGramsUrl, parseCupConversionSlug } from "@/lib/slug-utils";
import { COMMON_CUP_VALUES, formatCupLabel, REVERSE_ENABLED_INGREDIENTS } from "@/lib/cups-to-grams";
import { SITE_URL } from "@/lib/constants";
import { generateBreadcrumbSchema, generateFAQSchema, generateOpenGraph, generateTwitterCard } from "@/lib/seo-utils";

interface ReverseLeafPageProps {
  params: Promise<{ ingredient: string; conversion: string }>;
}

function formatGrams(value: number): string {
  return `${Math.round(value)}`;
}

function cupWord(cups: number): string {
  return cups > 1 ? "cups" : "cup";
}

function buildReverseFaq(ingredientId: string, cups: number) {
  const ing = ingredients[ingredientId];
  if (!ing) return [];
  const spoon = cupsToGrams(cups, ingredientId, "spoon_level");
  const dip = cupsToGrams(cups, ingredientId, "dip_sweep");
  const sifted = cupsToGrams(cups, ingredientId, "sifted");
  const methodSensitive = Math.round(spoon) !== Math.round(dip) || Math.round(spoon) !== Math.round(sifted);
  const baseFaq = [
    {
      question: `How many grams is ${formatCupLabel(cups)} ${cupWord(cups)} of ${ing.name.toLowerCase()}?`,
      answer: `${formatCupLabel(cups)} ${cupWord(cups)} of ${ing.name.toLowerCase()} equals about ${formatGrams(spoon)}g using Spoon & Level. Dip & Sweep: ${formatGrams(dip)}g. Sifted: ${formatGrams(sifted)}g.`,
    },
    {
      question: `Does measurement method matter for ${ing.name.toLowerCase()} cups to grams?`,
      answer: methodSensitive
        ? `Yes. The same cup volume can vary by method. For this amount: Spoon & Level ${formatGrams(spoon)}g, Dip & Sweep ${formatGrams(dip)}g, Sifted ${formatGrams(sifted)}g.`
        : `No. For ${ing.name.toLowerCase()}, cup-to-grams conversion is based on volume and density, so this amount stays about ${formatGrams(spoon)}g across measuring methods.`,
    },
    ...(cups === 1
      ? [
          {
            question: `How many grams is 1 1/4 cups of ${ing.name.toLowerCase()}?`,
            answer: `1 1/4 cups of ${ing.name.toLowerCase()} is approximately ${formatGrams(cupsToGrams(1.25, ingredientId, "spoon_level"))}g with Spoon & Level.`,
          },
        ]
      : [
          {
            question: `How many grams is 1 cup of ${ing.name.toLowerCase()}?`,
            answer: `1 cup of ${ing.name.toLowerCase()} is approximately ${formatGrams(cupsToGrams(1, ingredientId, "spoon_level"))}g with Spoon & Level.`,
          },
        ]),
  ];

  if (ingredientId === "cake-flour") {
    baseFaq.push({
      question: `How many grams is 1 cup sifted cake flour?`,
      answer: `1 cup sifted cake flour is approximately ${formatGrams(cupsToGrams(1, ingredientId, "sifted"))}g. Sifted cake flour is lighter than spoon & level.`,
    });
    baseFaq.push({
      question: "Is pastry flour the same as cake flour in grams?",
      answer: "In many recipes, pastry flour and cake flour are treated similarly. Use the same cup-to-grams conversion as cake flour, then adjust by recipe texture if needed.",
    });
  }

  return baseFaq;
}

export async function generateStaticParams() {
  return REVERSE_ENABLED_INGREDIENTS.flatMap((ingredient) =>
    COMMON_CUP_VALUES.map((cups) => ({
      ingredient,
      conversion: buildCupConversionSlug(cups),
    })),
  );
}

export async function generateMetadata({ params }: ReverseLeafPageProps): Promise<Metadata> {
  const { ingredient: ingredientId, conversion } = await params;
  const ing = ingredients[ingredientId];
  if (!ing || !REVERSE_ENABLED_INGREDIENTS.includes(ingredientId)) return { title: "Not Found" };

  const cups = parseCupConversionSlug(conversion);
  if (cups === null) return { title: "Not Found" };

  const grams = cupsToGrams(cups, ingredientId, "spoon_level");
  const cupLabel = formatCupLabel(cups);
  const title = `${cupLabel} ${cupWord(cups)} ${ing.name.toLowerCase()} in grams - ${formatGrams(grams)}g exact`;
  const cakeAlias = ingredientId === "cake-flour" ? " (pastry flour)" : "";
  const description = `${cupLabel} ${cupWord(cups)} ${ing.name.toLowerCase()}${cakeAlias} = ${formatGrams(grams)}g. See Spoon & Level vs packed/sifted results, recipe notes, and why this conversion matters.`;
  const canonical = `${SITE_URL}${buildCupToGramsUrl(ingredientId, cups)}`;

  return {
    title,
    description,
    openGraph: {
      ...generateOpenGraph(title, description, canonical),
      type: "article",
      images: [{ url: "/og-default.png", width: 1200, height: 630 }],
    },
    twitter: {
      ...generateTwitterCard(title, description),
      images: ["/og-default.png"],
    },
    alternates: { canonical },
  };
}

export default async function CupsToGramsLeafPage({ params }: ReverseLeafPageProps) {
  const { ingredient: ingredientId, conversion } = await params;
  const ing = ingredients[ingredientId];
  if (!ing || !REVERSE_ENABLED_INGREDIENTS.includes(ingredientId)) notFound();

  const normalized = conversion.toLowerCase();
  if (normalized !== conversion) {
    redirect(`/${ingredientId}/cups-to-grams/${normalized}/`);
  }

  const cups = parseCupConversionSlug(normalized);
  if (cups === null) notFound();

  const canonicalSlug = buildCupToGramsUrl(ingredientId, cups).split("/").filter(Boolean).pop();
  if (canonicalSlug && canonicalSlug !== normalized) {
    redirect(`/${ingredientId}/cups-to-grams/${canonicalSlug}/`);
  }

  const grams = cupsToGrams(cups, ingredientId, "spoon_level");
  const displayGrams = Math.round(grams);
  const cupLabel = formatCupLabel(cups);
  const dip = cupsToGrams(cups, ingredientId, "dip_sweep");
  const sifted = cupsToGrams(cups, ingredientId, "sifted");
  const methodSensitive = Math.round(grams) !== Math.round(dip) || Math.round(grams) !== Math.round(sifted);
  const allFaqs = buildReverseFaq(ingredientId, cups);

  const matches = findMatchingRecipes(ingredientId, displayGrams);
  const matchedRecipe = matches.length > 0 ? matches[0].recipe : null;

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: ing.name, href: `/${ingredientId}/` },
    { label: "Cups to Grams", href: `/${ingredientId}/cups-to-grams/` },
    { label: `${cupLabel} ${cupWord(cups)} to grams` },
  ];

  const faqSchema = generateFAQSchema(displayGrams, ing.name, ingredientId, allFaqs);
  const breadcrumbSchema = generateBreadcrumbSchema(
    breadcrumbItems.map((item) => ({
      name: item.label,
      item: item.href ? `${SITE_URL}${item.href}` : undefined,
    })),
  );

  const nearbyCups = COMMON_CUP_VALUES.filter((v) => Math.abs(v - cups) > 0.001).slice(0, 8);
  const sameWeightRelated = ing.related_ingredients
    .filter((id) => ingredients[id] && REVERSE_ENABLED_INGREDIENTS.includes(id))
    .slice(0, 5);

  return (
    <div className="py-8 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 min-w-0">
          <Breadcrumbs items={breadcrumbItems} />

          <p className="text-lg text-slate-700 mb-6 max-w-2xl leading-relaxed">
            <strong>{cupLabel} {cupWord(cups)} of {ing.name.toLowerCase()}</strong> equals <strong>{formatGrams(grams)} grams</strong> using Spoon &amp; Level.
            Dip &amp; Sweep: {formatGrams(dip)}g. Sifted: {formatGrams(sifted)}g.
          </p>

          <section className="card p-5 sm:p-6 mb-8 border-accent/40">
            <p className="text-sm font-semibold uppercase text-accent-hover mb-2">Baker's quick answer</p>
            <p className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
              {cupLabel} {cupWord(cups)} {ing.name.toLowerCase()} = {formatGrams(grams)}g with Spoon &amp; Level.
            </p>
            <p className="text-slate-600 mt-3 leading-relaxed">
              Use this exact ingredient page instead of a generic cup chart. {ing.name} has its own density, and the wrong number can change sweetness, spread, moisture, or crumb.
            </p>
          </section>

          <CupToGramsLeafCalculator
            ingredientId={ingredientId}
            ingredientName={ing.name}
            ingredientType={ing.type}
            cups={cups}
            states={ing.states}
            matchedRecipe={matchedRecipe}
          />

          <section className="mt-8">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
              {methodSensitive
                ? `How to Measure ${cupLabel} ${cupWord(cups)} of ${ing.name} - 3 Methods Compared`
                : `How to Measure ${cupLabel} ${cupWord(cups)} of ${ing.name}`}
            </h2>
            {methodSensitive ? (
              <VisualMeasurementGuide
                ingredientId={ingredientId}
                ingredientName={ing.name}
                ingredientDensity={ing.base_density_g_per_ml}
                weightG={displayGrams}
                photoAvailable={ing.photo_available}
                showTitle={false}
              />
            ) : (
              <div className="card p-6 text-slate-700 leading-relaxed">
                <p>
                  {ing.name} is measured by volume and density here, so packing, scooping, or sifting does not change
                  the cup-to-grams result the way it can for flour or powdered sugar.
                </p>
              </div>
            )}
          </section>

          <section className="mt-8">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
              {ing.name} - Cups to Grams Conversion Table
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {nearbyCups.map((value) => (
                <Link key={value} href={buildCupToGramsUrl(ingredientId, value)} className="card p-3 text-center hover:border-accent transition-colors text-sm">
                  <span className="font-medium text-accent">{formatCupLabel(value)} {cupWord(value)}</span>
                  <span className="block text-slate-500 text-xs">{formatGrams(cupsToGrams(value, ingredientId, "spoon_level"))}g</span>
                </Link>
              ))}
            </div>
          </section>

          {matchedRecipe && (
            <section className="mt-8">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                Baking Recipes Using {ing.name} (in Grams &amp; Cups)
              </h2>
              <RecipeContext ingredientId={ingredientId} ingredientName={ing.name} weightG={displayGrams} />
            </section>
          )}

          <section className="mt-8">
            <NutritionBlock
              ingredientName={ing.name}
              ingredientDensity={ing.base_density_g_per_ml}
              weightG={displayGrams}
              nutritionPer100g={ing.nutrition_per_100g}
            />
          </section>

          {ing.pro_tips.length > 0 && (
            <section className="mt-8">
              <ProTips tips={ing.pro_tips} ingredientName={ing.name} weightG={displayGrams} fractionText={cupLabel} />
            </section>
          )}

          <section className="mt-8">
            <WhyItMattersCupsToGrams ingredientName={ing.name} ingredientId={ingredientId} cups={cups} />
          </section>

          <section className="mt-8 max-w-3xl">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">
              Frequently Asked Questions - {ing.name} Cups to Grams
            </h2>
            <FAQAccordion faqs={allFaqs} />
          </section>

          <section className="mt-8">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">More Conversions</h2>
            {sameWeightRelated.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-slate-800 mb-3">{cupLabel} {cupWord(cups)} of Other Ingredients</h3>
                <div className="flex flex-wrap gap-2">
                  {sameWeightRelated.map((relId) => {
                    const rel = ingredients[relId];
                    if (!rel) return null;
                    return (
                      <Link key={relId} href={buildCupToGramsUrl(relId, cups)} className="btn-secondary text-sm px-3 py-2 min-h-[36px]">
                        {cupLabel} {cupWord(cups)} {rel.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </section>

          <section className="mt-8">
            <AdBanner />
          </section>
        </div>

        <aside className="hidden lg:block w-[300px] flex-shrink-0">
          <div className="sticky top-20 space-y-6">
            <AdSidebar />
            <div className="card p-4">
              <h3 className="font-semibold text-slate-900 mb-3 text-sm">Popular Cups to Grams</h3>
              <ul className="space-y-2">
                {COMMON_CUP_VALUES.slice(0, 8).map((value) => (
                  <li key={value}>
                    <Link href={buildCupToGramsUrl(ingredientId, value)} className="text-sm text-slate-600 hover:text-accent transition-colors">
                      {formatCupLabel(value)} {cupWord(value)} in grams
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

