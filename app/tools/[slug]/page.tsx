import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import FAQAccordion from "@/components/seo/FAQAccordion";
import AdBanner from "@/components/ads/AdBanner";
import ToolCalculator from "@/components/tools/ToolCalculator";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { getToolPage, toolCategories, toolPages, type ToolPage } from "@/lib/tool-pages";

type ToolPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return toolPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getToolPage(slug);
  if (!page) return { title: "Not Found" };

  const canonical = `${SITE_URL}/tools/${page.slug}/`;
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical },
    openGraph: {
      title: page.title,
      description: page.description,
      url: canonical,
      siteName: SITE_NAME,
      type: "article",
      images: [{ url: "/og-default.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: ["/og-default.png"],
    },
  };
}

function buildArticleSchema(page: ToolPage) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.title,
    description: page.description,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/tools/${page.slug}/`,
  };
}

function buildFaqSchema(page: ToolPage) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

function buildSoftwareSchema(page: ToolPage) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: page.calculatorTitle,
    applicationCategory: "CalculatorApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: page.calculatorNote,
    url: `${SITE_URL}/tools/${page.slug}/`,
  };
}

function buildBreadcrumbSchema(page: ToolPage) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Tools", item: `${SITE_URL}/tools/` },
      { "@type": "ListItem", position: 3, name: page.h1 },
    ],
  };
}

function calculatorRows(page: ToolPage): string[][] {
  if (page.kind === "buttermilk") {
    return [
      ["1/4 cup substitute", "3/4 tsp acid + milk to 1/4 cup", "Small pancakes or dressing"],
      ["1/2 cup substitute", "1 1/2 tsp acid + milk to 1/2 cup", "Muffins and quick breads"],
      ["3/4 cup substitute", "2 1/4 tsp acid + milk to 3/4 cup", "Layer cakes"],
      ["1 cup substitute", "1 tbsp acid + milk to 1 cup", "Full batch pancakes"],
    ];
  }
  if (page.kind === "egg-brownies") {
    return [
      ["1 egg", "1/4 cup applesauce", "Fudgy"],
      ["1 egg", "1/4 cup yogurt", "Rich, slightly cakey"],
      ["1 egg", "1 flax egg", "Dense, vegan"],
      ["2 eggs", "1/2 cup applesauce or yogurt", "Best for boxed mix"],
    ];
  }
  if (page.kind === "butter-oil") {
    return [
      ["1/4 cup butter", "3 tbsp oil", "Small bakes"],
      ["1/2 cup butter", "6 tbsp oil", "Brownies, muffins"],
      ["2/3 cup butter", "1/2 cup oil", "Cake layers"],
      ["1 cup butter", "3/4 cup oil", "Large cakes"],
    ];
  }
  if (page.kind === "pan-size") {
    return [
      ["6 inch round", "28 sq in", "0.56 x an 8 inch round"],
      ["8 inch round", "50 sq in", "Baseline layer cake"],
      ["9 inch round", "64 sq in", "1.28 x an 8 inch round"],
      ["9 x 13 inch", "117 sq in", "2.3 x an 8 inch round"],
    ];
  }
  if (page.kind === "sourdough") {
    return [
      ["500g flour + 300g water", "60% hydration", "Stiffer dough"],
      ["500g flour + 350g water", "70% hydration", "Balanced loaf"],
      ["500g flour + 375g water", "75% hydration", "Open crumb"],
      ["500g flour + 400g water", "80% hydration", "Advanced handling"],
    ];
  }
  if (page.kind === "cake-serving") {
    return [
      ["6 inch round", "6-8 party slices", "10-12 wedding slices"],
      ["8 inch round", "10-12 party slices", "18-20 wedding slices"],
      ["9 inch round", "12-16 party slices", "22-24 wedding slices"],
      ["10 inch round", "20-24 party slices", "28-30 wedding slices"],
    ];
  }
  return [
    ["Halve a recipe", "0.5 x every ingredient", "Check eggs by weight"],
    ["Scale 8 to 12 servings", "1.5 x every ingredient", "Watch pan area"],
    ["Double a recipe", "2 x every ingredient", "Bake time does not double"],
    ["Scale pan size", "new area / old area", "Best for cakes and brownies"],
  ];
}

function RelatedLinks({ page }: { page: ToolPage }) {
  const related = page.relatedSlugs
    .filter((slug) => slug !== page.slug)
    .map((slug) => getToolPage(slug))
    .filter((item): item is ToolPage => Boolean(item))
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold text-slate-900 mb-4">Related Calculators</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {related.map((relatedPage) => (
          <Link
            key={relatedPage.slug}
            href={`/tools/${relatedPage.slug}/`}
            className="card p-4 hover:border-accent transition-colors"
          >
            <p className="font-semibold text-slate-900 leading-snug">{relatedPage.h1}</p>
            <p className="text-sm text-slate-600 mt-1">{relatedPage.shortAnswer}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ideaLink(idea: string): string {
  const key = idea.toLowerCase();
  if (key.includes("pancake")) return "/tools/buttermilk-substitute/";
  if (key.includes("brownie")) return "/tools/egg-substitute-for-brownies/";
  if (key.includes("cake") || key.includes("sheet") || key.includes("wedding")) return "/tools/cake-serving-calculator/";
  if (key.includes("sourdough") || key.includes("starter") || key.includes("pizza dough")) return "/tools/sourdough-hydration-calculator/";
  if (key.includes("muffin") || key.includes("quick bread") || key.includes("banana bread")) return "/tools/butter-to-oil-converter/";
  return "/tools/";
}

export default async function ToolDetailPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const page = getToolPage(slug);
  if (!page) notFound();

  const category = toolCategories[page.kind];
  const siblings = toolPages.filter((item) => item.kind === page.kind && item.slug !== page.slug).slice(0, 8);

  return (
    <div className="py-8 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildArticleSchema(page)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(page)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSoftwareSchema(page)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbSchema(page)) }} />

      <div className="flex flex-col lg:flex-row gap-8">
        <article className="flex-1 min-w-0 max-w-4xl">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Tools", href: "/tools/" }, { label: page.h1 }]} />

          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Link href="/tools/" className="text-sm text-slate-500 bg-slate-100 hover:text-accent px-3 py-1 rounded-full">
                {category.label}
              </Link>
              <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                Free baking calculator
              </span>
              <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                Measured kitchen ratios
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 leading-tight">{page.h1}</h1>
            <p className="text-lg text-slate-600 leading-relaxed">{page.description}</p>
          </header>

          <section className="card p-6 mb-8 border-l-4 border-l-accent">
            <p className="text-sm font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
            <p className="text-lg text-slate-800 leading-relaxed">{page.shortAnswer}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">{page.calculatorTitle}</h2>
            <p className="text-slate-600 mb-5">{page.calculatorNote}</p>
            <ToolCalculator kind={page.kind} />
            <div className="overflow-x-auto mt-5 rounded-lg border border-slate-200 bg-white shadow-sm">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="px-5 py-3 font-semibold text-slate-900 border-b border-slate-200">Input</th>
                    <th className="px-5 py-3 font-semibold text-slate-900 border-b border-slate-200">Result</th>
                    <th className="px-5 py-3 font-semibold text-slate-900 border-b border-slate-200">Use</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {calculatorRows(page).map((row) => (
                    <tr key={row.join("-")} className="hover:bg-amber-50/50">
                      {row.map((cell) => (
                        <td key={cell} className="px-5 py-4 align-top text-slate-700 leading-relaxed">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {page.tables.map((table) => (
            <section key={table.title} className="mt-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">{table.title}</h2>
              <div className="overflow-x-auto card p-0">
                <table className="w-full min-w-[680px] border-collapse text-left text-sm">
                  <thead>
                    <tr className="bg-slate-50">
                      {table.headers.map((header) => (
                        <th key={header} className="px-5 py-3 font-semibold text-slate-900 border-b border-slate-200">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {table.rows.map((row) => (
                      <tr key={row.join("-")} className="hover:bg-amber-50/50">
                        {row.map((cell) => (
                          <td key={cell} className="px-5 py-4 align-top text-slate-700 leading-relaxed">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ))}

          <section className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Practical Notes</h2>
              <ul className="space-y-3">
                {page.tips.map((tip) => (
                  <li key={tip} className="flex gap-3 text-slate-700">
                    <span className="mt-1 h-2 w-2 rounded-full bg-accent flex-shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Mistakes to Avoid</h2>
              <ul className="space-y-3">
                {page.mistakes.map((mistake) => (
                  <li key={mistake} className="flex gap-3 text-slate-700">
                    <span className="mt-1 h-2 w-2 rounded-full bg-red-400 flex-shrink-0" />
                    <span>{mistake}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Where This Helps in Real Baking</h2>
            <div className="flex flex-wrap gap-2">
              {page.recipeIdeas.map((idea) => (
                <Link key={idea} href={ideaLink(idea)} className="bg-accent-light text-accent-hover hover:bg-accent hover:text-white px-3 py-2 rounded text-sm font-medium transition-colors">
                  {idea}
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-10 max-w-3xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
            <FAQAccordion faqs={page.faqs} />
          </section>

          <RelatedLinks page={page} />

          <div className="mt-10">
            <AdBanner />
          </div>
        </article>

        <aside className="hidden lg:block w-[300px] flex-shrink-0">
          <div className="sticky top-20 space-y-6">
            <div className="card p-4">
              <h2 className="font-semibold text-slate-900 mb-3 text-sm">More in {category.label}</h2>
              <ul className="space-y-2">
                {siblings.map((item) => (
                  <li key={item.slug}>
                    <Link href={`/tools/${item.slug}/`} className="text-sm text-slate-600 hover:text-accent transition-colors">
                      {item.h1}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <AdBanner />
          </div>
        </aside>
      </div>
    </div>
  );
}
