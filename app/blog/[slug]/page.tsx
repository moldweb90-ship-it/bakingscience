import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import AdBanner from '@/components/ads/AdBanner';
import { SITE_URL } from '@/lib/constants';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

const blogPosts: Record<string, { title: string; excerpt: string; date: string }> = {
  'why-cup-measurements-fail': {
    title: 'The 20% Error: Why Your Cup Measurements Are Ruining Your Baking',
    excerpt: 'How you fill your measuring cup changes the weight by up to 20%. Learn the three methods professional bakers use.',
    date: '2025-01-15',
  },
  'high-altitude-baking-guide': {
    title: 'Baking in Denver: The High-Altitude Adjustment Guide You Actually Need',
    excerpt: 'Altitude changes everything. Learn exactly how much extra flour and liquid you need above 3,500 feet.',
    date: '2025-01-22',
  },
  'butter-solid-vs-melted-measurement': {
    title: 'Butter Math: Why Solid vs Melted Changes Everything in Your Recipe',
    excerpt: 'The same 113g of butter measures differently depending on whether it is solid, softened, or melted.',
    date: '2025-01-29',
  },
  'flour-types-weight-comparison': {
    title: 'All-Purpose vs Bread vs Cake Flour: The Weight Difference That Ruins Recipes',
    excerpt: 'Different flour types have different densities. 1 cup of cake flour weighs 30% less than 1 cup of bread flour.',
    date: '2025-02-05',
  },
  'precision-measurement-guide': {
    title: "Stop Eyeballing: A Professional Baker's Guide to Precision Measurement",
    excerpt: 'Step-by-step photo guide for each measurement method.',
    date: '2025-02-12',
  },
};

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts[slug];
  if (!post) return { title: 'Not Found' };

  return {
    title: `${post.title} | BakingScience`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${SITE_URL}/blog/${slug}/`,
      siteName: 'BakingScience',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
    alternates: {
      canonical: `${SITE_URL}/blog/${slug}/`,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts[slug];
  if (!post) notFound();

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog/' },
    { label: post.title },
  ];

  return (
    <div className="py-8 sm:py-12 max-w-3xl">
      <Breadcrumbs items={breadcrumbItems} />

      <article>
        <header className="mb-8">
          <time className="text-sm text-slate-400">{post.date}</time>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
            {post.title}
          </h1>
          <p className="text-lg text-slate-600">{post.excerpt}</p>
        </header>

        <div className="card p-8 text-center">
          <div className="text-6xl mb-4">{"\ud83d\udcdd"}</div>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">Full Article Coming Soon</h2>
          <p className="text-slate-600">
            This article is currently being written by the BakingScience team.
            Check back soon for expert insights on {post.excerpt.toLowerCase()}
          </p>
        </div>

        <div className="mt-8">
          <AdBanner />
        </div>
      </article>
    </div>
  );
}
