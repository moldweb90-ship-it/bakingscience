import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import FAQAccordion from "@/components/seo/FAQAccordion";
import AdBanner from "@/components/ads/AdBanner";
import { SITE_URL } from "@/lib/constants";
import { TEASPOON_VALUES, buildSimpleUnitSlug, formatNumber, parseSimpleUnitSlug, teaspoonsToCups } from "@/lib/unit-conversions";

interface PageProps {
  params: Promise<{ conversion: string }>;
}

function urlFor(tsp: number) {
  return `/teaspoons-to-cups/${buildSimpleUnitSlug(tsp, "teaspoons", "cups")}/`;
}

export async function generateStaticParams() {
  return TEASPOON_VALUES.map((tsp) => ({ conversion: buildSimpleUnitSlug(tsp, "teaspoons", "cups") }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { conversion } = await params;
  const tsp = parseSimpleUnitSlug(conversion, "teaspoons", "cups");
  if (tsp === null || !TEASPOON_VALUES.includes(tsp)) return { title: "Not Found" };
  const cups = teaspoonsToCups(tsp);
  const title = `${formatNumber(tsp)} teaspoons to cups: ${formatNumber(cups, 3)} cups | BakingConverter`;
  const description = `Convert ${formatNumber(tsp)} teaspoons to cups. ${formatNumber(tsp)} tsp equals ${formatNumber(cups, 3)} US cups using the exact kitchen ratio of 48 teaspoons per cup.`;
  const canonical = `${SITE_URL}${urlFor(tsp)}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "article", images: [{ url: "/og-default.png", width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title, description, images: ["/og-default.png"] },
  };
}

export default async function TeaspoonsToCupsPage({ params }: PageProps) {
  const { conversion } = await params;
  const tsp = parseSimpleUnitSlug(conversion.toLowerCase(), "teaspoons", "cups");
  if (tsp === null || !TEASPOON_VALUES.includes(tsp)) notFound();
  const cups = teaspoonsToCups(tsp);
  const tablespoons = tsp / 3;
  const faqs = [
    { question: `How many cups is ${formatNumber(tsp)} teaspoons?`, answer: `${formatNumber(tsp)} teaspoons equals ${formatNumber(cups, 3)} cups. Divide teaspoons by 48 to convert to cups.` },
    { question: `How many tablespoons is ${formatNumber(tsp)} teaspoons?`, answer: `${formatNumber(tsp)} teaspoons equals ${formatNumber(tablespoons, 3)} tablespoons because 1 tablespoon contains 3 teaspoons.` },
    { question: "Is teaspoon to cup conversion exact?", answer: "Yes for US kitchen volume units. 1 US cup equals 48 teaspoons exactly in common recipe conversion charts." },
  ];
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) };

  return (
    <div className="py-8 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="max-w-4xl mx-auto">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Teaspoons to Cups" }, { label: `${formatNumber(tsp)} tsp to cups` }]} />
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">{formatNumber(tsp)} Teaspoons to Cups</h1>
        <p className="text-lg text-slate-700 mb-6 max-w-3xl">
          <strong>{formatNumber(tsp)} teaspoons</strong> equals <strong>{formatNumber(cups, 3)} cups</strong>. Formula: cups = teaspoons / 48.
        </p>
        <section className="card p-5 sm:p-6 mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Quick Result</h2>
          <div className="grid sm:grid-cols-3 gap-3 text-sm">
            <div className="rounded border border-slate-200 p-3"><span className="block text-slate-500">Teaspoons</span><strong>{formatNumber(tsp)} tsp</strong></div>
            <div className="rounded border border-slate-200 p-3"><span className="block text-slate-500">Tablespoons</span><strong>{formatNumber(tablespoons, 3)} tbsp</strong></div>
            <div className="rounded border border-slate-200 p-3"><span className="block text-slate-500">Cups</span><strong>{formatNumber(cups, 3)} cups</strong></div>
          </div>
        </section>
        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">Common Teaspoon to Cup Conversions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {TEASPOON_VALUES.filter((value) => value !== tsp).map((value) => (
              <Link key={value} href={urlFor(value)} className="card p-3 text-center hover:border-accent transition-colors text-sm">
                <span className="font-medium text-accent">{formatNumber(value)} tsp</span>
                <span className="block text-slate-500">{formatNumber(teaspoonsToCups(value), 3)} cups</span>
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
