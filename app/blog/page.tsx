import type { Metadata } from 'next';
import BlogCard from '@/components/ui/BlogCard';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Baking Science Blog — Tips, Guides & Conversion Deep Dives | BakingScience',
  description: 'Expert baking articles covering measurement accuracy, high-altitude baking, ingredient science, and precision techniques.',
};

const blogPosts = [
  {
    title: 'The 20% Error: Why Your Cup Measurements Are Ruining Your Baking',
    slug: 'why-cup-measurements-fail',
    excerpt: 'How you fill your measuring cup changes the weight by up to 20%. Learn the three methods professional bakers use and why Google AI can never give you the full picture.',
    date: '2025-01-15',
  },
  {
    title: 'Baking in Denver: The High-Altitude Adjustment Guide You Actually Need',
    slug: 'high-altitude-baking-guide',
    excerpt: 'Altitude changes everything. Learn exactly how much extra flour and liquid you need above 3,500 feet, with a city-by-city adjustment table.',
    date: '2025-01-22',
  },
  {
    title: 'Butter Math: Why Solid vs Melted Changes Everything in Your Recipe',
    slug: 'butter-solid-vs-melted-measurement',
    excerpt: 'The same 113g of butter measures differently depending on whether it is solid, softened, or melted. See the visual comparison that will change how you bake.',
    date: '2025-01-29',
  },
  {
    title: 'All-Purpose vs Bread vs Cake Flour: The Weight Difference That Ruins Recipes',
    slug: 'flour-types-weight-comparison',
    excerpt: 'Different flour types have different densities. 1 cup of cake flour weighs 30% less than 1 cup of bread flour. See the full comparison table for all 6 flour types.',
    date: '2025-02-05',
  },
  {
    title: "Stop Eyeballing: A Professional Baker's Guide to Precision Measurement",
    slug: 'precision-measurement-guide',
    excerpt: 'Step-by-step photo guide for each measurement method. Learn why professional bakers always weigh, and how to get the most accuracy from cup measurements when a scale is not available.',
    date: '2025-02-12',
  },
];

export default function BlogListingPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Blog' },
  ];

  return (
    <div className="py-8 sm:py-12">
      <Breadcrumbs items={breadcrumbItems} />

      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
          Baking Science Blog
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl">
          Expert articles on measurement accuracy, ingredient science, and precision baking techniques.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
        {blogPosts.map((post) => (
          <BlogCard
            key={post.slug}
            title={post.title}
            slug={post.slug}
            excerpt={post.excerpt}
            publishedDate={post.date}
            comingSoon
          />
        ))}
      </div>
    </div>
  );
}
