import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import FAQAccordion from "@/components/seo/FAQAccordion";
import AdBanner from "@/components/ads/AdBanner";
import { SITE_URL } from "@/lib/constants";
import { TABLESPOON_VALUES, buildSimpleUnitSlug, formatNumber, parseSimpleUnitSlug, tablespoonsToCups } from "@/lib/unit-conversions";

interface PageProps {
  params: Promise<{ conversion: string }>;
}

function urlFor(tbsp: number) {
  return `/tablespoons-to-cups/${buildSimpleUnitSlug(tbsp, "tablespoons", "cups")}/`;
}

export async function generateStaticParams() {
  return TABLESPOON_VALUES.map((tbsp) => ({ conversion: buildSimpleUnitSlug(tbsp, "tablespoons", "cups") }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { conversion } = await params;
  const tbsp = parseSimpleUnitSlug(conversion, "tablespoons", "cups");
  if (tbsp === null || !TABLESPOON_VALUES.includes(tbsp)) return { title: "Not Found" };
  const cups = tablespoonsToCups(tbsp);
  const title = `${formatNumber(tbsp)} tablespoons to cups: ${formatNumber(cups, 3)} cups | BakingConverter`;
  const description = `Convert ${formatNumber(tbsp)} tablespoons to cups. ${formatNumber(tbsp)} tbsp equals ${formatNumber(cups, 3)} cups using 16 tablespoons per US cup.`;
  const canonical = `${SITE_URL}${urlFor(tbsp)}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "article", images: [{ url: "/og-default.png", width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title, description, images: ["/og-default.png"] },
  };
}

export default async function TablespoonsToCupsPage({ params }: PageProps) {
  const { conversion } = await params;
  const tbsp = parseSimpleUnitSlug(conversion.toLowerCase(), "tablespoons", "cups");
  if (tbsp === null || !TABLESPOON_VALUES.includes(tbsp)) notFound();
  const cups = tablespoonsToCups(tbsp);
  const tsp = tbsp * 3;
  const faqs = [
    { question: `How many cups is ${formatNumber(tbsp)} tablespoons?`, answer: `${formatNumber(tbsp)} tablespoons equals ${formatNumber(cups, 3)} cups. Divide tablespoons by 16 to convert to cups.` },
    { question: `How many teaspoons is ${formatNumber(tbsp)} tablespoons?`, answer: `${formatNumber(tbsp)} tablespoons equals ${formatNumber(tsp)} teaspoons.` },
    { question: "What is the tablespoon to cup ratio?", answer: "The US kitchen ratio is 16 tablespoons per cup, or 1 tablespoon = 1/16 cup." },
  ];
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) };

  return (
    <div className="py-8 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="max-w-4xl mx-auto">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Tablespoons to Cups" }, { label: `${formatNumber(tbsp)} tbsp to cups` }]} />
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">{formatNumber(tbsp)} Tablespoons to Cups</h1>
        <p className="text-lg text-slate-700 mb-6 max-w-3xl">
          <strong>{formatNumber(tbsp)} tablespoons</strong> equals <strong>{formatNumber(cups, 3)} cups</strong>. This conversion is volume-only and does not change by ingredient.
        </p>
        <section className="card p-5 sm:p-6 mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Quick Result</h2>
          <div className="grid sm:grid-cols-3 gap-3 text-sm">
            <div className="rounded border border-slate-200 p-3"><span className="block text-slate-500">Tablespoons</span><strong>{formatNumber(tbsp)} tbsp</strong></div>
            <div className="rounded border border-slate-200 p-3"><span className="block text-slate-500">Teaspoons</span><strong>{formatNumber(tsp)} tsp</strong></div>
            <div className="rounded border border-slate-200 p-3"><span className="block text-slate-500">Cups</span><strong>{formatNumber(cups, 3)} cups</strong></div>
          </div>
        </section>
        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">Common Tablespoon to Cup Conversions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {TABLESPOON_VALUES.filter((value) => value !== tbsp).map((value) => (
              <Link key={value} href={urlFor(value)} className="card p-3 text-center hover:border-accent transition-colors text-sm">
                <span className="font-medium text-accent">{formatNumber(value)} tbsp</span>
                <span className="block text-slate-500">{formatNumber(tablespoonsToCups(value), 3)} cups</span>
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
