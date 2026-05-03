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

  const featureBanners = [
    {
      title: "Out of buttermilk?",
      text: "Use milk, lemon juice, vinegar, yogurt, kefir, or plant milk without guessing the acid ratio.",
      href: "/tools/buttermilk-substitute/",
      label: "Substitute guide",
      tone: "from-orange-50 to-amber-100 border-orange-200",
      art: "1:1",
    },
    {
      title: "Brownies without eggs",
      text: "Compare applesauce, yogurt, flax eggs, and boxed-mix fixes by texture instead of treating every swap the same.",
      href: "/tools/egg-substitute-for-brownies/",
      label: "Brownie fixes",
      tone: "from-stone-100 to-orange-100 border-stone-300",
      art: "EGG",
    },
    {
      title: "Change the pan, not the recipe",
      text: "Scale batter by pan area and know when bake time should move earlier or later.",
      href: "/tools/baking-pan-conversion-calculator/",
      label: "Pan calculator",
      tone: "from-sky-50 to-cyan-100 border-sky-200",
      art: "PAN",
    },
    {
      title: "Sourdough hydration, clearly",
      text: "Calculate water percentage by weight and understand why 70% dough feels different from 80%.",
      href: "/tools/sourdough-hydration-calculator/",
      label: "Hydration tool",
      tone: "from-lime-50 to-emerald-100 border-lime-200",
      art: "%",
    },
    {
      title: "Scale a recipe without chaos",
      text: "Use a multiplier for servings, then handle eggs, salt, leavening, and pans with judgment.",
      href: "/tools/recipe-scaler/",
      label: "Recipe scaler",
      tone: "from-violet-50 to-fuchsia-100 border-violet-200",
      art: "x",
    },
    {
      title: "Cake servings that make sense",
      text: "Estimate party slices and wedding-style portions before you choose the cake size.",
      href: "/tools/cake-serving-calculator/",
      label: "Serving chart",
      tone: "from-rose-50 to-pink-100 border-rose-200",
      art: "12",
    },
  ];

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

      <section className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {featureBanners.map((banner) => (
            <Link
              key={banner.href}
              href={banner.href}
              className={`relative overflow-hidden rounded-card border bg-gradient-to-br ${banner.tone} p-5 min-h-[180px] shadow-card hover:shadow-card-hover transition-shadow group`}
            >
              <div className="relative z-10 max-w-[78%]">
                <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-3">{banner.label}</p>
                <h2 className="text-xl font-bold text-slate-950 mb-2">{banner.title}</h2>
                <p className="text-sm leading-relaxed text-slate-700">{banner.text}</p>
                <p className="mt-4 text-sm font-semibold text-accent group-hover:text-accent-hover">Open tool</p>
              </div>
              <div className="absolute right-4 bottom-4 text-[64px] leading-none font-black text-white/70 drop-shadow-sm select-none">
                {banner.art}
              </div>
            </Link>
          ))}
        </div>
      </section>

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
