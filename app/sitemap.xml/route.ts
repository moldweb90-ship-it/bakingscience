import { NextResponse } from "next/server";
import { blogPosts } from "@/data/blog-posts";
import { SITE_URL } from "@/lib/env";
import { ingredients } from "@/lib/converter";
import { COMMON_CUP_VALUES, REVERSE_ENABLED_INGREDIENTS } from "@/lib/cups-to-grams";
import { GENERIC_CUP_VALUES, GENERIC_GRAM_WEIGHTS } from "@/lib/generic-conversions";
import {
  CUP_UNIT_VALUES,
  ML_VALUES,
  OUNCE_VALUES,
  TABLESPOON_VALUES,
  TEASPOON_VALUES,
  buildCupUnitSlug,
  buildSimpleUnitSlug,
} from "@/lib/unit-conversions";
import { buildCupConversionSlug, buildCupToGramsUrl } from "@/lib/slug-utils";

export const dynamic = "force-static";

type SitemapUrl = {
  loc: string;
  changefreq: "daily" | "weekly" | "monthly" | "yearly";
  priority: number;
};

function addUrl(urls: Map<string, SitemapUrl>, url: SitemapUrl) {
  urls.set(url.loc, url);
}

export async function GET() {
  const today = new Date().toISOString().split("T")[0];
  const urls = new Map<string, SitemapUrl>();

  const staticPages: SitemapUrl[] = [
    { loc: `${SITE_URL}/`, changefreq: "daily", priority: 1 },
    { loc: `${SITE_URL}/cups-to-grams/`, changefreq: "daily", priority: 0.9 },
    { loc: `${SITE_URL}/about/`, changefreq: "monthly", priority: 0.5 },
    { loc: `${SITE_URL}/contact/`, changefreq: "monthly", priority: 0.5 },
    { loc: `${SITE_URL}/privacy/`, changefreq: "yearly", priority: 0.3 },
    { loc: `${SITE_URL}/terms/`, changefreq: "yearly", priority: 0.3 },
    { loc: `${SITE_URL}/disclaimer/`, changefreq: "yearly", priority: 0.3 },
    { loc: `${SITE_URL}/cookies/`, changefreq: "yearly", priority: 0.3 },
    { loc: `${SITE_URL}/blog/`, changefreq: "weekly", priority: 0.6 },
  ];

  for (const page of staticPages) addUrl(urls, page);

  for (const post of blogPosts) {
    addUrl(urls, {
      loc: `${SITE_URL}/blog/${post.slug}/`,
      changefreq: "monthly",
      priority: 0.6,
    });
  }

  for (const ing of Object.values(ingredients)) {
    addUrl(urls, {
      loc: `${SITE_URL}/${ing.id}/`,
      changefreq: "monthly",
      priority: 0.9,
    });

    for (const weight of ing.common_weights_g) {
      addUrl(urls, {
        loc: `${SITE_URL}/${ing.id}/${weight}-grams-to-cups/`,
        changefreq: "monthly",
        priority: 0.75,
      });
    }
  }

  for (const ingredientId of REVERSE_ENABLED_INGREDIENTS) {
    addUrl(urls, {
      loc: `${SITE_URL}/${ingredientId}/cups-to-grams/`,
      changefreq: "monthly",
      priority: 0.9,
    });

    for (const cups of COMMON_CUP_VALUES) {
      addUrl(urls, {
        loc: `${SITE_URL}${buildCupToGramsUrl(ingredientId, cups)}`,
        changefreq: "monthly",
        priority: cups === 1 ? 0.8 : 0.65,
      });
    }
  }

  for (const weight of GENERIC_GRAM_WEIGHTS) {
    addUrl(urls, {
      loc: `${SITE_URL}/grams-to-cups/${weight}-grams-to-cups/`,
      changefreq: "monthly",
      priority: [50, 100, 150, 200, 250, 300, 400, 500].includes(weight) ? 0.8 : 0.6,
    });
  }

  for (const cups of GENERIC_CUP_VALUES) {
    addUrl(urls, {
      loc: `${SITE_URL}/cups-to-grams/${buildCupConversionSlug(cups)}/`,
      changefreq: "monthly",
      priority: cups === 1 ? 0.8 : 0.65,
    });
  }

  for (const cups of CUP_UNIT_VALUES) {
    addUrl(urls, {
      loc: `${SITE_URL}/cups-to-teaspoons/${buildCupUnitSlug(cups, "teaspoons")}/`,
      changefreq: "monthly",
      priority: cups === 1 ? 0.8 : 0.65,
    });
    addUrl(urls, {
      loc: `${SITE_URL}/cups-to-tablespoons/${buildCupUnitSlug(cups, "tablespoons")}/`,
      changefreq: "monthly",
      priority: cups === 1 ? 0.8 : 0.65,
    });
  }

  for (const tsp of TEASPOON_VALUES) {
    addUrl(urls, {
      loc: `${SITE_URL}/teaspoons-to-cups/${buildSimpleUnitSlug(tsp, "teaspoons", "cups")}/`,
      changefreq: "monthly",
      priority: tsp === 2 ? 0.8 : 0.65,
    });
  }

  for (const tbsp of TABLESPOON_VALUES) {
    addUrl(urls, {
      loc: `${SITE_URL}/tablespoons-to-cups/${buildSimpleUnitSlug(tbsp, "tablespoons", "cups")}/`,
      changefreq: "monthly",
      priority: tbsp === 1 ? 0.75 : 0.65,
    });
  }

  for (const ml of ML_VALUES) {
    addUrl(urls, {
      loc: `${SITE_URL}/ml-to-grams/${buildSimpleUnitSlug(ml, "ml", "grams")}/`,
      changefreq: "monthly",
      priority: [100, 240, 500].includes(ml) ? 0.75 : 0.65,
    });
    addUrl(urls, {
      loc: `${SITE_URL}/grams-to-ml/${buildSimpleUnitSlug(ml, "grams", "ml")}/`,
      changefreq: "monthly",
      priority: [100, 240, 500].includes(ml) ? 0.75 : 0.65,
    });
    addUrl(urls, {
      loc: `${SITE_URL}/grams-to-ounces/${buildSimpleUnitSlug(ml, "grams", "ounces")}/`,
      changefreq: "monthly",
      priority: 0.6,
    });
  }

  for (const oz of OUNCE_VALUES) {
    addUrl(urls, {
      loc: `${SITE_URL}/ounces-to-grams/${buildSimpleUnitSlug(oz, "ounces", "grams")}/`,
      changefreq: "monthly",
      priority: oz === 4 || oz === 8 ? 0.7 : 0.6,
    });
  }

  const lines: string[] = [];
  lines.push('<?xml version="1.0" encoding="UTF-8"?>');
  lines.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');

  for (const url of urls.values()) {
    lines.push("  <url>");
    lines.push(`    <loc>${url.loc}</loc>`);
    lines.push(`    <lastmod>${today}</lastmod>`);
    lines.push(`    <changefreq>${url.changefreq}</changefreq>`);
    lines.push(`    <priority>${url.priority}</priority>`);
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
