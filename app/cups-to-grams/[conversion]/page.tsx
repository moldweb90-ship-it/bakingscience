import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import FAQAccordion from "@/components/seo/FAQAccordion";
import AdBanner from "@/components/ads/AdBanner";
import { cupsToGrams, ingredients } from "@/lib/converter";
import { SITE_URL } from "@/lib/constants";
import { GENERIC_CUP_VALUES, GENERIC_INGREDIENT_IDS, cupWord, formatCupAmount } from "@/lib/generic-conversions";
import { buildCupConversionSlug, buildCupToGramsUrl, parseCupConversionSlug } from "@/lib/slug-utils";

interface GenericCupsPageProps {
  params: Promise<{ conversion: string }>;
}

function buildGenericUrl(cups: number): string {
  return `/cups-to-grams/${buildCupConversionSlug(cups)}/`;
}

function formatGrams(value: number): string {
  return `${Math.round(value)}g`;
}

function rowsForCups(cups: number) {
  return GENERIC_INGREDIENT_IDS
    .map((ingredientId) => {
      const ingredient = ingredients[ingredientId];
      if (!ingredient) return null;
      const spoon = cupsToGrams(cups, ingredientId, "spoon_level");
      const dip = cupsToGrams(cups, ingredientId, "dip_sweep");
      const sifted = cupsToGrams(cups, ingredientId, "sifted");
      return { ingredientId, ingredient, spoon, dip, sifted };
    })
    .filter(Boolean);
}

function faqForCups(cups: number) {
  const label = `${formatCupAmount(cups)} ${cupWord(cups)}`;
  return [
    {
      question: `How many grams is ${label}?`,
      answer: `${label} is a different gram weight for each ingredient. For example, ${label} all-purpose flour is ${formatGrams(cupsToGrams(cups, "all-purpose-flour"))}, while ${label} granulated sugar is ${formatGrams(cupsToGrams(cups, "granulated-sugar"))}.`,
    },
    {
      question: `Why does ${label} have different gram values?`,
      answer: "A cup is a volume measure. Grams measure weight. Dense ingredients weigh more per cup than light or aerated ingredients.",
    },
    {
      question: `Should I use grams or cups for baking?`,
      answer: "Grams are more accurate. If a recipe gives cups, use the ingredient-specific chart and a consistent measuring method such as Spoon & Level.",
    },
  ];
}

export async function generateStaticParams() {
  return GENERIC_CUP_VALUES.map((cups) => ({
    conversion: buildCupConversionSlug(cups),
  }));
}

export async function generateMetadata({ params }: GenericCupsPageProps): Promise<Metadata> {
  const { conversion } = await params;
  const cups = parseCupConversionSlug(conversion);
  if (cups === null || !GENERIC_CUP_VALUES.includes(cups)) return { title: "Not Found" };

  const label = `${formatCupAmount(cups)} ${cupWord(cups)}`;
  const flourGrams = cupsToGrams(cups, "all-purpose-flour");
  const sugarGrams = cupsToGrams(cups, "granulated-sugar");
  const title = `${label} to Grams - Flour, Sugar, Butter Chart`;
  const description = `${label} is ${formatGrams(flourGrams)} flour but ${formatGrams(sugarGrams)} sugar. Compare exact grams for 18 baking ingredients before you measure.`;
  const canonical = `${SITE_URL}${buildGenericUrl(cups)}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      images: [{ url: "/og-default.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-default.png"],
    },
  };
}

export default async function GenericCupsToGramsPage({ params }: GenericCupsPageProps) {
  const { conversion } = await params;
  const normalized = conversion.toLowerCase();
  if (conversion !== normalized) redirect(`/cups-to-grams/${normalized}/`);

  const cups = parseCupConversionSlug(normalized);
  if (cups === null || !GENERIC_CUP_VALUES.includes(cups)) notFound();

  const label = `${formatCupAmount(cups)} ${cupWord(cups)}`;
  const flourGrams = cupsToGrams(cups, "all-purpose-flour");
  const sugarGrams = cupsToGrams(cups, "granulated-sugar");
  const rows = rowsForCups(cups);
  const faqs = faqForCups(cups);
  const nearbyCups = GENERIC_CUP_VALUES.filter((value) => value !== cups)
    .sort((a, b) => Math.abs(a - cups) - Math.abs(b - cups))
    .slice(0, 12)
    .sort((a, b) => a - b);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <div className="py-8 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="max-w-5xl mx-auto">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Cups to Grams", href: "/cups-to-grams/" },
            { label: `${label} to grams` },
          ]}
        />

        <section className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            {label} to Grams: Flour, Sugar, Butter and More
          </h1>
          <p className="text-lg text-slate-700 max-w-3xl leading-relaxed">
            <strong>{label} to grams</strong> changes by ingredient. A cup of flour is not a cup of sugar by weight, so this chart gives the numbers recipe snippets usually flatten.
          </p>
        </section>

        <section className="card p-5 sm:p-6 mb-8 border-accent/40">
          <p className="text-sm font-semibold uppercase text-accent-hover mb-2">Quick answer</p>
          <p className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
            {label} equals {formatGrams(flourGrams)} all-purpose flour, but {formatGrams(sugarGrams)} granulated sugar.
          </p>
          <p className="text-slate-600 mt-3 leading-relaxed">
            Pick the ingredient before you bake. The wrong cup-to-grams conversion can add enough flour or sugar to change the texture.
          </p>
        </section>

        <section className="card p-4 sm:p-6 mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
            {label} in Grams by Ingredient
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="table-header">
                  <th className="table-cell text-left">Ingredient</th>
                  <th className="table-cell text-left">Spoon &amp; Level</th>
                  <th className="table-cell text-left">Dip &amp; Sweep</th>
                  <th className="table-cell text-left">Sifted</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => row && (
                  <tr key={row.ingredientId} className={`table-row ${index % 2 === 1 ? "table-row-alt" : ""}`}>
                    <td className="table-cell">
                      <Link href={buildCupToGramsUrl(row.ingredientId, cups)} className="font-medium text-accent hover:text-accent-hover">
                        {label} {row.ingredient.name.toLowerCase()}
                      </Link>
                    </td>
                    <td className="table-cell">{formatGrams(row.spoon)}</td>
                    <td className="table-cell">{formatGrams(row.dip)}</td>
                    <td className="table-cell">{formatGrams(row.sifted)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">Popular Nearby Cup Conversions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {nearbyCups.map((value) => (
              <Link key={value} href={buildGenericUrl(value)} className="card p-3 text-center hover:border-accent transition-colors text-sm">
                <span className="font-medium text-accent">{formatCupAmount(value)} {cupWord(value)} to grams</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-8 max-w-3xl">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">
            Frequently Asked Questions
          </h2>
          <FAQAccordion faqs={faqs} />
        </section>

        <AdBanner />
      </div>
    </div>
  );
}
