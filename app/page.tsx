import type { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { Search, BarChart3, Target } from 'lucide-react';
import SearchBar from '@/components/ui/SearchBar';
import IngredientGrid from '@/components/ui/IngredientGrid';
import { ingredients } from '@/lib/converter';
import { SITE_URL, SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Grams to Cups — Baking Conversion Chart | BakingConverter',
  description:
    "Baking conversion charts done right — not 'roughly'. Convert grams to cups for 50+ ingredients. Precise results for every recipe.",
  openGraph: {
    title: 'Grams to Cups — Baking Conversion Chart | BakingConverter',
    description:
      "Baking conversion charts done right — not 'roughly'. Convert grams to cups for 50+ ingredients. Precise results for every recipe.",
    url: SITE_URL,
    siteName: SITE_NAME,
    type: 'website',
    images: [{ url: '/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Grams to Cups — Baking Conversion Chart | BakingConverter',
    description:
      "Baking conversion charts done right — not 'roughly'. Convert grams to cups for 50+ ingredients. Precise results for every recipe.",
    images: ['/og-default.png'],
  },
  alternates: { canonical: '/' },
};

// Reduced payload: only send what UI components need
const searchIngredients = Object.values(ingredients).map((i) => ({
  id: i.id,
  name: i.name,
  category: i.category,
  common_weights_g: i.common_weights_g,
}));

const gridIngredients = Object.values(ingredients).map((i) => ({
  id: i.id,
  name: i.name,
  category: i.category,
  common_weights_g: i.common_weights_g,
}));

const howItWorksSteps = [
  {
    icon: Search,
    title: 'Choose your ingredient',
    description: 'Select from 20+ baking ingredients including flours, sugars, fats, and dairy.',
  },
  {
    icon: BarChart3,
    title: 'Select your method',
    description: 'Spoon & Level, Dip & Sweep, or Sifted - each gives a different result.',
  },
  {
    icon: Target,
    title: 'Get your exact measurement',
    description: 'See precise cup, tablespoon, and teaspoon values for your specific weight.',
  },
];

const blogPostPlaceholders = [
  {
    title: 'The 20% Error: Why Your Cup Measurements Are Ruining Your Baking',
    slug: 'why-cup-measurements-fail',
    excerpt: 'How you fill your measuring cup changes the weight by up to 20%. Learn the three methods professional bakers use and why Google AI can never give you the full picture.',
    date: '2025-01-15',
    gradient: 'from-blue-400 to-blue-600',
    icon: '\u274C',
  },
  {
    title: 'Baking in Denver: The High-Altitude Adjustment Guide You Actually Need',
    slug: 'high-altitude-baking-guide',
    excerpt: 'Altitude changes everything. Learn exactly how much extra flour and liquid you need above 3,500 feet, with a city-by-city adjustment table.',
    date: '2025-01-22',
    gradient: 'from-amber-400 to-orange-600',
    icon: '\u26F0',
  },
  {
    title: 'Butter Math: Why Solid vs Melted Changes Everything in Your Recipe',
    slug: 'butter-solid-vs-melted-measurement',
    excerpt: 'The same 113g of butter measures differently depending on whether it is solid, softened, or melted. See the visual comparison that will change how you bake.',
    date: '2025-01-29',
    gradient: 'from-yellow-300 to-amber-500',
    icon: '\uD83E\uDDC8',
  },
];

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL + '/',
  description: 'Precision baking conversions from grams to cups',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: SITE_URL + '/{search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL + '/',
  logo: SITE_URL + '/logo.png',
  sameAs: [],
};

export default function HomePage() {
  return (
    <div className="py-8 sm:py-12">
      {/* JSON-LD Schemas */}
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      {/* Section 1: Hero */}
      <section className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 max-w-3xl mx-auto leading-tight">
          Grams to Cups &mdash; Baking Conversion Chart &amp; Calculator
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-8">
          Precise gram-to-cup conversion charts for flour, sugar, butter and 50+ baking ingredients. No rounding. No guessing.
        </p>
      </section>

      {/* Section 2: SearchBar */}
      <section className="max-w-xl mx-auto mb-16">
        <SearchBar ingredients={searchIngredients} />
      </section>

      {/* Section 3: IngredientGrid */}
      <section className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 text-center">
          All Ingredients
        </h2>
        <IngredientGrid ingredients={gridIngredients} />
      </section>

      {/* Section 4: How It Works */}
      <section className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8 text-center">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {howItWorksSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="card p-6 text-center">
                <div className="flex justify-center mb-3">
                  <Icon className="w-10 h-10 text-accent" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-600">{step.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 5: Why Accuracy Matters */}
      <section className="mb-16 max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
          Why Accuracy Matters in Baking
        </h2>
        <div className="card p-6 sm:p-8 space-y-4 text-slate-700 leading-relaxed">
          <p>
            The number one cause of baking failure is incorrect measurement. A 10% error in flour
            can mean the difference between a moist, tender cake and a dry, crumbly disappointment.
            Yet most home bakers rely on cup measurements that vary wildly depending on how the cup
            is filled.
          </p>
          <p>
            Google&apos;s AI Overview tells you &ldquo;roughly 0.72 to 0.8 cups&rdquo; for 100g of flour. That
            range represents a 10% difference - enough to ruin a delicate recipe. Professional
            bakers weigh ingredients because volume measurements are inherently inconsistent. The
            same cup of flour can weigh anywhere from 120g to 150g depending on whether you spoon
            it, scoop it, or sift it.
          </p>
          <p>
            BakingConverter gives you exact conversions based on USDA density data, adjusted for your
            specific measurement method. Whether you spoon and level, dip and sweep, or sift your
            ingredients, we calculate the precise volume so your recipe turns out right every time.
            No ranges. No &ldquo;approximately.&rdquo; Just science-backed numbers you can trust.
          </p>
          <p>
            Our interactive tools let you compare methods side by side, scale entire recipes, and
            see exactly how altitude affects your measurements. This is not a simple calculator -
            it is a complete baking science lab designed to make you a better baker.
          </p>
          <p>
            <Link href="/blog/" className="text-accent hover:text-accent-hover font-medium">
              Read our full guide on measurement accuracy &rarr;
            </Link>
          </p>
        </div>
      </section>

      {/* Section 6: Latest Blog Posts */}
      <section className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8 text-center">
          Latest from the Blog
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {blogPostPlaceholders.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}/`}
              className="card p-6 flex flex-col gap-3 group hover:border-accent transition-colors"
            >
              <div className={`bg-gradient-to-br ${post.gradient} rounded-card h-40 flex items-center justify-center text-5xl text-white`}>
                {post.icon}
              </div>
              <h3 className="font-semibold text-slate-900 group-hover:text-accent transition-colors leading-snug">
                {post.title}
              </h3>
              <p className="text-sm text-slate-600 flex-1">{post.excerpt}</p>
              <time className="text-xs text-slate-400">{post.date}</time>
            </Link>
          ))}
        </div>
      </section>

      {/* Section 7: Ad Slot */}
      <section className="mb-8">
        <div className="ad-slot-horizontal mx-auto">
          <span>Advertisement</span>
        </div>
      </section>
    </div>
  );
}
