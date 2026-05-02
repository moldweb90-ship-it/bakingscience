import { SITE_URL } from "@/lib/env";
import { KEYWORD_CONVERSION_WEIGHTS } from "@/lib/keyword-conversion-weights";
import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  const today = new Date().toISOString().split("T")[0];
  const lines: string[] = [];

  lines.push('<?xml version="1.0" encoding="UTF-8"?>');
  lines.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');

  for (const [ingredientId, weights] of Object.entries(KEYWORD_CONVERSION_WEIGHTS)) {
    for (const weight of weights) {
      lines.push("  <url>");
      lines.push(`    <loc>${SITE_URL}/${ingredientId}/${weight}-grams-to-cups/</loc>`);
      lines.push(`    <lastmod>${today}</lastmod>`);
      lines.push("    <changefreq>monthly</changefreq>");
      lines.push("    <priority>0.75</priority>");
      lines.push("  </url>");
    }
  }

  lines.push("</urlset>");

  return new NextResponse(lines.join("\n"), {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=604800, stale-while-revalidate=86400",
    },
  });
}
