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

const priorityLongTailSlugs = new Set([
  "almond-milk-buttermilk-substitute",
  "buttermilk-using-almond-milk",
  "make-buttermilk-from-almond-milk",
  "oat-milk-buttermilk-substitute",
  "buttermilk-substitute-oat-milk",
  "buttermilk-substitute-with-oat-milk",
  "buttermilk-substitute-lemon-juice",
  "buttermilk-substitute-with-lemon-juice",
  "milk-and-vinegar-buttermilk-substitute",
  "buttermilk-from-milk-and-vinegar",
  "make-buttermilk-from-milk-and-vinegar",
  "make-buttermilk-with-vinegar",
  "vinegar-and-milk-to-make-buttermilk",
  "buttermilk-substitute-vegan",
  "buttermilk-alternative-vegan",
  "buttermilk-replacement-vegan",
  "dairy-free-buttermilk-substitute",
  "buttermilk-alternative-dairy-free",
  "buttermilk-lactose-free-substitute",
  "non-dairy-buttermilk-substitute",
  "non-dairy-buttermilk-substitute-baking",
  "dairy-free-buttermilk-substitute-for-baking",
  "buttermilk-substitute-for-ranch-dressing",
  "substitute-for-buttermilk-ranch-dressing",
  "buttermilk-substitute-for-fried-chicken",
  "buttermilk-alternative-for-fried-chicken",
  "buttermilk-substitute-fried-chicken",
  "substitute-for-buttermilk-for-fried-chicken",
  "fried-chicken-buttermilk-substitute",
  "substitute-for-buttermilk-fried-chicken",
  "buttermilk-substitute-for-red-velvet-cake",
  "substitute-for-buttermilk-in-red-velvet-cake",
  "1-4-cup-buttermilk-substitute",
  "1-2-cup-buttermilk-substitute",
  "3-4-cup-buttermilk-substitute",
  "buttermilk-substitute-with-greek-yogurt",
  "buttermilk-substitute-greek-yogurt",
  "buttermilk-substitute-with-yogurt",
  "buttermilk-replacement-yogurt",
  "buttermilk-substitute-for-sour-cream",
  "buttermilk-substitute-for-soda-bread",
  "buttermilk-substitute-for-cornbread",
  "buttermilk-substitute-for-pancakes",
  "kefir-buttermilk-substitute",
  "egg-substitutes-for-brownie-mix",
  "substitute-for-2-eggs-in-brownies",
  "alternative-for-egg-in-brownies",
  "egg-alternative-for-brownies",
  "egg-replacement-brownies",
  "substitute-for-an-egg-in-brownies",
  "substitute-for-eggs-for-brownies",
  "egg-sub-for-brownies",
  "betty-crocker-brownie-mix-egg-substitute",
  "ghirardelli-brownie-mix-egg-substitute",
  "pillsbury-brownie-mix-without-eggs",
  "brownie-mix-vegan-substitute-for-eggs",
  "brownies-with-applesauce-instead-of-egg",
  "brownies-with-yogurt-instead-of-eggs",
  "flax-egg-brownies",
  "egg-substitute-for-gluten-free-brownies",
  "butter-to-oil-conversion-baking",
  "oil-to-butter-conversion-calculator",
  "olive-oil-to-butter-conversion",
  "butter-to-oil-conversion-grams",
  "butter-to-vegetable-oil-conversion-grams",
  "baking-pan-conversion-calculator",
  "cake-pan-conversion-chart",
  "baking-pan-time-conversion-chart",
  "convert-8-inch-cake-recipe-to-6-inch",
  "convert-8-inch-cake-recipe-to-9-inch",
  "round-pan-to-square-pan-conversion",
  "square-pan-to-round-pan-conversion",
  "loaf-pan-conversion",
  "sourdough-starter-hydration-calculator",
  "sourdough-hydration-formula",
  "recipe-scaler-online",
  "double-recipe-calculator",
  "halve-recipe-calculator",
  "wedding-cake-servings-calculator",
]);

function isPriorityLongTailPage(page: ToolPage): boolean {
  return priorityLongTailSlugs.has(page.slug);
}

function buildHowToSchema(page: ToolPage) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to use ${page.h1}`,
    description: page.shortAnswer,
    step: expertSteps(page).map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.title,
      text: step.text,
    })),
  };
}

function expertNote(page: ToolPage): string {
  const keyword = page.keyword.toLowerCase();
  if (page.kind === "buttermilk") {
    if (keyword.includes("fried chicken")) {
      return "For fried chicken, the substitute has to do more than taste tangy. It should loosen the coating, carry salt and spices, and give the chicken enough acidity to tenderize during the rest.";
    }
    if (keyword.includes("ranch") || keyword.includes("dressing") || keyword.includes("coleslaw")) {
      return "For dressings, thickness matters as much as acidity. I would start slightly thicker, then loosen with milk one teaspoon at a time so the dressing does not turn watery.";
    }
    if (keyword.includes("red velvet")) {
      return "Red velvet depends on a mild acidic dairy note. A thin milk-and-vinegar substitute works, but yogurt or kefir usually gives a rounder crumb if the batter can handle the thickness.";
    }
    if (keyword.includes("almond") || keyword.includes("oat") || keyword.includes("dairy") || keyword.includes("vegan")) {
      return "Plant milk buttermilk works best when the milk is unsweetened and unflavored. Vanilla or sweetened versions can quietly change both the flavor and browning.";
    }
    return "The useful trick is not just adding acid. Add the acid first, pour milk up to the measuring line, then rest it long enough to thicken slightly before it goes into batter.";
  }
  if (page.kind === "egg-brownies") {
    if (/betty|ghirardelli|pillsbury|box/.test(keyword)) {
      return "Boxed brownie mixes are forgiving, but they still need moisture and a little binding. Applesauce gives the easiest fudgy result; flax is better when the goal is vegan, not necessarily lighter.";
    }
    if (keyword.includes("flax")) {
      return "A flax egg needs a few quiet minutes before it behaves like a binder. If it goes straight into the bowl dry, the brownie can bake up gritty instead of cohesive.";
    }
    if (keyword.includes("yogurt")) {
      return "Yogurt adds moisture and protein, so the brownie can set a little more firmly than with applesauce. That is useful for slices, less ideal if you want a very gooey center.";
    }
    return "Brownies are friendlier to egg swaps than cakes because they are dense by design. The key is choosing the texture you want before choosing the substitute.";
  }
  if (page.kind === "butter-oil") {
    return "Oil keeps cakes and quick breads moist, but it cannot cream with sugar or create flaky layers. Use the conversion for batters, not for pie crust, laminated dough, or butter-forward cookies.";
  }
  if (page.kind === "pan-size") {
    return "Pan conversions are really batter-depth decisions. Two pans can have similar area but behave differently if one is much deeper, darker, or made from glass.";
  }
  if (page.kind === "sourdough") {
    return "Hydration is only useful when it is calculated by weight. Cups hide too much variation, especially once whole grain flour or starter water gets involved.";
  }
  if (page.kind === "cake-serving") {
    return "Serving charts are estimates, not promises. A tall cake with clean slices serves more people than a short single layer cut at a casual party.";
  }
  return "Scaling is arithmetic first and baking judgment second. Multiply the ingredients, then slow down around eggs, salt, spices, leavening, and pan depth.";
}

function expertChecks(page: ToolPage): { label: string; text: string }[] {
  if (page.kind === "buttermilk") {
    return [
      { label: "Acidity", text: "Use lemon juice or white vinegar when the recipe needs a clean, predictable tang." },
      { label: "Thickness", text: "Thin yogurt or sour cream before adding it to delicate cake batter." },
      { label: "Flavor", text: "Avoid sweetened plant milk unless the recipe can handle extra sweetness." },
    ];
  }
  if (page.kind === "egg-brownies") {
    return [
      { label: "Fudgy", text: "Use applesauce or yogurt when you want a soft, moist center." },
      { label: "Vegan", text: "Use flax egg after it gels; it binds better when rested." },
      { label: "Slices", text: "Cool completely before cutting egg-free brownies." },
    ];
  }
  if (page.kind === "pan-size") {
    return [
      { label: "Area", text: "Compare surface area before thinking about bake time." },
      { label: "Depth", text: "A deeper pan needs slower checking and sometimes a lower oven." },
      { label: "Material", text: "Glass and dark metal can brown faster than light metal." },
    ];
  }
  if (page.kind === "sourdough") {
    return [
      { label: "Total flour", text: "Include flour from the starter for exact hydration." },
      { label: "Total water", text: "Include starter water and any bassinage water." },
      { label: "Flour type", text: "Whole wheat and rye absorb more water than white flour." },
    ];
  }
  if (page.kind === "cake-serving") {
    return [
      { label: "Event", text: "Birthday slices are usually larger than wedding slices." },
      { label: "Height", text: "Tall cakes can be cut thinner and still feel generous." },
      { label: "Buffer", text: "Round up when cake is the main dessert." },
    ];
  }
  return [
    { label: "Multiplier", text: "Use desired yield divided by original yield." },
    { label: "Rounding", text: "Round eggs and spices more carefully than flour or sugar." },
    { label: "Pan", text: "Changing quantity often means changing pan area too." },
  ];
}

function expertSteps(page: ToolPage): { title: string; text: string }[] {
  if (page.kind === "pan-size") {
    return [
      { title: "Measure both pans", text: "Use inside dimensions and calculate surface area." },
      { title: "Compare the area", text: "Divide the new pan area by the original pan area to get the batter multiplier." },
      { title: "Watch bake time", text: "Start checking early if the batter is shallower, and later if it is deeper." },
    ];
  }
  if (page.kind === "sourdough") {
    return [
      { title: "Weigh flour and water", text: "Use grams for all flour, water, and starter." },
      { title: "Calculate percentage", text: "Divide water by flour and multiply by 100." },
      { title: "Adjust gradually", text: "Move hydration by small jumps until the dough feels manageable." },
    ];
  }
  if (page.kind === "egg-brownies") {
    return [
      { title: "Choose texture first", text: "Pick applesauce for fudgy, yogurt for richer, or flax for vegan binding." },
      { title: "Measure per egg", text: "Use 1/4 cup applesauce or yogurt, or one prepared flax egg per egg." },
      { title: "Cool before slicing", text: "Egg-free brownies firm as they cool, so do not judge the center too early." },
    ];
  }
  if (page.kind === "butter-oil") {
    return [
      { title: "Check the recipe style", text: "Use the swap for liquid batters, not recipes that rely on creamed butter." },
      { title: "Use the ratio", text: "Use about 3/4 as much oil as butter by volume." },
      { title: "Adjust flavor", text: "Choose neutral oil for vanilla bakes and olive oil only when its flavor fits." },
    ];
  }
  if (page.kind === "cake-serving") {
    return [
      { title: "Pick slice style", text: "Decide whether you are serving casual party slices or narrower event slices." },
      { title: "Account for height", text: "Tall cakes serve more cleanly than short single layers." },
      { title: "Add a buffer", text: "Plan a few extra servings if cake is the only dessert." },
    ];
  }
  return [
    { title: "Measure the substitute", text: "Use the ratio on this page rather than guessing by taste." },
    { title: "Match the recipe", text: "Think about whether the batter needs acidity, moisture, fat, or binding." },
    { title: "Check texture early", text: "Baking swaps often change thickness before they change flavor." },
  ];
}

function ratioSource(page: ToolPage): { rule: string; works: string; limit: string } {
  if (page.kind === "buttermilk") {
    return {
      rule: "1 tablespoon acid per 1 cup milk, scaled by volume.",
      works: "Cakes, pancakes, muffins, biscuits, quick breads, dressings, and marinades that need mild acidity.",
      limit: "It copies acidity, not cultured dairy flavor. For richer batters, yogurt or kefir may taste rounder.",
    };
  }
  if (page.kind === "egg-brownies") {
    return {
      rule: "Use 1/4 cup applesauce or yogurt, or 1 prepared flax egg, per large egg.",
      works: "Dense brownie batters, boxed mixes, vegan brownies, and fudgy pans where moisture matters.",
      limit: "It is less reliable in airy cakes because eggs also foam, lift, and set structure.",
    };
  }
  if (page.kind === "butter-oil") {
    return {
      rule: "Use about 3/4 cup oil for every 1 cup butter in pourable batters.",
      works: "Muffins, loaf cakes, snack cakes, brownies, and quick breads.",
      limit: "Do not use this as a blind swap for pie crust, laminated dough, or cookies built around creamed butter.",
    };
  }
  if (page.kind === "pan-size") {
    return {
      rule: "Scale batter by surface area: new pan area divided by original pan area.",
      works: "Layer cakes, brownies, bars, and simple batters where depth stays close.",
      limit: "Very deep pans, bundt pans, glass pans, and dark metal pans still need judgment on bake time.",
    };
  }
  if (page.kind === "sourdough") {
    return {
      rule: "Hydration percentage = total water weight divided by total flour weight, multiplied by 100.",
      works: "Bread dough, starter feeding, pizza dough, and formulas written in grams.",
      limit: "Cup measurements are too loose for exact hydration, especially with whole grain flour.",
    };
  }
  if (page.kind === "cake-serving") {
    return {
      rule: "Estimate servings from cake size, height, and slice style.",
      works: "Birthday cakes, event cakes, wedding-style portions, and dessert table planning.",
      limit: "Serving charts vary because real slices vary. Casual parties usually need a buffer.",
    };
  }
  return {
    rule: "Multiplier = desired yield divided by original yield.",
    works: "Most ingredient lists when measurements are weight-based or easy to scale.",
    limit: "Eggs, salt, spices, leavening, pan area, and bake time need separate judgment.",
  };
}

function SourceNote({ page }: { page: ToolPage }) {
  const note = ratioSource(page);
  return (
    <section className="mt-8 rounded-card border border-slate-200 bg-white p-6 shadow-card">
      <p className="text-sm font-semibold uppercase tracking-wide text-accent mb-2">Ratio note</p>
      <h2 className="text-2xl font-bold text-slate-900 mb-4">The kitchen rule behind this page</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-lg bg-slate-50 p-4">
          <p className="text-sm font-semibold text-slate-900">Rule used</p>
          <p className="text-sm text-slate-700 leading-relaxed mt-2">{note.rule}</p>
        </div>
        <div className="rounded-lg bg-emerald-50 p-4">
          <p className="text-sm font-semibold text-slate-900">Where it works</p>
          <p className="text-sm text-slate-700 leading-relaxed mt-2">{note.works}</p>
        </div>
        <div className="rounded-lg bg-rose-50 p-4">
          <p className="text-sm font-semibold text-slate-900">Where to be careful</p>
          <p className="text-sm text-slate-700 leading-relaxed mt-2">{note.limit}</p>
        </div>
      </div>
    </section>
  );
}

function ClusterMap({ page }: { page: ToolPage }) {
  const category = toolCategories[page.kind];
  const hubLinks = toolPages
    .filter((item) => item.kind === page.kind && item.slug !== page.slug)
    .slice(0, 6);

  return (
    <section className="mt-10 rounded-card border border-slate-200 bg-slate-50 p-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-accent mb-2">Topic cluster</p>
      <h2 className="text-2xl font-bold text-slate-900">More useful paths in {category.label}</h2>
      <p className="text-slate-600 leading-relaxed mt-2">
        This page is part of a baking calculator cluster. Use the main category when you want the broad rule,
        then move into the narrower pages when the ingredient, pan, or recipe is specific.
      </p>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {hubLinks.map((item) => (
          <Link key={item.slug} href={`/tools/${item.slug}/`} className="rounded-lg bg-white border border-slate-200 p-4 hover:border-accent">
            <p className="font-semibold text-slate-900">{item.h1}</p>
            <p className="text-sm text-slate-600 mt-1 line-clamp-2">{item.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ExpertUpgrade({ page }: { page: ToolPage }) {
  if (!isPriorityLongTailPage(page)) return null;

  return (
    <section className="mt-8 rounded-card border border-amber-200 bg-gradient-to-br from-white to-amber-50 p-6 shadow-card">
      <p className="text-sm font-semibold uppercase tracking-wide text-accent mb-2">Baker's note</p>
      <h2 className="text-2xl font-bold text-slate-900 mb-3">How I would handle this in a real kitchen</h2>
      <p className="text-slate-700 leading-relaxed max-w-3xl">{expertNote(page)}</p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
        {expertChecks(page).map((check) => (
          <div key={check.label} className="rounded-lg border border-slate-200 bg-white p-4">
            <p className="font-semibold text-slate-900">{check.label}</p>
            <p className="text-sm text-slate-600 leading-relaxed mt-1">{check.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-lg bg-slate-900 text-white p-5">
        <h3 className="text-lg font-semibold text-white mb-3">Mini workflow</h3>
        <ol className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {expertSteps(page).map((step, index) => (
            <li key={step.title} className="rounded border border-white/15 bg-white/5 p-4">
              <p className="text-sm text-amber-200">Step {index + 1}</p>
              <p className="font-semibold mt-1">{step.title}</p>
              <p className="text-sm text-slate-300 leading-relaxed mt-2">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
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
      {isPriorityLongTailPage(page) && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildHowToSchema(page)) }} />
      )}

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

          <ExpertUpgrade page={page} />
          <SourceNote page={page} />

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
          <ClusterMap page={page} />

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
