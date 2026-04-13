import { SITE_URL } from '@/lib/env';
import { ingredients } from '@/lib/converter';
import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET() {
const baseUrl = SITE_URL;
  const today = new Date().toISOString().split('T')[0];

  const subSitemaps = [
    { loc: `${baseUrl}/sitemap-pages.xml`, lastmod: today },
    { loc: `${baseUrl}/sitemap-blog.xml`, lastmod: today },
    { loc: `${baseUrl}/sitemap-hubs.xml`, lastmod: today },
    { loc: `${baseUrl}/sitemap-all-purpose-flour-cups-to-grams.xml`, lastmod: today },
    { loc: `${baseUrl}/sitemap-cake-flour-cups-to-grams.xml`, lastmod: today },
  ];

  for (const ing of Object.values(ingredients)) {
    subSitemaps.push({
      loc: `${baseUrl}/sitemap-${ing.id}.xml`,
      lastmod: today,
    });
  }

  const lines: string[] = [];
  lines.push('<?xml version="1.0" encoding="UTF-8"?>');
  lines.push('<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
  for (const s of subSitemaps) {
    lines.push('  <sitemap>');
    lines.push(`    <loc>${s.loc}</loc>`);
    lines.push(`    <lastmod>${s.lastmod}</lastmod>`);
    lines.push('  </sitemap>');
  }
  lines.push('</sitemapindex>');

  return new NextResponse(lines.join('\n'), {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=604800',
    },
  });
}
