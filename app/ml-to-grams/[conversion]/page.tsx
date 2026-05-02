import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import FAQAccordion from "@/components/seo/FAQAccordion";
import AdBanner from "@/components/ads/AdBanner";
import { SITE_URL } from "@/lib/constants";
import { ML_REFERENCE_INGREDIENTS, ML_VALUES, buildSimpleUnitSlug, formatNumber, mlToGrams, parseSimpleUnitSlug } from "@/lib/unit-conversions";

interface PageProps {
  params: Promise<{ conversion: string }>;
}

function urlFor(ml: number) {
  return `/ml-to-grams/${buildSimpleUnitSlug(ml, "ml", "grams")}/`;
}

export async function generateStaticParams() {
  return ML_VALUES.map((ml) => ({ conversion: buildSimpleUnitSlug(ml, "ml", "grams") }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { conversion } = await params;
  const ml = parseSimpleUnitSlug(conversion, "ml", "grams");
  if (ml === null || !ML_VALUES.includes(ml)) return { title: "Not Found" };
  const title = `${formatNumber(ml)} ml to grams | Water, Flour, Sugar Chart`;
  const description = `Convert ${formatNumber(ml)} ml to grams by ingredient. ${formatNumber(ml)} ml water = ${formatNumber(ml)}g, plus flour, sugar, butter, cooked rice, milk and honey.`;
  const canonical = `${SITE_URL}${urlFor(ml)}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "article", images: [{ url: "/og-default.png", width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title, description, images: ["/og-default.png"] },
  };
}

export default async function MlToGramsPage({ params }: PageProps) {
  const { conversion } = await params;
  const ml = parseSimpleUnitSlug(conversion.toLowerCase(), "ml", "grams");
  if (ml === null || !ML_VALUES.includes(ml)) notFound();
  const faqs = [
    { question: `How many grams is ${formatNumber(ml)} ml of water?`, answer: `${formatNumber(ml)} ml of water is ${formatNumber(ml)} grams at kitchen precision because water is 1 g/ml.` },
    { question: `Why is ${formatNumber(ml)} ml not always ${formatNumber(ml)} grams?`, answer: "Milliliters measure volume and grams measure weight. Water is 1 g/ml, but flour, sugar, butter, rice, milk, and honey have different densities." },
    { question: `How do I convert ${formatNumber(ml)} ml to grams for flour?`, answer: `Multiply ${formatNumber(ml)} ml by the ingredient density. For all-purpose flour at 0.529 g/ml, ${formatNumber(ml)} ml is about ${formatNumber(mlToGrams(ml, 0.529))}g.` },
  ];
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) };

  return (
    <div className="py-8 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="max-w-5xl mx-auto">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "ml to grams" }, { label: `${formatNumber(ml)} ml to grams` }]} />
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">{formatNumber(ml)} ml to Grams</h1>
        <p className="text-lg text-slate-700 mb-6 max-w-3xl">
          <strong>{formatNumber(ml)} ml to grams</strong> depends on density. For water, {formatNumber(ml)} ml equals {formatNumber(ml)}g. For dry and sticky ingredients, use the ingredient-specific chart below.
        </p>

        <section className="card p-4 sm:p-6 mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">{formatNumber(ml)} ml in Grams by Ingredient</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="table-header"><th className="table-cell text-left">Ingredient</th><th className="table-cell text-left">Grams</th><th className="table-cell text-left">Density note</th></tr>
              </thead>
              <tbody>
                {ML_REFERENCE_INGREDIENTS.map((item, index) => (
                  <tr key={item.id} className={`table-row ${index % 2 ? "table-row-alt" : ""}`}>
                    <td className="table-cell"><Link href={`/${item.id}/`} className="font-medium text-accent hover:text-accent-hover">{item.name}</Link></td>
                    <td className="table-cell">{formatNumber(mlToGrams(ml, item.density))}g</td>
                    <td className="table-cell text-slate-600">{item.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">Common ml to grams conversions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {ML_VALUES.filter((value) => value !== ml).map((value) => (
              <Link key={value} href={urlFor(value)} className="card p-3 text-center hover:border-accent transition-colors text-sm">
                <span className="font-medium text-accent">{formatNumber(value)} ml</span>
                <span className="block text-slate-500">{formatNumber(value)}g water</span>
              </Link>
            ))}
          </div>
        </section>
        <section className="mb-8 max-w-3xl">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
          <FAQAccordion faqs={faqs} />
        </section>
        <AdBanner />
      </div>
    </div>
  );
}
