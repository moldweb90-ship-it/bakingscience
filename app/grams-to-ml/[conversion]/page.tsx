import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import FAQAccordion from "@/components/seo/FAQAccordion";
import AdBanner from "@/components/ads/AdBanner";
import { SITE_URL } from "@/lib/constants";
import { ML_REFERENCE_INGREDIENTS, ML_VALUES, buildSimpleUnitSlug, formatNumber, gramsToMl, parseSimpleUnitSlug } from "@/lib/unit-conversions";

interface PageProps {
  params: Promise<{ conversion: string }>;
}

function urlFor(grams: number) {
  return `/grams-to-ml/${buildSimpleUnitSlug(grams, "grams", "ml")}/`;
}

export async function generateStaticParams() {
  return ML_VALUES.map((grams) => ({ conversion: buildSimpleUnitSlug(grams, "grams", "ml") }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { conversion } = await params;
  const grams = parseSimpleUnitSlug(conversion, "grams", "ml");
  if (grams === null || !ML_VALUES.includes(grams)) return { title: "Not Found" };
  const title = `${formatNumber(grams)} grams to ml | Water, Flour, Sugar Chart`;
  const description = `Convert ${formatNumber(grams)} grams to milliliters by ingredient. ${formatNumber(grams)}g water = ${formatNumber(grams)}ml, plus flour, sugar, butter, rice, milk and honey.`;
  const canonical = `${SITE_URL}${urlFor(grams)}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "article", images: [{ url: "/og-default.png", width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title, description, images: ["/og-default.png"] },
  };
}

export default async function GramsToMlPage({ params }: PageProps) {
  const { conversion } = await params;
  const grams = parseSimpleUnitSlug(conversion.toLowerCase(), "grams", "ml");
  if (grams === null || !ML_VALUES.includes(grams)) notFound();
  const flourMl = gramsToMl(grams, 0.529);
  const faqs = [
    { question: `How many ml is ${formatNumber(grams)} grams of water?`, answer: `${formatNumber(grams)} grams of water is ${formatNumber(grams)} ml at kitchen precision.` },
    { question: `How many ml is ${formatNumber(grams)} grams of flour?`, answer: `${formatNumber(grams)} grams of all-purpose flour is about ${formatNumber(flourMl)} ml using Spoon & Level density.` },
    { question: "Why do grams to ml conversions vary?", answer: "Grams are weight and milliliters are volume. A dense ingredient needs fewer milliliters for the same gram weight than a light ingredient." },
  ];
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) };

  return (
    <div className="py-8 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="max-w-5xl mx-auto">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "grams to ml" }, { label: `${formatNumber(grams)} grams to ml` }]} />
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">{formatNumber(grams)} Grams to ml</h1>
        <p className="text-lg text-slate-700 mb-6 max-w-3xl">
          <strong>{formatNumber(grams)} grams to ml</strong> is ingredient-specific. Water is simple: {formatNumber(grams)}g = {formatNumber(grams)}ml. Flour, sugar, rice, butter, and honey need density-based conversion.
        </p>
        <section className="card p-4 sm:p-6 mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">{formatNumber(grams)} Grams in ml by Ingredient</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="table-header"><th className="table-cell text-left">Ingredient</th><th className="table-cell text-left">Milliliters</th><th className="table-cell text-left">Density note</th></tr></thead>
              <tbody>
                {ML_REFERENCE_INGREDIENTS.map((item, index) => (
                  <tr key={item.id} className={`table-row ${index % 2 ? "table-row-alt" : ""}`}>
                    <td className="table-cell"><Link href={`/${item.id}/`} className="font-medium text-accent hover:text-accent-hover">{item.name}</Link></td>
                    <td className="table-cell">{formatNumber(gramsToMl(grams, item.density))} ml</td>
                    <td className="table-cell text-slate-600">{item.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">Common grams to ml conversions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {ML_VALUES.filter((value) => value !== grams).map((value) => (
              <Link key={value} href={urlFor(value)} className="card p-3 text-center hover:border-accent transition-colors text-sm">
                <span className="font-medium text-accent">{formatNumber(value)}g</span>
                <span className="block text-slate-500">{formatNumber(value)}ml water</span>
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
