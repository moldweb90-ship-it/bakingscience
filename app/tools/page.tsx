import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { toolCategories, toolPages } from "@/lib/tool-pages";

export const metadata: Metadata = {
  title: "Baking Calculators, Substitutes and Conversion Tools | BakingConverter",
  description:
    "Use practical baking calculators for pan sizes, recipe scaling, buttermilk substitutes, egg-free brownies, butter-to-oil conversions, sourdough hydration, and cake servings.",
};

export default function ToolsPage() {
  const grouped = toolPages.reduce<Record<string, typeof toolPages>>((acc, page) => {
    if (!acc[page.kind]) acc[page.kind] = [];
    acc[page.kind].push(page);
    return acc;
  }, {});

  return (
    <div className="py-8 sm:py-12">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Tools" }]} />

      <header className="mb-10 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent mb-3">Baking tools</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
          Baking Calculators, Substitutes, and Recipe Conversion Tools
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Practical references for the searches bakers actually make: pan swaps, buttermilk substitutes,
          egg-free brownies, butter-to-oil math, sourdough hydration, recipe scaling, and cake servings.
        </p>
      </header>

      <div className="grid gap-10">
        {Object.entries(toolCategories).map(([kind, category]) => {
          const pages = grouped[kind] || [];
          if (pages.length === 0) return null;

          return (
            <section key={kind}>
              <div className="mb-5">
                <h2 className="text-2xl font-bold text-slate-900">{category.label}</h2>
                <p className="text-slate-600 mt-1">{category.description}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pages.map((page) => (
                  <Link
                    key={page.slug}
                    href={`/tools/${page.slug}/`}
                    className="card p-5 hover:border-accent transition-colors group"
                  >
                    <p className="text-xs uppercase tracking-wide text-accent font-semibold mb-3">
                      {category.label}
                    </p>
                    <h3 className="font-semibold text-slate-900 group-hover:text-accent transition-colors leading-snug">
                      {page.h1}
                    </h3>
                    <p className="text-sm text-slate-600 mt-2 line-clamp-3">{page.description}</p>
                    <p className="mt-4 text-sm font-medium text-accent group-hover:text-accent-hover">
                      Open calculator
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
