import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { blogPosts } from '@/data/blog-posts';

export const metadata: Metadata = {
  title: 'Baking Science Blog - Tips, Guides & Conversion Deep Dives',
  description: 'Expert baking articles covering measurement accuracy, high-altitude baking, ingredient science, and precision techniques.',
};

const categoryLabels: Record<string, string> = {
  guides: 'Guides',
  ingredients: 'Ingredients',
  science: 'Science',
  tips: 'Tips',
  recipes: 'Recipes',
};

const categoryOrder = ['guides', 'ingredients', 'science', 'tips', 'recipes'];

export default function BlogListingPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Blog' },
  ];

  const grouped = blogPosts.reduce<Record<string, typeof blogPosts>>((acc, post) => {
    if (!acc[post.category]) acc[post.category] = [];
    acc[post.category].push(post);
    return acc;
  }, {});

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

      {categoryOrder.map((cat) => {
        const posts = grouped[cat];
        if (!posts || posts.length === 0) return null;

        return (
          <section key={cat} className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              {categoryLabels[cat] || cat}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}/`}
                  className="card p-6 flex flex-col gap-3 group hover:border-accent transition-colors"
                >
                  <div className="bg-slate-100 rounded-card h-40 flex items-center justify-center text-4xl">
                    {post.emoji}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 capitalize bg-slate-100 px-2 py-0.5 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-slate-400">{post.readTime} min</span>
                  </div>
                  <h3 className="font-semibold text-slate-900 group-hover:text-accent transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-sm text-slate-600 flex-1 line-clamp-3">{post.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <time className="text-xs text-slate-400">{post.date}</time>
                    <span className="text-sm text-accent group-hover:text-accent-hover font-medium">
                      Read More &rarr;
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
