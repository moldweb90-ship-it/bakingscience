import type { Metadata } from 'next';
import Link from 'next/link';
import SearchBar from '@/components/ui/SearchBar';
import IngredientGrid from '@/components/ui/IngredientGrid';
import { ingredients } from '@/lib/converter';
import { SITE_NAME, SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'BakingScience - Precision Baking Conversions (Grams to Cups)',
  description:
    'Stop guessing. Convert baking ingredients from grams to cups with scientific accuracy. Accounts for sifted, packed, and spooned methods. Free interactive calculator for 20+ ingredients.',
  openGraph: {
    title: 'BakingScience - Precision Baking Conversions (Grams to Cups)',
    description:
      'Stop guessing. Convert baking ingredients from grams to cups with scientific accuracy. Accounts for sifted, packed, and spooned methods. Free interactive calculator for 20+ ingredients.',
    url: SITE_URL,
    siteName: SITE_NAME,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BakingScience - Precision Baking Conversions (Grams to Cups)',
    description:
      'Stop guessing. Convert baking ingredients from grams to cups with scientific accuracy.',
  },
};

const howItWorksSteps = [
  {
    icon: '\ud8e2\ude02',
    title: 'Choose your ingredient',
    description: 'Select from 20+ baking ingredients including flours, sugars, fats, and dairy.',
  },
  {
    icon: '\ud83d\udcca',
    title: 'Select your method',
    description: 'Spoon & Level, Dip & Sweep, or Sifted - each gives a different result.',
  },
  {
    icon: '\ud83c\udfaf',
    title: 'Get your exact measurement',
    description: 'See precise cup, tablespoon, and teaspoon values for your specific weight.',
  },
];

const blogPostPlaceholders = [
  {
    title: 'The 20% Error: Why Your Cup Measurements Are Ruining Your Baking',
    slug: 'why-cup-measurements-fail',
    excerpt: 'How you fill your measuring cup changes the weight by up to 20%. Learn the three methods professional bakers use.',
    date: '2025-01-15',
  },
  {
    title: 'Baking in Denver: The High-Altitude Adjustment Guide You Actually Need',
    slug: 'high-altitude-baking-guide',
    excerpt: 'Altitude changes everything. Learn exactly how much extra flour and liquid you need above 3,500 feet.',
    date: '2025-01-22',
  },
  {
    title: 'Butter Math: Why Solid vs Melted Changes Everything in Your Recipe',
    slug: 'butter-solid-vs-melted-measurement',
    excerpt: 'The same 113g of butter measures differently depending on whether it is solid, softened, or melted.',
    date: '2025-01-29',
  },
];

export default function HomePage() {
  const allIngredients = Object.values(ingredients);

  return (
    <div className="py-8 sm:py-12">
      {/* Section 1: Hero */}
      <section className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 max-w-3xl mx-auto leading-tight">
          Bakking Conversions Done Right - Not 'Roughly'
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-8">
          Because Google’s „approximately 0.8 cups” isn’t good enough for your sourdough
        </p>
      </section>

      {/* Section 2: SearchBar */}
      <section className="max-w-xl mx-auto mb-16">
        <SearchBar ingredients={allIngredients} />
      </section>

      {/* Section 3: IngredientGrid */}
      <section className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 text-center">
          All Ingredients
        </h2>
        <IngredientGrid ingredients={allIngredients} />
      </section>

      {/* Section 4: How It Works */}
      <section className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8 text-center">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {howItWorksSteps.map((step, index) => (
            <div key={index} className="card p-6 text-center">
              <span className="text-4xl mb-3 block">{step.icon}</span>
              <h3 className="font-semibold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-sm text-slate-600">{step.description}</p>
            </div>
          ))}
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
            Google’s AI Overview tells you "roughly 0.72 to 0.8 cups" for 100g of flour. That
            range represents a 10% difference - enough to ruin a delicate recipe. Professional
            bakers weigh ingredients because volume measurements are inherently inconsistent. The
            same cup of flour can weigh anywhere from 120g to 150g depending on whether you spoon
            it, scoop it, or sift it.
          </p>
          <p>
            BakingScience gives you exact conversions based on USDA density data, adjusted for your
            specific measurement method. Whether you spoon and level, dip and sweep, or sift your
            ingredients, we calculate the precise volume so your recipe turns out right every time.
            No ranges. No "approximately." Just science-backed numbers you can trust.
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
              <div className="bg-slate-100 rounded-card h-40 flex items-center justify-center text-4xl">
                \ud83d\udd45
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
