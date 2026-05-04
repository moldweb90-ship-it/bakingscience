import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
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

const LEGACY_BLOG_REDIRECTS: Record<string, string> = {
  'flour-types-weight-comparison': 'baking-conversion-chart-printable',
  'precision-measurement-guide': 'how-to-measure-flour-correctly',
};

const FEATURED_BLOG_IMAGES: Record<string, { src: string; alt: string }> = {
  'why-cup-measurements-fail': {
    src: '/images/blog/cup-measurements-scale.jpg',
    alt: 'A bowl being weighed on a kitchen scale while baking ingredients are prepared',
  },
  'high-altitude-baking-guide': {
    src: '/images/blog/high-altitude-mountains.jpg',
    alt: 'Snow-covered mountains under a clear sky representing high altitude baking conditions',
  },
  'butter-solid-vs-melted-measurement': {
    src: '/images/blog/butter-flour-counter.jpg',
    alt: 'Butter and flour on a kitchen counter ready for baking',
  },
};

const ENHANCED_BLOG_CONTENT: Record<string, string> = {
  'why-cup-measurements-fail': `
<p>Most cup-measurement problems do not look dramatic while they are happening. You scoop flour, level it off, keep moving, and only notice the damage when the cookies come out dry or the cake crumb feels tight.</p>
<p>The quiet problem is this: <strong>the same measuring cup can hold roughly 106g to 148g of flour</strong>, depending on whether the flour was sifted, spooned, or packed by dipping the cup into the bag. That is not a tiny rounding error. That is the difference between a recipe behaving and a recipe fighting back.</p>
<blockquote>A cup is a container. A gram is a measurement. In baking, that distinction matters.</blockquote>
<figure class="blog-photo"><img src="/images/blog/flour-on-scale.jpg" alt="Flour and baking ingredients being measured on a digital kitchen scale" /><figcaption>When flour is weighed, the recipe starts from a known number instead of a packed or airy cup.</figcaption></figure>
<h2>The Three Methods (and Why They Give Different Results)</h2>
<p>There are three common ways people fill a measuring cup with flour. They all look normal. They do not bake the same.</p>
<h3>Method 1: Spoon &amp; Level</h3>
<p>Fluff the flour, spoon it gently into the cup, then sweep the top flat with a knife. For <a href="/all-purpose-flour/">all-purpose flour</a>, this lands near <strong>125g per cup</strong>. It is the method many American recipe developers assume when they write simply "1 cup flour."</p>
<h3>Method 2: Dip &amp; Sweep</h3>
<p>Dip the cup straight into the flour bag and level it off. This compresses flour into the cup and often lands near <strong>148g per cup</strong>. In a two-cup cake recipe, that can mean about 46g extra flour before the batter even reaches the pan.</p>
<h3>Method 3: Sifted Into the Cup</h3>
<p>Sifting before measuring aerates the flour. A cup may land near <strong>106g</strong>. That can be useful when a recipe specifically says "1 cup sifted flour," but it is not interchangeable with a spooned cup.</p>
<h2>The Real Numbers</h2>
<table>
<tr><th>Ingredient</th><th>Spoon &amp; Level</th><th>Dip &amp; Sweep</th><th>Sifted</th><th>What changes in the bake</th></tr>
<tr><td><a href="/all-purpose-flour/">All-Purpose Flour</a></td><td>125g</td><td>148g</td><td>106g</td><td>Cookies, cakes, muffins</td></tr>
<tr><td><a href="/cake-flour/">Cake Flour</a></td><td>111g</td><td>131g</td><td>94g</td><td>Tender cakes and cupcakes</td></tr>
<tr><td><a href="/bread-flour/">Bread Flour</a></td><td>130g</td><td>154g</td><td>111g</td><td>Dough strength and hydration</td></tr>
<tr><td><a href="/granulated-sugar/">Granulated Sugar</a></td><td>200g</td><td>236g</td><td>170g</td><td>Spread, browning, sweetness</td></tr>
<tr><td><a href="/powdered-sugar/">Powdered Sugar</a></td><td>120g</td><td>142g</td><td>102g</td><td>Frosting texture and dusting</td></tr>
</table>
<div class="blog-callout"><strong>Kitchen note:</strong> if a recipe fails once, do not immediately blame the recipe. Re-bake it with weighed flour first. That single change fixes more bad recipes than people expect.</div>
<figure class="blog-photo blog-photo-split"><img src="/images/blog/floured-dough-counter.jpg" alt="Dough being worked on a floured kitchen counter" /><figcaption>Too much flour shows up later as dry dough, tight crumb, and cookies that refuse to spread correctly.</figcaption></figure>
<h2>So What Should You Do?</h2>
<p><strong>Use a kitchen scale when accuracy matters.</strong> This is the cleanest fix. 125g is 125g whether the flour came from a fresh bag, a packed canister, or a humid kitchen.</p>
<p><strong>If you use cups, pick one method and stay consistent.</strong> Spoon the flour in gently, level it once, and do not tap the cup on the counter. Tapping settles the flour and quietly adds more.</p>
<p><strong>Convert by ingredient, not by generic cup math.</strong> A cup of flour is not a cup of sugar by weight. If you need a quick reference, use the <a href="/all-purpose-flour/125-grams-to-cups/">125g flour to cups converter</a> or the ingredient page for the exact item you are baking with.</p>
<h2>The Bottom Line</h2>
<p>Your recipes are probably not broken. Your oven may not be the villain. The phrase "1 cup flour" is simply less precise than it looks. Once you control that one variable, your bakes become easier to repeat, diagnose, and improve.</p>
`,
  'high-altitude-baking-guide': `
<p>If you live above 3,500 feet and your cakes keep rising beautifully, then sinking in the center, you are not imagining it. The recipe may be fine at sea level. Your kitchen is just playing by different rules.</p>
<p>At altitude, air pressure is lower. Gases expand faster, moisture leaves batter sooner, and structure has less time to set. A cake can look successful for the first twenty minutes and still collapse before it cools.</p>
<blockquote>High altitude baking is not about adding random flour. It is about giving the batter enough structure before the gases outrun it.</blockquote>
<figure class="blog-photo"><img src="/images/blog/mountain-peaks-clouds.jpg" alt="Mountain peaks rising above clouds" /><figcaption>Above about 3,500 feet, lower pressure changes how quickly batters rise, dry, and set.</figcaption></figure>
<h2>The Science (Quick Version)</h2>
<p>Three changes matter most in a home kitchen:</p>
<ul>
<li><strong>Leavening works harder.</strong> Baking powder and baking soda release gas, and that gas expands more aggressively than it does at sea level.</li>
<li><strong>Liquids evaporate faster.</strong> Batter can dry before the crumb has enough time to stabilize.</li>
<li><strong>Water boils lower.</strong> At about 5,000 feet, water boils near 203&deg;F instead of 212&deg;F, so steam behavior changes too.</li>
</ul>
<h2>Adjustment Guide by Altitude</h2>
<table>
<tr><th>Adjustment</th><th>3,500-5,000 ft</th><th>5,000-7,000 ft</th><th>7,000+ ft</th><th>Why it helps</th></tr>
<tr><td>Flour</td><td>+1-2 tbsp per cup</td><td>+2-3 tbsp per cup</td><td>+3-4 tbsp per cup</td><td>Adds structure</td></tr>
<tr><td>Sugar</td><td>-1 tbsp per cup</td><td>-2 tbsp per cup</td><td>-2-3 tbsp per cup</td><td>Reduces tenderness that can weaken crumb</td></tr>
<tr><td>Liquid</td><td>+1-2 tbsp per cup</td><td>+2-4 tbsp per cup</td><td>+3-5 tbsp per cup</td><td>Offsets faster evaporation</td></tr>
<tr><td>Leavening</td><td>-15%</td><td>-20%</td><td>-25%</td><td>Slows over-expansion</td></tr>
<tr><td>Oven temperature</td><td>+15&deg;F</td><td>+25&deg;F</td><td>+25&deg;F</td><td>Sets structure sooner</td></tr>
</table>
<div class="blog-callout"><strong>Denver example:</strong> for a cake with 250g <a href="/all-purpose-flour/">all-purpose flour</a>, start around 265g at 5,280 feet. That extra flour is not filler. It is support.</div>
<h2>What This Means in Grams</h2>
<p>If a recipe calls for 250g of flour at sea level, Denver often needs about 260g to 268g depending on the recipe. A delicate butter cake may need the higher end. A dense banana bread may need less.</p>
<p>If the recipe calls for 200g of <a href="/granulated-sugar/">granulated sugar</a>, try reducing to about 185g to 190g at Denver altitude. Less sugar helps the crumb set with more strength.</p>
<figure class="blog-photo blog-photo-split"><img src="/images/blog/weighing-ingredients.jpg" alt="Ingredients being poured onto a kitchen scale" /><figcaption>At altitude, small gram changes matter because flour, sugar, and liquid all affect structure.</figcaption></figure>
<h2>Cities That Need These Adjustments</h2>
<table>
<tr><th>City</th><th>Approx. elevation</th><th>Start with this level</th></tr>
<tr><td>Salt Lake City</td><td>4,226 ft</td><td>3,500-5,000 ft</td></tr>
<tr><td>Denver</td><td>5,280 ft</td><td>5,000-7,000 ft</td></tr>
<tr><td>Albuquerque</td><td>5,312 ft</td><td>5,000-7,000 ft</td></tr>
<tr><td>Colorado Springs</td><td>6,035 ft</td><td>5,000-7,000 ft</td></tr>
<tr><td>Flagstaff</td><td>6,910 ft</td><td>5,000-7,000 ft</td></tr>
<tr><td>Santa Fe</td><td>7,199 ft</td><td>7,000+ ft</td></tr>
</table>
<h2>The Quick Fix</h2>
<p>For most cakes and quick breads around Denver elevation, start with this: add 2 tablespoons flour per cup of flour, reduce sugar by 1 to 2 tablespoons per cup, add 2 tablespoons liquid per cup, reduce leavening by about 20%, and raise the oven by 25&deg;F.</p>
<p>Then write down what happened. High altitude baking rewards notes. If the center still sinks, reduce leavening a little more. If the crumb feels dry, add a touch more liquid next time.</p>
<h2>Bottom Line</h2>
<p>High altitude baking is not harder, but it is less forgiving. More structure, less over-expansion, a little more moisture, and a slightly hotter oven will solve most problems before they start.</p>
`,
  'butter-solid-vs-melted-measurement': `
<p>Butter looks simple until a recipe says "1/2 cup melted butter." Do you measure the stick first and melt it, or melt butter and pour it into a cup? Those two choices are not identical.</p>
<p><strong>113g of butter is one standard U.S. stick.</strong> By weight, it never changes. By volume, it changes with temperature and state: cold, softened, or melted.</p>
<blockquote>If the recipe gives butter in grams, trust the grams. If it gives butter in cups, pay close attention to the comma.</blockquote>
<figure class="blog-photo"><img src="/images/blog/butter-bowl-milk.jpg" alt="Butter in a bowl with milk and baking tools on a wooden board" /><figcaption>Butter behaves differently as a cold solid, a softened fat, and a melted liquid.</figcaption></figure>
<h2>The Numbers</h2>
<table>
<tr><th>Butter state</th><th>113g equals</th><th>Best way to measure</th><th>Recipe risk</th></tr>
<tr><td>Solid, cold stick</td><td>0.50 cups</td><td>Use wrapper marks or a scale</td><td>Reliable for most recipes</td></tr>
<tr><td>Softened, room temperature</td><td>About 0.53 cups</td><td>Weigh if possible</td><td>Can trap air when creamed</td></tr>
<tr><td>Melted</td><td>About 0.57 cups</td><td>Weigh before melting unless told otherwise</td><td>Can cause over-measuring by volume</td></tr>
</table>
<p>That is roughly a 14% volume difference between solid and melted butter. If you are making cookies, brownies, or a butter-heavy cake, that gap can change spread, tenderness, and greasiness.</p>
<h2>Why Does This Happen?</h2>
<p>When butter melts, the fat phase loosens and the water content can separate slightly. The same 113g occupies more space as a liquid than it does as a tidy cold stick. This is why "same weight" and "same cup volume" are not always the same instruction.</p>
<figure class="blog-photo blog-photo-split"><img src="/images/blog/butter-on-parchment.jpg" alt="Butter being spread on a parchment-lined baking tray" /><figcaption>Melted or smeared butter coats flour differently, which is why recipe wording matters.</figcaption></figure>
<h2>What Your Recipe Actually Wants</h2>
<table>
<tr><th>Recipe wording</th><th>What to do</th><th>Why</th></tr>
<tr><td>1/2 cup butter, melted</td><td>Measure 113g or one stick, then melt</td><td>The comma means the butter is measured first</td></tr>
<tr><td>1/2 cup melted butter</td><td>Melt, then measure only if the recipe clearly means liquid volume</td><td>This wording can be ambiguous</td></tr>
<tr><td>1/2 cup softened butter</td><td>Soften until it dents gently, but does not look oily</td><td>Needed for creaming and trapped air</td></tr>
<tr><td>113g butter</td><td>Use the scale and ignore cup state</td><td>Weight is the stable instruction</td></tr>
</table>
<div class="blog-callout"><strong>Cookie note:</strong> melted butter usually makes cookies denser and chewier. Creamed softened butter usually makes them thicker and more aerated. The measurement and the mixing method both matter.</div>
<h2>Using Our Converter</h2>
<p>If you need to convert grams of butter to cups, use the <a href="/butter/">butter converter</a> and choose the right state. <a href="/butter/113-grams-to-cups/">113g of butter</a> can be 0.50 cups as a cold stick or closer to 0.57 cups melted. Both answers are correct in the right context.</p>
<p>The same idea applies to <a href="/coconut-oil/">coconut oil</a>, which changes from solid to liquid around warm room temperature. When fat changes state, volume gets slippery. Weight stays sane.</p>
<h2>The Quick Rule</h2>
<p>When possible, weigh butter. If the recipe says "butter, melted," measure first and melt second. If it says "melted butter" and gives only cups, assume the recipe may be using liquid volume and proceed carefully. For repeatable baking, write down which version you used.</p>
`,
};

function buildArticleSchema(post: (typeof blogPosts)[number], canonical: string) {
  const image = FEATURED_BLOG_IMAGES[post.slug] ?? post.image;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Organization', name: SITE_NAME },
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    mainEntityOfPage: canonical,
    ...(image ? { image: [image.src] } : {}),
  };
}

function buildBreadcrumbSchema(post: (typeof blogPosts)[number]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog/` },
      { '@type': 'ListItem', position: 3, name: post.title },
    ],
  };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const resolvedSlug = LEGACY_BLOG_REDIRECTS[slug] ?? slug;
  const post = blogPosts.find((p) => p.slug === resolvedSlug);
  if (!post) return { title: 'Not Found' };

  const canonical = `${SITE_URL}/blog/${resolvedSlug}/`;
  const image = FEATURED_BLOG_IMAGES[resolvedSlug] ?? post.image;

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: canonical,
      siteName: SITE_NAME,
      type: 'article',
      images: [{ url: image?.src ?? '/og-default.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [image?.src ?? '/og-default.png'],
    },
    alternates: { canonical },
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

function addHeadingIds(content: string) {
  let index = 0;
  return content.replace(/<h2([^>]*)>(.*?)<\/h2>/g, (_match, attrs, text) => {
    const id = `section-${index}`;
    index++;
    return `<h2${attrs} id="${id}">${text}</h2>`;
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const redirectSlug = LEGACY_BLOG_REDIRECTS[slug];
  if (redirectSlug) {
    redirect(`/blog/${redirectSlug}/`);
  }
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

  const content = ENHANCED_BLOG_CONTENT[slug] ?? post.content;
  const image = FEATURED_BLOG_IMAGES[slug] ?? post.image;
  const toc = extractTOC(content);
  const contentWithHeadingIds = addHeadingIds(content);
  const canonical = `${SITE_URL}/blog/${slug}/`;
  const articleSchema = buildArticleSchema(post, canonical);
  const breadcrumbSchema = buildBreadcrumbSchema(post);

  return (
    <div className="py-8 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
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

          {image && (
            <figure className="mb-8 overflow-hidden rounded-card border border-slate-200 bg-warm-white shadow-card">
              <img
                src={image.src}
                alt={image.alt}
                className="h-[240px] w-full object-cover sm:h-[360px]"
              />
            </figure>
          )}

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
            className="blog-content prose prose-slate max-w-none"
            dangerouslySetInnerHTML={{ __html: contentWithHeadingIds }}
          />

          {/* Author Box */}
          <div className="card p-6 mt-8 flex items-start gap-4">
            <div className="w-12 h-12 bg-accent-light rounded-full flex items-center justify-center text-2xl flex-shrink-0">
              {"\ud83e\uddc1"}
            </div>
            <div>
              <p className="font-semibold text-slate-900">BakingConverter Team</p>
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
