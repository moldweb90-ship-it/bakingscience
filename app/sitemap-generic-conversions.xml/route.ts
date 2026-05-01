import { SITE_URL } from "@/lib/env";
import { NextResponse } from "next/server";
import { GENERIC_CUP_VALUES, GENERIC_GRAM_WEIGHTS } from "@/lib/generic-conversions";
import { buildCupConversionSlug } from "@/lib/slug-utils";

export const dynamic = "force-static";

function priorityForWeight(weight: number): number {
  if ([50, 100, 150, 200, 250, 300, 400, 500].includes(weight)) return 0.8;
  if ([60, 75, 125, 140, 175, 225, 350].includes(weight)) return 0.7;
  return 0.6;
}

function priorityForCups(cups: number): number {
  if (cups === 1) return 0.8;
  if ([0.25, 0.5, 0.75, 1.5, 2].includes(cups)) return 0.7;
  return 0.6;
}

export async function GET() {
  const today = new Date().toISOString().split("T")[0];
  const lines: string[] = [];

  lines.push('<?xml version="1.0" encoding="UTF-8"?>');
  lines.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');

  for (const weight of GENERIC_GRAM_WEIGHTS) {
    lines.push("  <url>");
    lines.push(`    <loc>${SITE_URL}/grams-to-cups/${weight}-grams-to-cups/</loc>`);
    lines.push(`    <lastmod>${today}</lastmod>`);
    lines.push("    <changefreq>monthly</changefreq>");
    lines.push(`    <priority>${priorityForWeight(weight)}</priority>`);
    lines.push("  </url>");
  }

  for (const cups of GENERIC_CUP_VALUES) {
    lines.push("  <url>");
    lines.push(`    <loc>${SITE_URL}/cups-to-grams/${buildCupConversionSlug(cups)}/</loc>`);
    lines.push(`    <lastmod>${today}</lastmod>`);
    lines.push("    <changefreq>monthly</changefreq>");
    lines.push(`    <priority>${priorityForCups(cups)}</priority>`);
    lines.push("  </url>");
  }

  lines.push("</urlset>");

  return new NextResponse(lines.join("\n"), {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=604800, stale-while-revalidate=86400",
    },
  });
}
