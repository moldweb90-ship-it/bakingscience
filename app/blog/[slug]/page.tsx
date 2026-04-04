import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import Link from 'next/link';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import AdBanner from '@/components/ads/AdBanner';
import BlogShareButtons from '@/components/sharing/BlogShareButtons';
import { blogPosts } from '@/data/blog-posts';
import { SITE_URL, SITE_NAME } from '@/lib/constants';
import { ingredients } from '@/lib/converter';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: 'Not Found' };

  const canonical = `${SITE_URL}/blog/${slug}/`;
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Organization', name: SITE_NAME },
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    mainEntityOfPage: canonical,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog/` },
      { '@type': 'ListItem', position: 3, name: post.title },
    ],
  };

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: canonical,
      siteName: SITE_NAME,
      type: 'article',
      images: [{ url: '/og-default.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: ['/og-default.png'],
    },
    alternates: { canonical },
    other: {
      'script:ld+json': JSON.stringify([articleSchema, breadcrumbSchema]),
    },
  };
}

function extractTOC(content: string): { id: string; text: string }[] {
  const h2Regex = /<h2[^>]*>(.*?)<\/h2>/g;
  const headings: { id: string; text: string }[] = [];
  let match;
  let index = 0;
  while ((match = h2Regex.exec(content)) !== null) {
    const text = match[1].replace(/<[^>]*>/g, '').replace(/&amp;/g, '&');
    headings.push({ id: `section-${index}`, text });
    index++;
  }
  return headings;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog/' },
    { label: post.title },
  ];

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== slug && post.relatedPosts.includes(p.slug))
    .slice(0, 3);

  const relatedIngredients = post.relatedIngredients
    .map((id) => ingredients[id])
    .filter((ing): ing is NonNullable<typeof ing> => ing !== undefined);

  const toc = extractTOC(post.content);

  return (
    <div className="py-8 sm:py-12">
      <div className="flex flex-col lg:flex-row gap-8 max-w-page mx-auto px-4 sm:px-6 lg:px-8">
        <article className="flex-1 min-w-0 max-w-3xl">
          <Breadcrumbs items={breadcrumbItems} />

          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm text-slate-500 capitalize bg-slate-100 px-3 py-1 rounded-full">
                {post.category}
              </span>
              <span className="text-sm text-slate-400">{post.readTime} min read</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 leading-tight">
              {post.title}
            </h1>
            <p className="text-lg text-slate-600">{post.description}</p>
            <time className="text-sm text-slate-400 mt-2 block" dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
          </header>

          {/* Table of Contents */}
          {toc.length > 0 && (
            <nav className="card p-5 mb-8" aria-label="Table of contents">
              <h2 className="font-semibold text-slate-900 mb-3">In This Article</h2>
              <ul className="space-y-2">
                {toc.map((heading, i) => (
                  <li key={i}>
                    <a href={`#${heading.id}`} className="text-sm text-slate-600 hover:text-accent transition-colors">
                      {heading.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {/* Article Content */}
          <div
            className="prose prose-slate max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Author Box */}
          <div className="card p-6 mt-8 flex items-start gap-4">
            <div className="w-12 h-12 bg-accent-light rounded-full flex items-center justify-center text-2xl flex-shrink-0">
              {"\ud83e\uddc1"}
            </div>
            <div>
              <p className="font-semibold text-slate-900">BakingScience Team</p>
              <p className="text-sm text-slate-600 mt-1">
                We&apos;re obsessed with precise baking measurements. Every conversion on this site is backed by USDA density data and tested in real kitchens.
              </p>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="mt-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Related Articles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedPosts.map((rp) => (
                  <Link key={rp.slug} href={`/blog/${rp.slug}/`} className="card p-4 hover:border-accent transition-colors group">
                    <span className="text-xl block mb-2">{rp.emoji}</span>
                    <h3 className="font-semibold text-slate-900 group-hover:text-accent transition-colors text-sm leading-snug">
                      {rp.title}
                    </h3>
                    <time className="text-xs text-slate-400 mt-2 block">{rp.date}</time>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Related Ingredients */}
          {relatedIngredients.length > 0 && (
            <section className="mt-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Related Ingredients</h2>
              <div className="flex flex-wrap gap-2">
                {relatedIngredients.map((ing) => (
                  <Link
                    key={ing.id}
                    href={`/${ing.id}/`}
                    className="btn-secondary text-sm px-3 py-2 min-h-[36px]"
                  >
                    {ing.name}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Share Buttons */}
          <section className="mt-10 card p-6">
            <h3 className="font-semibold text-slate-900 mb-3">Share this article</h3>
            <BlogShareButtons url={`${SITE_URL}/blog/${slug}/`} title={post.title} />
          </section>

          <div className="mt-8">
            <AdBanner />
          </div>
        </article>

        {/* Sidebar */}
        <aside className="hidden lg:block w-[300px] flex-shrink-0">
          <div className="sticky top-20 space-y-6">
            <div className="card p-4">
              <h3 className="font-semibold text-slate-900 mb-3 text-sm">Popular Ingredients</h3>
              <ul className="space-y-2">
                {Object.values(ingredients).slice(0, 8).map((i) => (
                  <li key={i.id}>
                    <Link href={`/${i.id}/`} className="text-sm text-slate-600 hover:text-accent transition-colors">
                      {i.name}
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
