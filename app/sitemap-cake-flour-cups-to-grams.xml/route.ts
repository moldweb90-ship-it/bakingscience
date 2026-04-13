import { SITE_URL } from "@/lib/env";
import { NextResponse } from "next/server";
import { COMMON_CUP_VALUES } from "@/lib/cups-to-grams";
import { buildCupToGramsUrl } from "@/lib/slug-utils";

export const dynamic = "force-static";

const INGREDIENT_ID = "cake-flour";

function getPriority(cups: number): number {
  if (cups === 1) return 0.8;
  if (cups === 0.5 || cups === 0.25 || cups === 0.75 || cups === 1.5 || cups === 2) return 0.7;
  return 0.6;
}

export async function GET() {
  const today = new Date().toISOString().split("T")[0];
  const lines: string[] = [];

  lines.push('<?xml version="1.0" encoding="UTF-8"?>');
  lines.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');

  lines.push("  <url>");
  lines.push(`    <loc>${SITE_URL}/${INGREDIENT_ID}/cups-to-grams/</loc>`);
  lines.push(`    <lastmod>${today}</lastmod>`);
  lines.push("    <changefreq>monthly</changefreq>");
  lines.push("    <priority>0.9</priority>");
  lines.push("  </url>");

  for (const cups of COMMON_CUP_VALUES) {
    lines.push("  <url>");
    lines.push(`    <loc>${SITE_URL}${buildCupToGramsUrl(INGREDIENT_ID, cups)}</loc>`);
    lines.push(`    <lastmod>${today}</lastmod>`);
    lines.push("    <changefreq>monthly</changefreq>");
    lines.push(`    <priority>${getPriority(cups)}</priority>`);
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

