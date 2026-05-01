# Keyword Opportunities: May 1, 2026 Export

Source file: `Keyword Stats 2026-05-01 at 23_15_17.csv`

## Main Findings

- The export contains 2,777 keyword rows.
- The biggest broad buckets are `grams to cups`, `cups to grams`, and `grams to cups converter`.
- The best near-term SEO opportunity is not broad head terms. It is low- and mid-frequency exact conversions grouped by `ingredient + direction + amount`.
- The site already had many `grams-to-cups` pages, but `cups-to-grams` was enabled only for two flour ingredients.
- Google Search Console confirmed the gap: for `1 cup granulated sugar in grams`, Google was showing `/granulated-sugar/100-grams-to-cups/` because the proper reverse page did not exist.
- The export also contains large generic conversion clusters without an ingredient, such as `200 grams to cups`, `50 g to cup`, and `1 cup in grams`. These should not be forced onto the homepage only.

## Implemented From This Export

- Enabled `cups-to-grams` pages for all 20 ingredients.
- Added `/sitemap-cups-to-grams.xml`.
- Added generic comparison pages for high-volume amount-first searches:
  - `/grams-to-cups/200-grams-to-cups/`
  - `/cups-to-grams/1-cup-to-grams/`
- Added `/sitemap-generic-conversions.xml`.
- Added `seo:gsc:query` to map real Google queries to the URLs Google currently shows.
- Added `seo:keywords:analyze` to cluster future Keyword Planner or Wordstat exports.

## Strategy

Use one page per real conversion intent, not one page per keyword variant.

Example cluster:

- `1 cup granulated sugar in grams`
- `1 cup in grams sugar`
- `sugar 1 cup in grams`
- `cup of granulated sugar in grams`

Target URL:

- `/granulated-sugar/cups-to-grams/1-cup-to-grams/`

This keeps the index clean while still capturing long-tail demand.

## Next Priority Clusters

1. Strengthen `/cups-to-grams/` for the broad reverse converter intent.
2. Strengthen `/` for the broad `grams to cups` and `grams to cups converter` intent.
3. Improve ingredient hubs for flour, sugar, and butter because they appear repeatedly in mid-frequency clusters.
4. Use GSC query mapping weekly to detect cannibalization and adjust titles/internal links.

## How to Use New Exports

Run:

```bash
npm run seo:keywords:analyze -- "Keyword Stats 2026-05-01 at 23_15_17.csv" 60
```

Then use the suggested target URL as the canonical page for each cluster. If a cluster maps to `/`, it is a broad head term and should be handled by the main converter/hub rather than creating hundreds of thin pages.
