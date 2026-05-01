import { createSign } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { resolve } from 'node:path';

const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const GSC_BASE_URL = 'https://www.googleapis.com/webmasters/v3';
const INSPECTION_URL = 'https://searchconsole.googleapis.com/v1/urlInspection/index:inspect';
const SCOPES = ['https://www.googleapis.com/auth/webmasters.readonly'];
const OAUTH_REDIRECT_PORT = 8765;
const OAUTH_REDIRECT_URI = `http://127.0.0.1:${OAUTH_REDIRECT_PORT}/oauth2callback`;

function loadDotEnv() {
  for (const file of ['.env.local', '.env']) {
    const path = resolve(process.cwd(), file);
    if (!existsSync(path)) continue;

    for (const line of readFileSync(path, 'utf8').split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#') || !trimmed.includes('=')) continue;
      const [key, ...valueParts] = trimmed.split('=');
      if (!process.env[key]) process.env[key] = valueParts.join('=').trim();
    }
  }
}

function base64Url(input) {
  const buffer = Buffer.isBuffer(input) ? input : Buffer.from(input);
  return buffer
    .toString('base64')
    .replaceAll('+', '-')
    .replaceAll('/', '_')
    .replaceAll('=', '');
}

function readServiceAccount() {
  const inlineJson = process.env.GSC_SERVICE_ACCOUNT_JSON;
  const keyPath = process.env.GSC_SERVICE_ACCOUNT_KEY_PATH;

  if (inlineJson) return JSON.parse(inlineJson);
  if (keyPath) return JSON.parse(readFileSync(resolve(process.cwd(), keyPath), 'utf8'));

  throw new Error(
    'Missing GSC credentials. Set GSC_SERVICE_ACCOUNT_KEY_PATH or GSC_SERVICE_ACCOUNT_JSON.',
  );
}

function readOAuthClient() {
  const inlineJson = process.env.GSC_OAUTH_CLIENT_JSON;
  const clientPath = process.env.GSC_OAUTH_CLIENT_PATH;

  if (inlineJson) return JSON.parse(inlineJson);
  if (clientPath) return JSON.parse(readFileSync(resolve(process.cwd(), clientPath), 'utf8'));

  throw new Error(
    'Missing OAuth client. Set GSC_OAUTH_CLIENT_PATH or GSC_OAUTH_CLIENT_JSON.',
  );
}

function getOAuthClientConfig() {
  const raw = readOAuthClient();
  const config = raw.installed || raw.web || raw;
  if (!config.client_id || !config.client_secret) {
    throw new Error('OAuth client JSON must include client_id and client_secret.');
  }
  return config;
}

function getOAuthTokenPath() {
  return resolve(process.cwd(), process.env.GSC_OAUTH_TOKEN_PATH || './secrets/gsc-oauth-token.json');
}

function readOAuthToken() {
  const tokenPath = getOAuthTokenPath();
  if (!existsSync(tokenPath)) return null;
  return JSON.parse(readFileSync(tokenPath, 'utf8'));
}

function writeOAuthToken(token) {
  writeFileSync(getOAuthTokenPath(), JSON.stringify(token, null, 2));
}

async function getAccessToken() {
  if (process.env.GSC_AUTH_MODE === 'oauth' || process.env.GSC_OAUTH_CLIENT_PATH || process.env.GSC_OAUTH_CLIENT_JSON) {
    return getOAuthAccessToken();
  }

  const account = readServiceAccount();
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const claim = {
    iss: account.client_email,
    scope: SCOPES.join(' '),
    aud: TOKEN_URL,
    iat: now,
    exp: now + 3600,
  };

  const unsignedJwt = `${base64Url(JSON.stringify(header))}.${base64Url(JSON.stringify(claim))}`;
  const signer = createSign('RSA-SHA256');
  signer.update(unsignedJwt);
  const signature = signer.sign(account.private_key);
  const assertion = `${unsignedJwt}.${base64Url(signature)}`;

  const response = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(`Google token request failed: ${JSON.stringify(data)}`);
  }

  return data.access_token;
}

async function getOAuthAccessToken() {
  const client = getOAuthClientConfig();
  const token = readOAuthToken();

  if (!token) {
    throw new Error('Missing OAuth token. Run: npm run seo:gsc:auth');
  }

  const now = Date.now();
  if (token.access_token && token.expiry_date && token.expiry_date > now + 60000) {
    return token.access_token;
  }

  if (!token.refresh_token) {
    throw new Error('OAuth token has no refresh_token. Run auth again and approve offline access.');
  }

  const response = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: client.client_id,
      client_secret: client.client_secret,
      refresh_token: token.refresh_token,
      grant_type: 'refresh_token',
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(`OAuth refresh failed: ${JSON.stringify(data)}`);
  }

  const nextToken = {
    ...token,
    ...data,
    expiry_date: Date.now() + (data.expires_in || 3600) * 1000,
  };
  writeOAuthToken(nextToken);
  return nextToken.access_token;
}

async function runOAuthAuth() {
  const client = getOAuthClientConfig();
  const state = base64Url(String(Date.now()));
  const authUrl = `${AUTH_URL}?${new URLSearchParams({
    client_id: client.client_id,
    redirect_uri: OAUTH_REDIRECT_URI,
    response_type: 'code',
    scope: SCOPES.join(' '),
    access_type: 'offline',
    prompt: 'consent',
    state,
  })}`;

  console.log('Open this URL in your browser and approve access:');
  console.log(authUrl);

  const code = await waitForOAuthCode(state);

  const response = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: client.client_id,
      client_secret: client.client_secret,
      code,
      redirect_uri: OAUTH_REDIRECT_URI,
      grant_type: 'authorization_code',
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(`OAuth token exchange failed: ${JSON.stringify(data)}`);
  }

  writeOAuthToken({
    ...data,
    expiry_date: Date.now() + (data.expires_in || 3600) * 1000,
  });

  console.log(`OAuth token saved to ${getOAuthTokenPath()}`);
}

function waitForOAuthCode(expectedState) {
  return new Promise((resolveCode, rejectCode) => {
    const server = createServer((request, response) => {
      try {
        const url = new URL(request.url || '/', OAUTH_REDIRECT_URI);
        if (url.pathname !== '/oauth2callback') {
          response.writeHead(404);
          response.end('Not found');
          return;
        }

        const error = url.searchParams.get('error');
        if (error) throw new Error(error);

        const state = url.searchParams.get('state');
        if (state !== expectedState) throw new Error('OAuth state mismatch.');

        const code = url.searchParams.get('code');
        if (!code) throw new Error('OAuth code was not returned.');

        response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        response.end('Google Search Console access connected. You can close this tab.');
        server.close();
        resolveCode(code);
      } catch (error) {
        response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        response.end(error.message);
        server.close();
        rejectCode(error);
      }
    });

    server.on('error', rejectCode);
    server.listen(OAUTH_REDIRECT_PORT, '127.0.0.1');
  });
}

function getSiteUrl() {
  return process.env.GSC_SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://bakingconverter.com';
}

function encodeSiteUrl(siteUrl) {
  return encodeURIComponent(siteUrl);
}

function formatDate(date) {
  return date.toISOString().slice(0, 10);
}

function getDateRange(daysBack = 28, delayDays = 3) {
  const end = new Date();
  end.setUTCDate(end.getUTCDate() - delayDays);

  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - daysBack + 1);

  return { startDate: formatDate(start), endDate: formatDate(end) };
}

async function googleFetch(pathOrUrl, options = {}) {
  const token = await getAccessToken();
  const url = pathOrUrl.startsWith('https://') ? pathOrUrl : `${GSC_BASE_URL}${pathOrUrl}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : {};

  if (!response.ok) {
    throw new Error(`Google API request failed (${response.status}): ${JSON.stringify(data)}`);
  }

  return data;
}

async function listSites() {
  const data = await googleFetch('/sites');
  const sites = data.siteEntry || [];

  if (sites.length === 0) {
    console.log('No Search Console properties are visible to these credentials.');
    return;
  }

  console.log('Search Console properties:');
  for (const site of sites) {
    console.log(`- ${site.siteUrl} (${site.permissionLevel})`);
  }
}

async function querySearchAnalytics({ dimensions, rowLimit = 20, days = 28, pageFilter, queryFilter }) {
  const siteUrl = getSiteUrl();
  const { startDate, endDate } = getDateRange(days);
  const body = {
    startDate,
    endDate,
    dimensions,
    rowLimit,
    dataState: 'all',
    searchType: 'web',
  };

  const filters = [];
  if (pageFilter) {
    filters.push({
      dimension: 'page',
      operator: 'equals',
      expression: pageFilter,
    });
  }
  if (queryFilter) {
    filters.push({
      dimension: 'query',
      operator: 'equals',
      expression: queryFilter,
    });
  }

  if (filters.length > 0) {
    body.dimensionFilterGroups = [
      {
        filters,
      },
    ];
  }

  return googleFetch(`/sites/${encodeSiteUrl(siteUrl)}/searchAnalytics/query`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

function printRows(title, rows = []) {
  console.log(`\n${title}`);
  if (rows.length === 0) {
    console.log('No rows returned.');
    return;
  }

  for (const row of rows) {
    const key = row.keys?.join(' | ') || '(total)';
    const ctr = `${((row.ctr || 0) * 100).toFixed(2)}%`;
    const position = Number(row.position || 0).toFixed(1);
    console.log(
      `- ${key} | clicks ${row.clicks || 0} | impressions ${row.impressions || 0} | CTR ${ctr} | pos ${position}`,
    );
  }
}

async function summary() {
  const siteUrl = getSiteUrl();
  const { startDate, endDate } = getDateRange(28);
  console.log(`GSC summary for ${siteUrl}`);
  console.log(`Date range: ${startDate} to ${endDate}`);

  const totals = await querySearchAnalytics({ dimensions: [], rowLimit: 1 });
  printRows('Totals', totals.rows || []);

  const queries = await querySearchAnalytics({ dimensions: ['query'], rowLimit: 20 });
  printRows('Top queries', queries.rows || []);

  const pages = await querySearchAnalytics({ dimensions: ['page'], rowLimit: 20 });
  printRows('Top pages', pages.rows || []);
}

async function sitemaps() {
  const siteUrl = getSiteUrl();
  const data = await googleFetch(`/sites/${encodeSiteUrl(siteUrl)}/sitemaps`);
  const items = data.sitemap || [];

  console.log(`Sitemaps for ${siteUrl}`);
  if (items.length === 0) {
    console.log('No submitted sitemaps returned.');
    return;
  }

  for (const item of items) {
    console.log(`- ${item.path}`);
    console.log(`  last submitted: ${item.lastSubmitted || 'n/a'}`);
    console.log(`  last downloaded: ${item.lastDownloaded || 'n/a'}`);
    console.log(`  warnings: ${item.warnings || 0}, errors: ${item.errors || 0}`);
    if (item.contents) {
      for (const content of item.contents) {
        console.log(
          `  ${content.type}: submitted ${content.submitted || 0}, indexed ${content.indexed || 0}`,
        );
      }
    }
  }
}

async function queryReport(query) {
  if (!query) {
    throw new Error('Pass a query: npm run seo:gsc:query -- "100g sugar to cups"');
  }

  const siteUrl = getSiteUrl();
  const { startDate, endDate } = getDateRange(28);
  console.log(`GSC query report for ${siteUrl}`);
  console.log(`Query: ${query}`);
  console.log(`Date range: ${startDate} to ${endDate}`);

  const pages = await querySearchAnalytics({
    dimensions: ['page'],
    rowLimit: 20,
    queryFilter: query,
  });
  printRows('Pages shown for this query', pages.rows || []);

  const byQueryPage = await querySearchAnalytics({
    dimensions: ['query', 'page'],
    rowLimit: 20,
    queryFilter: query,
  });
  printRows('Query + page rows', byQueryPage.rows || []);
}

async function inspectUrl(url) {
  const siteUrl = getSiteUrl();
  const inspectionUrl = url || process.env.GSC_INSPECT_URL;

  if (!inspectionUrl) {
    throw new Error('Pass a URL: npm run seo:gsc:inspect -- https://bakingconverter.com/path/');
  }

  const data = await googleFetch(INSPECTION_URL, {
    method: 'POST',
    body: JSON.stringify({
      inspectionUrl,
      siteUrl,
      languageCode: 'en-US',
    }),
  });

  const result = data.inspectionResult || {};
  const index = result.indexStatusResult || {};

  console.log(`Inspection for ${inspectionUrl}`);
  console.log(`- verdict: ${index.verdict || 'n/a'}`);
  console.log(`- coverage: ${index.coverageState || 'n/a'}`);
  console.log(`- indexing state: ${index.indexingState || 'n/a'}`);
  console.log(`- robots: ${index.robotsTxtState || 'n/a'}`);
  console.log(`- Google canonical: ${index.googleCanonical || 'n/a'}`);
  console.log(`- user canonical: ${index.userCanonical || 'n/a'}`);
  console.log(`- last crawl: ${index.lastCrawlTime || 'n/a'}`);
  console.log(`- page fetch: ${index.pageFetchState || 'n/a'}`);
}

function printHelp() {
  console.log(`Usage:
  npm run seo:gsc:sites
  npm run seo:gsc:summary
  npm run seo:gsc:sitemaps
  npm run seo:gsc:query -- "100g sugar to cups"
  npm run seo:gsc:inspect -- https://bakingconverter.com/granulated-sugar/100-grams-to-cups/
  npm run seo:gsc:auth

Required env:
  GSC_SITE_URL=https://bakingconverter.com/
  GSC_SERVICE_ACCOUNT_KEY_PATH=./secrets/gsc-service-account.json

OAuth alternative:
  GSC_AUTH_MODE=oauth
  GSC_OAUTH_CLIENT_PATH=./secrets/gsc-oauth-client.json

Alternative:
  GSC_SERVICE_ACCOUNT_JSON={"type":"service_account",...}
`);
}

async function main() {
  loadDotEnv();

  const command = process.argv[2] || 'summary';
  if (command === 'auth') return runOAuthAuth();
  if (command === 'sites') return listSites();
  if (command === 'summary') return summary();
  if (command === 'sitemaps') return sitemaps();
  if (command === 'query') return queryReport(process.argv.slice(3).join(' '));
  if (command === 'inspect') return inspectUrl(process.argv[3]);
  if (command === 'help' || command === '--help' || command === '-h') return printHelp();

  throw new Error(`Unknown command: ${command}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
