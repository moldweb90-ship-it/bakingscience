#!/usr/bin/env node
import fs from 'node:fs';

function loadLocalEnv() {
  if (!fs.existsSync('.env.local')) return;
  const lines = fs.readFileSync('.env.local', 'utf8').split(/\r?\n/);
  for (const line of lines) {
    if (!line || line.trim().startsWith('#') || !line.includes('=')) continue;
    const [key, ...rest] = line.split('=');
    if (!process.env[key]) process.env[key] = rest.join('=').trim();
  }
}

loadLocalEnv();

const query = process.argv[2] || 'baking ingredients';
const perPage = Number(process.argv[3] || 5);

const apiKey = process.env.PEXELS_API_KEY;
if (!apiKey) {
  console.error('PEXELS_API_KEY is not configured.');
  process.exit(1);
}

const params = new URLSearchParams({
  query,
  per_page: String(Math.min(Math.max(perPage, 1), 20)),
  orientation: 'landscape',
  locale: 'en-US',
});

const response = await fetch(`https://api.pexels.com/v1/search?${params.toString()}`, {
  headers: { Authorization: apiKey },
});

if (!response.ok) {
  console.error(`Pexels API failed (${response.status}): ${await response.text()}`);
  process.exit(1);
}

const data = await response.json();

console.log(`Pexels results for "${query}"`);
console.log(`Total results: ${data.total_results}`);
console.log(`Rate remaining: ${response.headers.get('x-ratelimit-remaining') || 'unknown'}`);

for (const photo of data.photos || []) {
  console.log('');
  console.log(`- ${photo.alt || 'Untitled photo'}`);
  console.log(`  id: ${photo.id}`);
  console.log(`  photographer: ${photo.photographer}`);
  console.log(`  page: ${photo.url}`);
  console.log(`  image: ${photo.src?.large || photo.src?.original}`);
}
