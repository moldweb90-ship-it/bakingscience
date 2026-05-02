import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import FAQAccordion from "@/components/seo/FAQAccordion";
import AdBanner from "@/components/ads/AdBanner";
import { SITE_URL } from "@/lib/constants";
import { ML_VALUES, buildSimpleUnitSlug, formatNumber, gramsToOunces, parseSimpleUnitSlug } from "@/lib/unit-conversions";

interface PageProps {
  params: Promise<{ conversion: string }>;
}

function urlFor(grams: number) {
  return `/grams-to-ounces/${buildSimpleUnitSlug(grams, "grams", "ounces")}/`;
}

export async function generateStaticParams() {
  return ML_VALUES.map((grams) => ({ conversion: buildSimpleUnitSlug(grams, "grams", "ounces") }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { conversion } = await params;
  const grams = parseSimpleUnitSlug(conversion, "grams", "ounces");
  if (grams === null || !ML_VALUES.includes(grams)) return { title: "Not Found" };
  const ounces = gramsToOunces(grams);
  const title = `${formatNumber(grams)} grams to ounces: ${formatNumber(ounces, 3)} oz | BakingConverter`;
  const description = `Convert ${formatNumber(grams)} grams to ounces for kitchen measurement. ${formatNumber(grams)}g equals ${formatNumber(ounces, 3)} weight ounces.`;
  const canonical = `${SITE_URL}${urlFor(grams)}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "article", images: [{ url: "/og-default.png", width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title, description, images: ["/og-default.png"] },
  };
}

export default async function GramsToOuncesPage({ params }: PageProps) {
  const { conversion } = await params;
  const grams = parseSimpleUnitSlug(conversion.toLowerCase(), "grams", "ounces");
  if (grams === null || !ML_VALUES.includes(grams)) notFound();
  const ounces = gramsToOunces(grams);
  const faqs = [
    { question: `How many ounces is ${formatNumber(grams)} grams?`, answer: `${formatNumber(grams)} grams equals ${formatNumber(ounces, 3)} weight ounces.` },
    { question: "What formula converts grams to ounces?", answer: "ounces = grams / 28.3495. This is a weight conversion, not a fluid-ounce conversion." },
    { question: "Are grams better than ounces for baking?", answer: "Grams are usually easier for precise baking because metric weights avoid fractions and ingredient density confusion." },
  ];
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) };

  return (
    <div className="py-8 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="max-w-4xl mx-auto">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Grams to Ounces" }, { label: `${formatNumber(grams)}g to oz` }]} />
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">{formatNumber(grams)} Grams to Ounces</h1>
        <p className="text-lg text-slate-700 mb-6 max-w-3xl">
          <strong>{formatNumber(grams)} grams</strong> equals <strong>{formatNumber(ounces, 3)} ounces</strong> by weight.
        </p>
        <section className="card p-5 sm:p-6 mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Conversion Formula</h2>
          <p className="text-slate-700">ounces = grams / 28.3495</p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">Common grams to ounces conversions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {ML_VALUES.filter((value) => value !== grams).map((value) => (
              <Link key={value} href={urlFor(value)} className="card p-3 text-center hover:border-accent transition-colors text-sm">
                <span className="font-medium text-accent">{formatNumber(value)}g</span>
                <span className="block text-slate-500">{formatNumber(gramsToOunces(value), 3)} oz</span>
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
