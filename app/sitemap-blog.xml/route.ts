import { SITE_URL } from '@/lib/env';
import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET() {
const baseUrl = SITE_URL;
  const today = new Date().toISOString().split('T')[0];

  const posts = [
    'why-cup-measurements-fail',
    'high-altitude-baking-guide',
    'butter-solid-vs-melted-measurement',
    'flour-types-weight-comparison',
    'precision-measurement-guide',
  ];

  const lines: string[] = [];
  lines.push('<?xml version="1.0" encoding="UTF-8"?>');
  lines.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
  for (const slug of posts) {
    lines.push('  <url>');
    lines.push(`    <loc>${baseUrl}/blog/${slug}/</loc>`);
    lines.push(`    <lastmod>${today}</lastmod>`);
    lines.push('    <changefreq>monthly</changefreq>');
    lines.push('    <priority>0.6</priority>');
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
