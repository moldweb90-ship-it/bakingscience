# Google Search Console API setup

This project can read Google Search Console data with `scripts/gsc-report.mjs`.
The script uses a Google Cloud service account and does not require extra npm packages.

If Search Console does not accept a service account as a user, use the OAuth setup below.

## 1. Google Cloud

1. Create or open a Google Cloud project.
2. Enable **Google Search Console API**.
3. Create a **Service Account**.
4. Create a JSON key for that service account.

## 2. Search Console Access

In Google Search Console, open the `bakingconverter.com` property.

Recommended property value:

```text
https://bakingconverter.com/
```

Add the service account email as a user/owner for the property.
The service account email is the `client_email` value inside the JSON key.

## 3. Local env

Put the JSON key somewhere ignored by git, for example:

```text
secrets/gsc-service-account.json
```

Then add this to `.env.local`:

```text
GSC_SITE_URL=https://bakingconverter.com/
GSC_SERVICE_ACCOUNT_KEY_PATH=./secrets/gsc-service-account.json
```

Do not commit the JSON key.

## 4. Commands

List properties visible to the credentials:

```bash
npm run seo:gsc:sites
```

Show clicks, impressions, CTR and positions:

```bash
npm run seo:gsc:summary
```

Show submitted sitemap status:

```bash
npm run seo:gsc:sitemaps
```

Inspect a URL:

```bash
npm run seo:gsc:inspect -- https://bakingconverter.com/granulated-sugar/100-grams-to-cups/
```

Search performance data is usually delayed. URL inspection and sitemap data are better for checking indexing status.

## OAuth fallback

1. In Google Cloud, open **APIs & Services**.
2. Open **OAuth consent screen** and configure the app as **External** or **Testing**.
3. Add your own Google account as a test user if the app is in testing mode.
4. Open **Credentials**.
5. Create **OAuth client ID**.
6. Application type: **Desktop app**.
7. Download the JSON file and save it as:

```text
secrets/gsc-oauth-client.json
```

Then add this to `.env.local`:

```text
GSC_AUTH_MODE=oauth
GSC_OAUTH_CLIENT_PATH=./secrets/gsc-oauth-client.json
GSC_OAUTH_TOKEN_PATH=./secrets/gsc-oauth-token.json
```

Run:

```bash
npm run seo:gsc:auth
```

Open the printed URL, approve access, and the token will be saved locally.
