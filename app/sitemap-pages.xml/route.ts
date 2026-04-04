import { SITE_URL } from '@/lib/env';
import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET() {
const baseUrl = SITE_URL;
  const today = new Date().toISOString().split('T')[0];

  const pages = [
    { loc: `${baseUrl}/`, changefreq: 'daily', priority: 1.0 },
    { loc: `${baseUrl}/about/`, changefreq: 'monthly', priority: 0.5 },
    { loc: `${baseUrl}/contact/`, changefreq: 'monthly', priority: 0.5 },
    { loc: `${baseUrl}/privacy/`, changefreq: 'yearly', priority: 0.3 },
    { loc: `${baseUrl}/terms/`, changefreq: 'yearly', priority: 0.3 },
    { loc: `${baseUrl}/disclaimer/`, changefreq: 'yearly', priority: 0.3 },
    { loc: `${baseUrl}/cookies/`, changefreq: 'yearly', priority: 0.3 },
    { loc: `${baseUrl}/blog/`, changefreq: 'weekly', priority: 0.6 },
  ];

  const lines: string[] = [];
  lines.push('<?xml version="1.0" encoding="UTF-8"?>');
  lines.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
  for (const p of pages) {
    lines.push('  <url>');
    lines.push(`    <loc>${p.loc}</loc>`);
    lines.push(`    <lastmod>${today}</lastmod>`);
    lines.push(`    <changefreq>${p.changefreq}</changefreq>`);
    lines.push(`    <priority>${p.priority}</priority>`);
    lines.push('  </url>');
  }
  lines.push('</urlset>');

  return new NextResponse(lines.join('\n'), {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=604800',
    },
  });
}
