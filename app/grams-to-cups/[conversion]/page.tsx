import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import FAQAccordion from "@/components/seo/FAQAccordion";
import AdBanner from "@/components/ads/AdBanner";
import { convert, ingredients } from "@/lib/converter";
import { SITE_URL } from "@/lib/constants";
import { GENERIC_GRAM_WEIGHTS, GENERIC_INGREDIENT_IDS, formatCupAmount, cupWord } from "@/lib/generic-conversions";
import { buildLeafUrl, parseConversionSlug } from "@/lib/slug-utils";

interface GenericGramsPageProps {
  params: Promise<{ conversion: string }>;
}

function buildGenericUrl(weight: number): string {
  return `/grams-to-cups/${weight}-grams-to-cups/`;
}

function formatCupResult(cups: number): string {
  return `${formatCupAmount(cups)} ${cupWord(cups)}`;
}

function rowsForWeight(weight: number) {
  return GENERIC_INGREDIENT_IDS
    .map((ingredientId) => {
      const ingredient = ingredients[ingredientId];
      if (!ingredient) return null;
      const spoon = convert(weight, ingredientId, "spoon_level").cups;
      const dip = convert(weight, ingredientId, "dip_sweep").cups;
      const sifted = convert(weight, ingredientId, "sifted").cups;
      return { ingredientId, ingredient, spoon, dip, sifted };
    })
    .filter(Boolean);
}

function faqForWeight(weight: number) {
  return [
    {
      question: `How many cups is ${weight} grams?`,
      answer: `${weight} grams can be a different number of cups depending on the ingredient. For example, ${weight}g all-purpose flour is ${formatCupResult(convert(weight, "all-purpose-flour").cups)}, while ${weight}g granulated sugar is ${formatCupResult(convert(weight, "granulated-sugar").cups)}.`,
    },
    {
      question: `Why does ${weight}g change by ingredient?`,
      answer: "Cups measure volume, while grams measure weight. Flour, sugar, butter, oats, and liquids have different densities, so the same gram weight fills a different cup volume.",
    },
    {
      question: `What is the most accurate way to convert ${weight}g to cups?`,
      answer: "Choose the exact ingredient first, then use the ingredient-specific conversion. Spoon & Level is the recommended method for dry baking ingredients.",
    },
  ];
}

export async function generateStaticParams() {
  return GENERIC_GRAM_WEIGHTS.map((weight) => ({
    conversion: `${weight}-grams-to-cups`,
  }));
}

export async function generateMetadata({ params }: GenericGramsPageProps): Promise<Metadata> {
  const { conversion } = await params;
  const weight = parseConversionSlug(conversion);
  if (weight === null || !GENERIC_GRAM_WEIGHTS.includes(weight)) return { title: "Not Found" };

  const flourCups = convert(weight, "all-purpose-flour").cups;
  const sugarCups = convert(weight, "granulated-sugar").cups;
  const title = `${weight} grams to cups conversion chart | BakingConverter`;
  const description = `${weight} grams to cups depends on the ingredient: ${formatCupResult(flourCups)} all-purpose flour, ${formatCupResult(sugarCups)} granulated sugar, plus butter, brown sugar, oats and more.`;
  const canonical = `${SITE_URL}${buildGenericUrl(weight)}`;

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

export default async function GenericGramsToCupsPage({ params }: GenericGramsPageProps) {
  const { conversion } = await params;
  const normalized = conversion.toLowerCase();
  if (conversion !== normalized) redirect(`/grams-to-cups/${normalized}/`);

  const weight = parseConversionSlug(normalized);
  if (weight === null || !GENERIC_GRAM_WEIGHTS.includes(weight)) notFound();

  const rows = rowsForWeight(weight);
  const faqs = faqForWeight(weight);
  const nearbyWeights = GENERIC_GRAM_WEIGHTS.filter((value) => value !== weight)
    .sort((a, b) => Math.abs(a - weight) - Math.abs(b - weight))
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
            { label: "Grams to Cups", href: "/" },
            { label: `${weight}g to cups` },
          ]}
        />

        <section className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            {weight} Grams to Cups Conversion Chart
          </h1>
          <p className="text-lg text-slate-700 max-w-3xl leading-relaxed">
            <strong>{weight} grams to cups</strong> depends on what you are measuring. Use this chart to compare common baking ingredients, then open the exact ingredient page for method-specific details.
          </p>
        </section>

        <section className="card p-4 sm:p-6 mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
            {weight}g to Cups by Ingredient
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
                      <Link href={buildLeafUrl(row.ingredientId, weight)} className="font-medium text-accent hover:text-accent-hover">
                        {weight}g {row.ingredient.name.toLowerCase()}
                      </Link>
                    </td>
                    <td className="table-cell">{formatCupResult(row.spoon)}</td>
                    <td className="table-cell">{formatCupResult(row.dip)}</td>
                    <td className="table-cell">{formatCupResult(row.sifted)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">Popular Nearby Conversions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {nearbyWeights.map((value) => (
              <Link key={value} href={buildGenericUrl(value)} className="card p-3 text-center hover:border-accent transition-colors text-sm">
                <span className="font-medium text-accent">{value}g to cups</span>
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
