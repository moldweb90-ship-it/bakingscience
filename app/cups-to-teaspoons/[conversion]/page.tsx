import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import FAQAccordion from "@/components/seo/FAQAccordion";
import AdBanner from "@/components/ads/AdBanner";
import { SITE_URL } from "@/lib/constants";
import {
  CUP_UNIT_VALUES,
  buildCupUnitSlug,
  cupWord,
  cupsToTablespoons,
  cupsToTeaspoons,
  formatCupAmount,
  formatNumber,
  parseCupUnitSlug,
} from "@/lib/unit-conversions";

interface PageProps {
  params: Promise<{ conversion: string }>;
}

function urlFor(cups: number) {
  return `/cups-to-teaspoons/${buildCupUnitSlug(cups, "teaspoons")}/`;
}

export async function generateStaticParams() {
  return CUP_UNIT_VALUES.map((cups) => ({ conversion: buildCupUnitSlug(cups, "teaspoons") }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { conversion } = await params;
  const cups = parseCupUnitSlug(conversion, "teaspoons");
  if (cups === null || !CUP_UNIT_VALUES.includes(cups)) return { title: "Not Found" };
  const label = `${formatCupAmount(cups)} ${cupWord(cups)}`;
  const teaspoons = cupsToTeaspoons(cups);
  const title = `${label} in teaspoons: ${formatNumber(teaspoons)} tsp | BakingConverter`;
  const description = `${label} equals ${formatNumber(teaspoons)} teaspoons and ${formatNumber(cupsToTablespoons(cups))} tablespoons. Exact US kitchen volume conversion with chart and formula.`;
  const canonical = `${SITE_URL}${urlFor(cups)}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "article", images: [{ url: "/og-default.png", width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title, description, images: ["/og-default.png"] },
  };
}

export default async function CupsToTeaspoonsPage({ params }: PageProps) {
  const { conversion } = await params;
  const normalized = conversion.toLowerCase();
  if (normalized !== conversion) redirect(`/cups-to-teaspoons/${normalized}/`);
  const cups = parseCupUnitSlug(normalized, "teaspoons");
  if (cups === null || !CUP_UNIT_VALUES.includes(cups)) notFound();

  const label = `${formatCupAmount(cups)} ${cupWord(cups)}`;
  const teaspoons = cupsToTeaspoons(cups);
  const tablespoons = cupsToTablespoons(cups);
  const faqs = [
    {
      question: `How many teaspoons are in ${label}?`,
      answer: `${label} equals ${formatNumber(teaspoons)} teaspoons because 1 US cup contains 48 teaspoons.`,
    },
    {
      question: `How many tablespoons are in ${label}?`,
      answer: `${label} equals ${formatNumber(tablespoons)} tablespoons. Since 1 tablespoon is 3 teaspoons, this is also ${formatNumber(teaspoons)} teaspoons.`,
    },
    {
      question: "Does this conversion change by ingredient?",
      answer: "No. Cups, teaspoons, and tablespoons are volume units, so this conversion is the same for water, flour, sugar, butter, and other ingredients. Gram conversions do change by ingredient.",
    },
  ];
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) };

  return (
    <div className="py-8 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="max-w-4xl mx-auto">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Cups to Teaspoons" }, { label: `${label} in teaspoons` }]} />
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">{label} in Teaspoons</h1>
        <p className="text-lg text-slate-700 mb-6 max-w-3xl">
          <strong>{label}</strong> equals <strong>{formatNumber(teaspoons)} teaspoons</strong>. This is an exact US kitchen volume conversion: 1 cup = 48 teaspoons.
        </p>

        <section className="card p-5 sm:p-6 mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Conversion Formula</h2>
          <p className="text-slate-700 mb-4">teaspoons = cups x 48</p>
          <div className="grid sm:grid-cols-3 gap-3 text-sm">
            <div className="rounded border border-slate-200 p-3"><span className="block text-slate-500">Cups</span><strong>{label}</strong></div>
            <div className="rounded border border-slate-200 p-3"><span className="block text-slate-500">Tablespoons</span><strong>{formatNumber(tablespoons)} tbsp</strong></div>
            <div className="rounded border border-slate-200 p-3"><span className="block text-slate-500">Teaspoons</span><strong>{formatNumber(teaspoons)} tsp</strong></div>
          </div>
        </section>

        <section className="mb-8 grid gap-4 md:grid-cols-3">
          <div className="card p-4">
            <h2 className="text-base font-semibold text-slate-900 mb-2">Use This for Volume</h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              This page converts measuring-cup volume to teaspoons. It is useful for scaling sauces, liquids, vanilla, oil, and small recipe adjustments.
            </p>
          </div>
          <div className="card p-4">
            <h2 className="text-base font-semibold text-slate-900 mb-2">US Kitchen Standard</h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              A US cup is 16 tablespoons or 48 teaspoons. That is why {label} becomes {formatNumber(tablespoons)} tablespoons and {formatNumber(teaspoons)} teaspoons.
            </p>
          </div>
          <div className="card p-4">
            <h2 className="text-base font-semibold text-slate-900 mb-2">Not a Gram Conversion</h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              Grams depend on ingredient density. {label} is always {formatNumber(teaspoons)} tsp, but it is not the same gram weight for flour, sugar, butter, or water.
            </p>
          </div>
        </section>

        <section className="card p-5 sm:p-6 mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">US Cup Reference</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="table-header">
                  <th className="table-cell text-left">Unit</th>
                  <th className="table-cell text-left">Equals</th>
                  <th className="table-cell text-left">Best used for</th>
                </tr>
              </thead>
              <tbody>
                <tr className="table-row">
                  <td className="table-cell font-medium">1 US cup</td>
                  <td className="table-cell">16 tbsp / 48 tsp</td>
                  <td className="table-cell text-slate-600">Standard recipe volume</td>
                </tr>
                <tr className="table-row table-row-alt">
                  <td className="table-cell font-medium">1 tablespoon</td>
                  <td className="table-cell">3 tsp</td>
                  <td className="table-cell text-slate-600">Small wet or dry additions</td>
                </tr>
                <tr className="table-row">
                  <td className="table-cell font-medium">1 teaspoon</td>
                  <td className="table-cell">1/48 cup</td>
                  <td className="table-cell text-slate-600">Flavorings, salt, leavening, spices</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">Nearby Cup to Teaspoon Conversions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {CUP_UNIT_VALUES.filter((value) => value !== cups).slice(0, 12).map((value) => (
              <Link key={value} href={urlFor(value)} className="card p-3 text-center hover:border-accent transition-colors text-sm">
                <span className="font-medium text-accent">{formatCupAmount(value)} {cupWord(value)}</span>
                <span className="block text-slate-500">{formatNumber(cupsToTeaspoons(value))} tsp</span>
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
