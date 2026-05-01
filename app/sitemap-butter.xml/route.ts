import { SITE_URL } from '@/lib/env';
import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

const INGREDIENT_ID = 'butter';
const COMMON_WEIGHTS: number[] = [14, 25, 28, 50, 57, 75, 85, 100, 113, 115, 125, 150, 175, 200, 225, 227, 250, 300, 350, 400, 454, 500, 750, 1000];

function getPriority(weight: number): number {
  if (COMMON_WEIGHTS.includes(weight)) return 0.8;
  if (weight % 50 === 0) return 0.7;
  if (weight % 25 === 0) return 0.6;
  if (weight % 10 === 0) return 0.5;
  return 0.4;
}

export async function GET() {
const baseUrl = SITE_URL;
  const today = new Date().toISOString().split('T')[0];

  const lines: string[] = [];
  lines.push('<?xml version="1.0" encoding="UTF-8"?>');
  lines.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
  for (const weight of COMMON_WEIGHTS) {
    lines.push('  <url>');
    lines.push(`    <loc>${baseUrl}/${INGREDIENT_ID}/${weight}-grams-to-cups/</loc>`);
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
