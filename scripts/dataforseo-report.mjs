#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const API_BASE = 'https://api.dataforseo.com';

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const text = fs.readFileSync(filePath, 'utf8');
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#') || !trimmed.includes('=')) continue;
    const index = trimmed.indexOf('=');
    const key = trimmed.slice(0, index).trim();
    let value = trimmed.slice(index + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

function loadEnv() {
  loadEnvFile(path.resolve(process.cwd(), '.env.local'));
  loadEnvFile(path.resolve(process.cwd(), '.env'));
}

function authHeader() {
  const login = process.env.DATAFORSEO_LOGIN;
  const password = process.env.DATAFORSEO_PASSWORD;
  if (!login || !password) {
    throw new Error('Missing DATAFORSEO_LOGIN or DATAFORSEO_PASSWORD in .env.local');
  }
  return `Basic ${Buffer.from(`${login}:${password}`).toString('base64')}`;
}

async function dataForSeo(pathname, { method = 'GET', body } = {}) {
  const response = await fetch(`${API_BASE}${pathname}`, {
    method,
    headers: {
      Authorization: authHeader(),
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await response.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(`Non-JSON response (${response.status}): ${text.slice(0, 500)}`);
  }
  if (!response.ok || json.status_code >= 40000) {
    throw new Error(`DataForSEO error ${response.status}/${json.status_code}: ${json.status_message || text}`);
  }
  return json;
}

function locationCode() {
  return Number(process.env.DATAFORSEO_LOCATION_CODE || 2840);
}

function languageName() {
  return process.env.DATAFORSEO_LANGUAGE_NAME || 'English';
}

function parseLimit(args, fallback = 50) {
  const index = args.indexOf('--limit');
  if (index === -1) return fallback;
  const value = Number(args[index + 1]);
  return Number.isFinite(value) && value > 0 ? Math.min(value, 1000) : fallback;
}

function seedFromArgs(args) {
  const cleaned = args.filter((arg, index) => {
    if (arg === '--limit') return false;
    if (args[index - 1] === '--limit') return false;
    return true;
  });
  return cleaned.join(' ').trim();
}

function taskResult(json) {
  const task = json.tasks?.[0];
  if (!task) throw new Error('No tasks returned by DataForSEO');
  if (task.status_code >= 40000) {
    throw new Error(`Task error ${task.status_code}: ${task.status_message}`);
  }
  return task.result?.[0] || {};
}

function itemRows(items = []) {
  return items.map((item) => ({
    keyword: item.keyword,
    volume: item.keyword_info?.search_volume ?? '',
    cpc: item.keyword_info?.cpc ?? '',
    competition: item.keyword_info?.competition_level ?? '',
    intent: item.search_intent_info?.main_intent ?? '',
    serp: Array.isArray(item.serp_item_types) ? item.serp_item_types.join(',') : '',
  }));
}

function overviewRows(items = []) {
  return items.map((item) => ({
    keyword: item.keyword,
    volume: item.keyword_info?.search_volume ?? '',
    cpc: item.keyword_info?.cpc ?? '',
    competition: item.keyword_info?.competition_level ?? '',
    intent: item.search_intent_info?.main_intent ?? '',
    backlinks: item.avg_backlinks_info?.referring_domains ?? '',
    serp: Array.isArray(item.serp_info?.serp_item_types) ? item.serp_info.serp_item_types.join(',') : '',
  }));
}

function printRows(rows, limit = 50) {
  const visible = rows.slice(0, limit);
  if (!visible.length) {
    console.log('No rows.');
    return;
  }
  console.table(visible);
}

async function userData() {
  const json = await dataForSeo('/v3/appendix/user_data');
  const result = json.tasks?.[0]?.result?.[0];
  console.log('DataForSEO account');
  console.log(`- balance: ${result?.money?.balance ?? 'unknown'}`);
  console.log(`- total deposited: ${result?.money?.total ?? 'unknown'}`);
}

async function keywordIdeas(seed, limit) {
  if (!seed) throw new Error('Usage: npm run seo:dfs:ideas -- "grams to cups"');
  const json = await dataForSeo('/v3/dataforseo_labs/google/keyword_ideas/live', {
    method: 'POST',
    body: [{
      keywords: seed.split(',').map((value) => value.trim()).filter(Boolean),
      location_code: locationCode(),
      language_name: languageName(),
      include_serp_info: true,
      include_clickstream_data: false,
      limit,
      filters: [['keyword_info.search_volume', '>', 0]],
    }],
  });
  const result = taskResult(json);
  console.log(`Keyword ideas for "${seed}" (${languageName()}, location ${locationCode()})`);
  console.log(`Total available: ${result.total_count ?? 'unknown'} | Cost: ${json.cost}`);
  printRows(itemRows(result.items), limit);
}

async function keywordSuggestions(seed, limit) {
  if (!seed) throw new Error('Usage: npm run seo:dfs:suggestions -- "100g sugar to cups"');
  const json = await dataForSeo('/v3/dataforseo_labs/google/keyword_suggestions/live', {
    method: 'POST',
    body: [{
      keyword: seed,
      location_code: locationCode(),
      language_name: languageName(),
      include_serp_info: true,
      include_seed_keyword: true,
      limit,
      filters: [['keyword_info.search_volume', '>', 0]],
    }],
  });
  const result = taskResult(json);
  console.log(`Keyword suggestions for "${seed}" (${languageName()}, location ${locationCode()})`);
  console.log(`Total available: ${result.total_count ?? 'unknown'} | Cost: ${json.cost}`);
  printRows(itemRows(result.items), limit);
}

async function keywordsForSite(target, limit) {
  if (!target) throw new Error('Usage: npm run seo:dfs:site -- bakingconverter.com --limit 50');
  const json = await dataForSeo('/v3/dataforseo_labs/google/keywords_for_site/live', {
    method: 'POST',
    body: [{
      target: target.replace(/^https?:\/\//, '').replace(/\/.*$/, ''),
      location_code: locationCode(),
      language_name: languageName(),
      include_serp_info: true,
      include_clickstream_data: false,
      limit,
      filters: [['keyword_info.search_volume', '>', 0]],
    }],
  });
  const result = taskResult(json);
  console.log(`Keywords for site "${target}" (${languageName()}, location ${locationCode()})`);
  console.log(`Total available: ${result.total_count ?? 'unknown'} | Cost: ${json.cost}`);
  printRows(itemRows(result.items), limit);
}

async function keywordOverview(seed, limit) {
  if (!seed) throw new Error('Usage: npm run seo:dfs:overview -- "100g sugar to cups,grams to cups"');
  const keywords = seed.split(',').map((value) => value.trim()).filter(Boolean).slice(0, 700);
  const json = await dataForSeo('/v3/dataforseo_labs/google/keyword_overview/live', {
    method: 'POST',
    body: [{
      keywords,
      location_code: locationCode(),
      language_name: languageName(),
      include_serp_info: true,
      include_clickstream_data: false,
    }],
  });
  const result = taskResult(json);
  console.log(`Keyword overview (${languageName()}, location ${locationCode()})`);
  console.log(`Requested: ${keywords.length} | Returned: ${result.items_count ?? result.items?.length ?? 0} | Cost: ${json.cost}`);
  printRows(overviewRows(result.items), limit);
}

async function serp(seed) {
  if (!seed) throw new Error('Usage: npm run seo:dfs:serp -- "100g sugar to cups"');
  const json = await dataForSeo('/v3/serp/google/organic/live/advanced', {
    method: 'POST',
    body: [{
      keyword: seed,
      location_code: locationCode(),
      language_name: languageName(),
      depth: 20,
      device: 'desktop',
      os: 'windows',
    }],
  });
  const result = taskResult(json);
  console.log(`Google SERP for "${seed}" (${languageName()}, location ${locationCode()})`);
  console.log(`Cost: ${json.cost}`);
  const rows = (result.items || [])
    .filter((item) => item.type === 'organic')
    .slice(0, 20)
    .map((item) => ({
      rank: item.rank_group,
      title: item.title,
      url: item.url,
      domain: item.domain,
    }));
  printRows(rows, 20);
}

function help() {
  console.log(`DataForSEO SEO CLI

Commands:
  npm run seo:dfs:user
  npm run seo:dfs:ideas -- "grams to cups" --limit 50
  npm run seo:dfs:suggestions -- "100g sugar to cups" --limit 50
  npm run seo:dfs:site -- bakingconverter.com --limit 50
  npm run seo:dfs:overview -- "100g sugar to cups,grams to cups"
  npm run seo:dfs:serp -- "100g sugar to cups"

Environment:
  DATAFORSEO_LOGIN
  DATAFORSEO_PASSWORD
  DATAFORSEO_LOCATION_CODE=2840
  DATAFORSEO_LANGUAGE_NAME=English
`);
}

async function main() {
  loadEnv();
  const [command = 'help', ...args] = process.argv.slice(2);
  const limit = parseLimit(args);
  const seed = seedFromArgs(args);

  if (command === 'user') return userData();
  if (command === 'ideas') return keywordIdeas(seed, limit);
  if (command === 'suggestions') return keywordSuggestions(seed, limit);
  if (command === 'site') return keywordsForSite(seed, limit);
  if (command === 'overview') return keywordOverview(seed, limit);
  if (command === 'serp') return serp(seed);
  return help();
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
