import Link from 'next/link';
import { Search, BarChart3, Target } from 'lucide-react';
import SearchBar from '@/components/ui/SearchBar';
import IngredientGrid from '@/components/ui/IngredientGrid';
import { ingredients } from '@/lib/converter';
import { SITE_URL, SITE_NAME } from '@/lib/constants';

type SearchMode = 'grams_to_cups' | 'cups_to_grams';

interface HomeLandingProps {
  heroTitle: string;
  heroSubtitle: string;
  initialMode: SearchMode;
}

const searchIngredients = Object.values(ingredients).map((i) => ({
  id: i.id,
  name: i.name,
  category: i.category,
  common_weights_g: i.common_weights_g,
  aliases: i.aliases,
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
    description: 'See precise cup, tablespoon, and teaspoon values for your specific amount.',
  },
];

const blogPostPlaceholders = [
  {
    title: 'The 20% Error: Why Your Cup Measurements Are Ruining Your Baking',
    slug: 'why-cup-measurements-fail',
    excerpt: 'How you fill your measuring cup changes the weight by up to 20%. Learn the three methods professional bakers use and why Google AI can never give you the full picture.',
    date: '2025-01-15',
    image: 'https://images.pexels.com/photos/7299855/pexels-photo-7299855.jpeg?auto=compress&cs=tinysrgb&h=520&w=840',
    imageAlt: 'A bowl on a kitchen scale for precise baking measurements',
  },
  {
    title: 'Baking in Denver: The High-Altitude Adjustment Guide You Actually Need',
    slug: 'high-altitude-baking-guide',
    excerpt: 'Altitude changes everything. Learn exactly how much extra flour and liquid you need above 3,500 feet, with a city-by-city adjustment table.',
    date: '2025-01-22',
    image: 'https://images.pexels.com/photos/15033893/pexels-photo-15033893.jpeg?auto=compress&cs=tinysrgb&h=520&w=840',
    imageAlt: 'Snowy mountain peaks for a high altitude baking guide',
  },
  {
    title: 'Butter Math: Why Solid vs Melted Changes Everything in Your Recipe',
    slug: 'butter-solid-vs-melted-measurement',
    excerpt: 'The same 113g of butter measures differently depending on whether it is solid, softened, or melted. See the visual comparison that will change how you bake.',
    date: '2025-01-29',
    image: 'https://images.pexels.com/photos/94443/pexels-photo-94443.jpeg?auto=compress&cs=tinysrgb&h=520&w=840',
    imageAlt: 'Butter and flour on a counter for a baking measurement guide',
  },
];

const highIntentConversions = [
  { label: '200 grams to cups', href: '/grams-to-cups/200-grams-to-cups/', note: 'compare flour, sugar, butter and more' },
  { label: '1 cup to grams', href: '/cups-to-grams/1-cup-to-grams/', note: 'ingredient-by-ingredient chart' },
  { label: '1/2 cup to grams', href: '/cups-to-grams/1-2-cup-to-grams/', note: 'common baking fraction' },
  { label: '1/4 cup to grams', href: '/cups-to-grams/1-4-cup-to-grams/', note: 'small batch conversions' },
  { label: '1/2 cup in teaspoons', href: '/cups-to-teaspoons/1-2-cup-to-teaspoons/', note: 'exact cup to tsp ratio' },
  { label: '240 ml to grams', href: '/ml-to-grams/240-ml-to-grams/', note: 'water, flour and sugar chart' },
  { label: '50 grams to cups', href: '/grams-to-cups/50-grams-to-cups/', note: 'quick dry ingredient lookup' },
  { label: '500 grams to cups', href: '/grams-to-cups/500-grams-to-cups/', note: 'large batch conversions' },
];

const priorityIngredientConversions = [
  { label: '1 cup granulated sugar in grams', href: '/granulated-sugar/cups-to-grams/1-cup-to-grams/' },
  { label: '1 cup flour in grams', href: '/all-purpose-flour/cups-to-grams/1-cup-to-grams/' },
  { label: '1 cup butter in grams', href: '/butter/cups-to-grams/1-cup-to-grams/' },
  { label: '1/2 cup sugar in grams', href: '/granulated-sugar/cups-to-grams/1-2-cup-to-grams/' },
  { label: '1/2 cup butter in grams', href: '/butter/cups-to-grams/1-2-cup-to-grams/' },
  { label: '1 cup powdered sugar in grams', href: '/powdered-sugar/cups-to-grams/1-cup-to-grams/' },
  { label: '1/2 cup brown sugar in grams', href: '/brown-sugar/cups-to-grams/1-2-cup-to-grams/' },
  { label: '1 cup peanut butter in grams', href: '/peanut-butter/cups-to-grams/1-cup-to-grams/' },
  { label: '1 cup water in grams', href: '/water/cups-to-grams/1-cup-to-grams/' },
  { label: '1 cup cooked rice in grams', href: '/rice/cups-to-grams/1-cup-to-grams/' },
];

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL + '/',
  description: 'Precision baking conversions from grams to cups and cups to grams',
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

export default function HomeLanding({ heroTitle, heroSubtitle, initialMode }: HomeLandingProps) {
  return (
    <div className="py-8 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <section className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 max-w-3xl mx-auto leading-tight">
          {heroTitle}
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-8">{heroSubtitle}</p>
      </section>

      <section className="max-w-xl mx-auto mb-16">
        <SearchBar ingredients={searchIngredients} initialMode={initialMode} />
      </section>

      <section className="mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-5">
              Most Searched Baking Conversions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {highIntentConversions.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="card p-4 hover:border-accent transition-colors"
                >
                  <span className="block font-semibold text-accent-hover">{item.label}</span>
                  <span className="block text-sm text-slate-500 mt-1">{item.note}</span>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-5">
              Popular Ingredient Lookups
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {priorityIngredientConversions.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="card p-4 hover:border-accent transition-colors"
                >
                  <span className="block font-semibold text-accent-hover">{item.label}</span>
                  <span className="block text-sm text-slate-500 mt-1">direct answer with method comparison</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 text-center">
          All Ingredients
        </h2>
        <IngredientGrid ingredients={gridIngredients} />
      </section>

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
            Google&apos;s AI Overview often gives broad ranges for conversions. That gap can be enough
            to ruin a delicate recipe. Professional bakers weigh ingredients because volume
            measurements are inconsistent.
          </p>
          <p>
            BakingConverter gives you exact conversions based on density data, adjusted for your
            measurement method. No ranges. No guesswork. Just practical numbers you can use.
          </p>
          <p>
            <Link href="/blog/" className="text-accent hover:text-accent-hover font-medium">
              Read our full guide on measurement accuracy &rarr;
            </Link>
          </p>
        </div>
      </section>

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
              <img
                src={post.image}
                alt={post.imageAlt}
                className="h-40 w-full rounded-card object-cover"
                loading="lazy"
              />
              <h3 className="font-semibold text-slate-900 group-hover:text-accent transition-colors leading-snug">
                {post.title}
              </h3>
              <p className="text-sm text-slate-600 flex-1">{post.excerpt}</p>
              <time className="text-xs text-slate-400">{post.date}</time>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <div className="ad-slot-horizontal mx-auto">
          <span>Advertisement</span>
        </div>
      </section>
    </div>
  );
}
