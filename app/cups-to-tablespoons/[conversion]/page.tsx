import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import FAQAccordion from "@/components/seo/FAQAccordion";
import AdBanner from "@/components/ads/AdBanner";
import { SITE_URL } from "@/lib/constants";
import { CUP_UNIT_VALUES, buildCupUnitSlug, cupWord, cupsToTablespoons, cupsToTeaspoons, formatCupAmount, formatNumber, parseCupUnitSlug } from "@/lib/unit-conversions";

interface PageProps {
  params: Promise<{ conversion: string }>;
}

function urlFor(cups: number) {
  return `/cups-to-tablespoons/${buildCupUnitSlug(cups, "tablespoons")}/`;
}

export async function generateStaticParams() {
  return CUP_UNIT_VALUES.map((cups) => ({ conversion: buildCupUnitSlug(cups, "tablespoons") }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { conversion } = await params;
  const cups = parseCupUnitSlug(conversion, "tablespoons");
  if (cups === null || !CUP_UNIT_VALUES.includes(cups)) return { title: "Not Found" };
  const label = `${formatCupAmount(cups)} ${cupWord(cups)}`;
  const tbsp = cupsToTablespoons(cups);
  const title = `${label} to Tablespoons - ${formatNumber(tbsp)} tbsp exact`;
  const description = `${label} equals ${formatNumber(tbsp)} tbsp and ${formatNumber(cupsToTeaspoons(cups))} tsp. Exact US cup conversion for recipe scaling, butter, liquids, and small-batch baking.`;
  const canonical = `${SITE_URL}${urlFor(cups)}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "article", images: [{ url: "/og-default.png", width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title, description, images: ["/og-default.png"] },
  };
}

export default async function CupsToTablespoonsPage({ params }: PageProps) {
  const { conversion } = await params;
  const cups = parseCupUnitSlug(conversion.toLowerCase(), "tablespoons");
  if (cups === null || !CUP_UNIT_VALUES.includes(cups)) notFound();
  const label = `${formatCupAmount(cups)} ${cupWord(cups)}`;
  const tbsp = cupsToTablespoons(cups);
  const tsp = cupsToTeaspoons(cups);
  const faqs = [
    { question: `How many tablespoons are in ${label}?`, answer: `${label} equals ${formatNumber(tbsp)} tablespoons because 1 US cup contains 16 tablespoons.` },
    { question: `How many teaspoons are in ${label}?`, answer: `${label} equals ${formatNumber(tsp)} teaspoons. One tablespoon equals 3 teaspoons.` },
    { question: "Is this the same for dry and liquid ingredients?", answer: "Yes. Cups and tablespoons are volume units. The cup-to-tablespoon ratio is the same for dry and liquid ingredients, but grams depend on ingredient density." },
  ];
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) };

  return (
    <div className="py-8 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="max-w-4xl mx-auto">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Cups to Tablespoons" }, { label: `${label} in tablespoons` }]} />
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">{label} in Tablespoons</h1>
        <p className="text-lg text-slate-700 mb-6 max-w-3xl">
          <strong>{label}</strong> equals <strong>{formatNumber(tbsp)} tablespoons</strong>. Formula: tablespoons = cups x 16.
        </p>
        <section className="card p-5 sm:p-6 mb-8 border-accent/40">
          <p className="text-sm font-semibold uppercase text-accent-hover mb-2">Quick answer</p>
          <p className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
            {label} = {formatNumber(tbsp)} tablespoons = {formatNumber(tsp)} teaspoons.
          </p>
          <p className="text-slate-600 mt-3 leading-relaxed">
            Use this when a recipe gives cups but you need a spoon measure for butter, oil, milk, or small-batch baking.
          </p>
        </section>
        <section className="card p-5 sm:p-6 mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Cup, Tablespoon, Teaspoon Chart</h2>
          <div className="grid sm:grid-cols-3 gap-3 text-sm">
            <div className="rounded border border-slate-200 p-3"><span className="block text-slate-500">Cups</span><strong>{label}</strong></div>
            <div className="rounded border border-slate-200 p-3"><span className="block text-slate-500">Tablespoons</span><strong>{formatNumber(tbsp)} tbsp</strong></div>
            <div className="rounded border border-slate-200 p-3"><span className="block text-slate-500">Teaspoons</span><strong>{formatNumber(tsp)} tsp</strong></div>
          </div>
        </section>

        <section className="mb-8 grid gap-4 md:grid-cols-3">
          <div className="card p-4">
            <h2 className="text-base font-semibold text-slate-900 mb-2">Good for Recipe Scaling</h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              Tablespoons are easier than cups when you cut a recipe down or need a small amount without filling a full measuring cup.
            </p>
          </div>
          <div className="card p-4">
            <h2 className="text-base font-semibold text-slate-900 mb-2">Exact US Ratio</h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              One US cup contains exactly 16 tablespoons. That makes {label} equal to {formatNumber(tbsp)} tablespoons.
            </p>
          </div>
          <div className="card p-4">
            <h2 className="text-base font-semibold text-slate-900 mb-2">Volume, Not Weight</h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              This result does not change by ingredient. If you need grams, use an ingredient page because flour, sugar, water, and butter weigh differently.
            </p>
          </div>
        </section>

        <section className="card p-5 sm:p-6 mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Tablespoon Reference</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="table-header">
                  <th className="table-cell text-left">Measure</th>
                  <th className="table-cell text-left">Tablespoons</th>
                  <th className="table-cell text-left">Teaspoons</th>
                </tr>
              </thead>
              <tbody>
                <tr className="table-row">
                  <td className="table-cell font-medium">1/4 cup</td>
                  <td className="table-cell">4 tbsp</td>
                  <td className="table-cell">12 tsp</td>
                </tr>
                <tr className="table-row table-row-alt">
                  <td className="table-cell font-medium">1/2 cup</td>
                  <td className="table-cell">8 tbsp</td>
                  <td className="table-cell">24 tsp</td>
                </tr>
                <tr className="table-row">
                  <td className="table-cell font-medium">1 cup</td>
                  <td className="table-cell">16 tbsp</td>
                  <td className="table-cell">48 tsp</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">Nearby Cup to Tablespoon Conversions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {CUP_UNIT_VALUES.filter((value) => value !== cups).slice(0, 12).map((value) => (
              <Link key={value} href={urlFor(value)} className="card p-3 text-center hover:border-accent transition-colors text-sm">
                <span className="font-medium text-accent">{formatCupAmount(value)} {cupWord(value)}</span>
                <span className="block text-slate-500">{formatNumber(cupsToTablespoons(value))} tbsp</span>
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
