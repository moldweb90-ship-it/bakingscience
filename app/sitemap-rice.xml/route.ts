import { SITE_URL } from '@/lib/env';
import { ingredients } from '@/lib/converter';
import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

const INGREDIENT_ID = 'rice';

function getPriority(weight: number): number {
  if ([100, 150, 158, 180, 200, 250, 500].includes(weight)) return 0.8;
  if (weight % 50 === 0) return 0.7;
  return 0.6;
}

export async function GET() {
  const ing = ingredients[INGREDIENT_ID];
  const today = new Date().toISOString().split('T')[0];

  const lines: string[] = [];
  lines.push('<?xml version="1.0" encoding="UTF-8"?>');
  lines.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');

  for (const weight of ing.common_weights_g) {
    lines.push('  <url>');
    lines.push(`    <loc>${SITE_URL}/${INGREDIENT_ID}/${weight}-grams-to-cups/</loc>`);
    lines.push(`    <lastmod>${today}</lastmod>`);
    lines.push('    <changefreq>monthly</changefreq>');
    lines.push(`    <priority>${getPriority(weight)}</priority>`);
    lines.push('  </url>');
  }

  lines.push('</urlset>');

  return new NextResponse(lines.join('\n'), {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=604800, stale-while-revalidate=86400',
    },
  });
}
