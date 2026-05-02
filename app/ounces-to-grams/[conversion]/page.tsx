import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import FAQAccordion from "@/components/seo/FAQAccordion";
import AdBanner from "@/components/ads/AdBanner";
import { SITE_URL } from "@/lib/constants";
import { OUNCE_VALUES, buildSimpleUnitSlug, fluidOuncesToMl, formatNumber, ouncesToGrams, parseSimpleUnitSlug } from "@/lib/unit-conversions";

interface PageProps {
  params: Promise<{ conversion: string }>;
}

function urlFor(oz: number) {
  return `/ounces-to-grams/${buildSimpleUnitSlug(oz, "ounces", "grams")}/`;
}

export async function generateStaticParams() {
  return OUNCE_VALUES.map((oz) => ({ conversion: buildSimpleUnitSlug(oz, "ounces", "grams") }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { conversion } = await params;
  const oz = parseSimpleUnitSlug(conversion, "ounces", "grams");
  if (oz === null || !OUNCE_VALUES.includes(oz)) return { title: "Not Found" };
  const grams = ouncesToGrams(oz);
  const title = `${formatNumber(oz)} oz to grams: ${formatNumber(grams)}g | BakingConverter`;
  const description = `Convert ${formatNumber(oz)} ounces to grams for kitchen measurement. ${formatNumber(oz)} weight oz equals ${formatNumber(grams)}g, with fluid ounce notes for liquids.`;
  const canonical = `${SITE_URL}${urlFor(oz)}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "article", images: [{ url: "/og-default.png", width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title, description, images: ["/og-default.png"] },
  };
}

export default async function OuncesToGramsPage({ params }: PageProps) {
  const { conversion } = await params;
  const oz = parseSimpleUnitSlug(conversion.toLowerCase(), "ounces", "grams");
  if (oz === null || !OUNCE_VALUES.includes(oz)) notFound();
  const grams = ouncesToGrams(oz);
  const ml = fluidOuncesToMl(oz);
  const waterGrams = ml;
  const faqs = [
    { question: `How many grams is ${formatNumber(oz)} oz?`, answer: `${formatNumber(oz)} weight ounces equals ${formatNumber(grams)} grams.` },
    { question: `Is ${formatNumber(oz)} fl oz the same as ${formatNumber(oz)} oz by weight?`, answer: `No. Weight ounces measure mass; fluid ounces measure volume. ${formatNumber(oz)} US fluid ounces is ${formatNumber(ml)} ml, which is about ${formatNumber(waterGrams)}g for water.` },
    { question: "Which ounce should I use for baking?", answer: "Use weight ounces when a recipe gives ingredient weight. Use fluid ounces only for liquid volume measurements." },
  ];
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) };

  return (
    <div className="py-8 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="max-w-4xl mx-auto">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Ounces to Grams" }, { label: `${formatNumber(oz)} oz to grams` }]} />
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">{formatNumber(oz)} Ounces to Grams</h1>
        <p className="text-lg text-slate-700 mb-6 max-w-3xl">
          <strong>{formatNumber(oz)} oz</strong> by weight equals <strong>{formatNumber(grams)} grams</strong>. For liquids, check whether your recipe means fluid ounces instead.
        </p>
        <section className="card p-5 sm:p-6 mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Weight Ounces vs Fluid Ounces</h2>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            <div className="rounded border border-slate-200 p-3"><span className="block text-slate-500">Weight ounces</span><strong>{formatNumber(oz)} oz = {formatNumber(grams)}g</strong></div>
            <div className="rounded border border-slate-200 p-3"><span className="block text-slate-500">US fluid ounces</span><strong>{formatNumber(oz)} fl oz = {formatNumber(ml)} ml</strong></div>
          </div>
        </section>
        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">Common oz to grams conversions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {OUNCE_VALUES.filter((value) => value !== oz).map((value) => (
              <Link key={value} href={urlFor(value)} className="card p-3 text-center hover:border-accent transition-colors text-sm">
                <span className="font-medium text-accent">{formatNumber(value)} oz</span>
                <span className="block text-slate-500">{formatNumber(ouncesToGrams(value))}g</span>
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
