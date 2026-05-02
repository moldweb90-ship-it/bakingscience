import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/env";
import {
  CUP_UNIT_VALUES,
  ML_VALUES,
  OUNCE_VALUES,
  TABLESPOON_VALUES,
  TEASPOON_VALUES,
  buildCupUnitSlug,
  buildSimpleUnitSlug,
} from "@/lib/unit-conversions";

export const dynamic = "force-static";

function addUrl(lines: string[], loc: string, lastmod: string, priority = 0.65) {
  lines.push("  <url>");
  lines.push(`    <loc>${loc}</loc>`);
  lines.push(`    <lastmod>${lastmod}</lastmod>`);
  lines.push("    <changefreq>monthly</changefreq>");
  lines.push(`    <priority>${priority}</priority>`);
  lines.push("  </url>");
}

export async function GET() {
  const today = new Date().toISOString().split("T")[0];
  const lines: string[] = [];
  lines.push('<?xml version="1.0" encoding="UTF-8"?>');
  lines.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');

  for (const cups of CUP_UNIT_VALUES) {
    const priority = cups === 0.25 || cups === 0.5 || cups === 1 ? 0.8 : 0.65;
    addUrl(lines, `${SITE_URL}/cups-to-teaspoons/${buildCupUnitSlug(cups, "teaspoons")}/`, today, priority);
    addUrl(lines, `${SITE_URL}/cups-to-tablespoons/${buildCupUnitSlug(cups, "tablespoons")}/`, today, priority);
  }

  for (const tsp of TEASPOON_VALUES) {
    addUrl(lines, `${SITE_URL}/teaspoons-to-cups/${buildSimpleUnitSlug(tsp, "teaspoons", "cups")}/`, today, tsp === 2 ? 0.8 : 0.65);
  }

  for (const tbsp of TABLESPOON_VALUES) {
    addUrl(lines, `${SITE_URL}/tablespoons-to-cups/${buildSimpleUnitSlug(tbsp, "tablespoons", "cups")}/`, today, tbsp === 1 ? 0.75 : 0.65);
  }

  for (const ml of ML_VALUES) {
    const priority = ml === 100 || ml === 240 || ml === 500 ? 0.75 : 0.65;
    addUrl(lines, `${SITE_URL}/ml-to-grams/${buildSimpleUnitSlug(ml, "ml", "grams")}/`, today, priority);
    addUrl(lines, `${SITE_URL}/grams-to-ml/${buildSimpleUnitSlug(ml, "grams", "ml")}/`, today, priority);
    addUrl(lines, `${SITE_URL}/grams-to-ounces/${buildSimpleUnitSlug(ml, "grams", "ounces")}/`, today, 0.6);
  }

  for (const oz of OUNCE_VALUES) {
    addUrl(lines, `${SITE_URL}/ounces-to-grams/${buildSimpleUnitSlug(oz, "ounces", "grams")}/`, today, oz === 4 || oz === 8 ? 0.7 : 0.6);
  }

  lines.push("</urlset>");
  return new NextResponse(lines.join("\n"), {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=604800, stale-while-revalidate=86400",
    },
  });
}
