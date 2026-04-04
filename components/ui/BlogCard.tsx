import Link from 'next/link';

export interface BlogCardProps {
  title: string;
  slug: string;
  excerpt: string;
  publishedDate: string;
  comingSoon?: boolean;
}

export default function BlogCard({ title, slug, excerpt, publishedDate, comingSoon }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${slug}/`}
      className="card p-6 flex flex-col gap-3 group hover:border-accent transition-colors relative"
    >
      {comingSoon && (
        <span className="absolute top-3 right-3 badge badge-warning text-xs">Coming Soon</span>
      )}
      <div className="bg-slate-100 rounded-card h-40 flex items-center justify-center text-4xl">
        {"\ud83d\udcdd"}
      </div>
      <h3 className="font-semibold text-slate-900 group-hover:text-accent transition-colors leading-snug">
        {title}
      </h3>
      <p className="text-sm text-slate-600 flex-1">{excerpt}</p>
      <div className="flex items-center justify-between mt-auto">
        <time className="text-xs text-slate-400">{publishedDate}</time>
        <span className="text-sm text-accent group-hover:text-accent-hover font-medium">
          Read More &rarr;
        </span>
      </div>
    </Link>
  );
}
