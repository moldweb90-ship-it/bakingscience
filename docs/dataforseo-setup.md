# DataForSEO SEO Workflow

This project uses DataForSEO as the keyword and SERP data source for SEO page planning.

## Local Environment

Add credentials to `.env.local` only:

```env
DATAFORSEO_LOGIN=your-dataforseo-login
DATAFORSEO_PASSWORD=your-dataforseo-password
DATAFORSEO_LOCATION_CODE=2840
DATAFORSEO_LANGUAGE_NAME=English
```

Do not commit real API credentials.

## Commands

```bash
npm run seo:dfs:user
npm run seo:dfs:ideas -- "grams to cups" --limit 50
npm run seo:dfs:suggestions -- "100g sugar to cups" --limit 50
npm run seo:dfs:site -- bakingconverter.com --limit 50
npm run seo:dfs:overview -- "100g sugar to cups,grams to cups"
npm run seo:dfs:serp -- "100g sugar to cups"
```

## Cost Notes

The local `Prices.xlsx` export shows these relevant baseline costs:

- `dataforseo_labs/keyword_ideas/live`: `$0.01` per request + `$0.0001` per result.
- `dataforseo_labs/keyword_suggestions/live`: `$0.01` per request + `$0.0001` per result.
- `dataforseo_labs/keywords_for_site/live`: `$0.01` per request + `$0.0001` per result.
- `dataforseo_labs/keyword_overview/live`: `$0.01` per request + `$0.0001` per result.
- `serp/live/advanced`: `$0.002` per request.

Keep small limits while exploring. Increase limits only after the keyword direction is clear.

## Suggested SEO Loop

1. Pull real queries from Google Search Console.
2. Expand them with DataForSEO keyword suggestions and ideas.
3. Pull SERPs for promising terms.
4. Group terms by intent and page type.
5. Create or update landing pages, titles, descriptions, FAQ, schema, and internal links.
6. Deploy, resubmit sitemap, and monitor GSC.
