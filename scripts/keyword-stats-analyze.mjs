#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const DEFAULT_FILE = 'Keyword Stats 2026-05-01 at 23_15_17.csv';

const COMMON_CUP_VALUES = [
  0.125, 0.25, 0.333, 0.5, 0.667, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 3, 4,
];

const GENERIC_GRAM_WEIGHTS = [
  25, 30, 40, 50, 60, 70, 75, 80, 90, 100, 110, 120, 125, 140, 150, 160, 175, 180, 200, 225,
  240, 250, 280, 300, 350, 400, 450, 500, 600, 750, 1000,
];

const GENERIC_CUP_VALUES = [
  0.125, 0.25, 0.333, 0.5, 0.667, 0.75, 1, 1.25, 1.333, 1.5, 1.75, 2, 2.25, 2.5, 3, 4, 5,
];

const REVERSE_ENABLED_INGREDIENTS = [
  'all-purpose-flour',
  'almond-flour',
  'bread-flour',
  'brown-sugar',
  'butter',
  'cake-flour',
  'cocoa-powder',
  'coconut-flour',
  'coconut-oil',
  'cornstarch',
  'granulated-sugar',
  'heavy-cream',
  'honey',
  'olive-oil',
  'powdered-sugar',
  'rolled-oats',
  'sour-cream',
  'vegetable-oil',
  'whole-milk',
  'whole-wheat-flour',
];

const INGREDIENT_ALIASES = {
  'all-purpose-flour': ['all purpose flour', 'all-purpose flour', 'flour'],
  'granulated-sugar': ['granulated sugar', 'white sugar', 'sugar'],
  'brown-sugar': ['brown sugar', 'light brown sugar'],
  'powdered-sugar': ['powdered sugar', 'icing sugar', 'confectioners sugar', 'confectioner sugar'],
  butter: ['butter', 'unsalted butter', 'salted butter', 'melted butter'],
  'whole-milk': ['whole milk', 'milk'],
  'heavy-cream': ['heavy cream'],
  'sour-cream': ['sour cream'],
  honey: ['honey'],
  'cocoa-powder': ['cocoa powder', 'cocoa'],
  'rolled-oats': ['rolled oats', 'oats'],
  cornstarch: ['cornstarch', 'corn starch'],
  'olive-oil': ['olive oil'],
  'vegetable-oil': ['vegetable oil'],
  'almond-flour': ['almond flour'],
  'coconut-flour': ['coconut flour'],
  'bread-flour': ['bread flour'],
  'cake-flour': ['cake flour'],
  'whole-wheat-flour': ['whole wheat flour'],
};

const CUP_PATTERNS = [
  [/(\d+)\s+and\s+(\d+)\s+(\d+)\s*cups?/, (m) => Number(m[1]) + Number(m[2]) / Number(m[3])],
  [/(\d+)\s+(\d+)\s+(\d+)\s*cups?/, (m) => Number(m[1]) + Number(m[2]) / Number(m[3])],
  [/(\d+)\s+(\d+)\s*\/\s*(\d+)\s*cups?/, (m) => Number(m[1]) + Number(m[2]) / Number(m[3])],
  [/\b([123])\s+([2348])\s*cups?\b/, (m) => Number(m[1]) / Number(m[2])],
  [/(\d+)\s*\/\s*(\d+)\s*cups?/, (m) => Number(m[1]) / Number(m[2])],
  [/(\d+(?:\.\d+)?)\s*cups?/, (m) => Number(m[1])],
  [/\bhalf(?:\s+a)?\s+cup\b/, () => 0.5],
  [/\bquarter\s+cup\b|\bquarter\s+of\s+a\s+cup\b/, () => 0.25],
  [/\bone\s+third\s+cup\b/, () => 1 / 3],
  [/\btwo\s+thirds?\s+cup\b/, () => 2 / 3],
  [/\bone\s+cup\b/, () => 1],
  [/\btwo\s+cups?\b/, () => 2],
  [/\bthree\s+cups?\b/, () => 3],
  [/\bfour\s+cups?\b/, () => 4],
];

function loadIngredientIds() {
  const filePath = path.resolve(process.cwd(), 'lib/ingredients.json');
  const records = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return new Set(records.map((record) => record.id));
}

function formatCupLabel(cups) {
  const whole = Math.floor(cups);
  const remainder = cups - whole;
  const map = [
    { value: 0.125, label: '1/8' },
    { value: 0.25, label: '1/4' },
    { value: 0.333, label: '1/3' },
    { value: 0.5, label: '1/2' },
    { value: 0.667, label: '2/3' },
    { value: 0.75, label: '3/4' },
  ];

  if (remainder < 0.01) return `${whole}`;

  let closest = map[0];
  let minDiff = Infinity;
  for (const item of map) {
    const diff = Math.abs(remainder - item.value);
    if (diff < minDiff) {
      minDiff = diff;
      closest = item;
    }
  }

  if (whole === 0) return closest.label;
  return `${whole} ${closest.label}`;
}

function buildCupConversionSlug(cups) {
  const epsilon = 0.0001;
  const whole = Math.floor(cups);
  const remainder = cups - whole;
  const commonFractions = [
    { value: 0.125, token: '1-8' },
    { value: 0.25, token: '1-4' },
    { value: 0.333, token: '1-3' },
    { value: 0.5, token: '1-2' },
    { value: 0.667, token: '2-3' },
    { value: 0.75, token: '3-4' },
  ];

  if (Math.abs(remainder) < epsilon) {
    return `${whole}-cup-to-grams`;
  }

  let best = commonFractions[0];
  let minDiff = Infinity;
  for (const fraction of commonFractions) {
    const diff = Math.abs(remainder - fraction.value);
    if (diff < minDiff) {
      minDiff = diff;
      best = fraction;
    }
  }

  if (whole === 0) return `${best.token}-cup-to-grams`;
  return `${whole}-${best.token}-cups-to-grams`;
}

function buildCupToGramsUrl(ingredientId, cups) {
  return `/${ingredientId}/cups-to-grams/${buildCupConversionSlug(cups)}/`;
}

function decodeFile(filePath) {
  const bytes = fs.readFileSync(filePath);
  if (bytes[0] === 0xff && bytes[1] === 0xfe) return bytes.toString('utf16le').replace(/^\uFEFF/, '');
  if (bytes[0] === 0xfe && bytes[1] === 0xff) return bytes.swap16().toString('utf16le').replace(/^\uFEFF/, '');
  return bytes.toString('utf8').replace(/^\uFEFF/, '');
}

function parseTsv(text) {
  const lines = text.split(/\r?\n/).filter(Boolean);
  const headerLineIndex = lines.findIndex((line) => line.startsWith('Keyword\t'));
  if (headerLineIndex === -1) throw new Error('Could not find Keyword header in export.');
  const headers = lines[headerLineIndex].split('\t');
  return lines.slice(headerLineIndex + 1).map((line) => {
    const values = line.split('\t');
    const row = {};
    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });
    return row;
  }).filter((row) => row.Keyword);
}

function volume(row) {
  const value = String(row['Avg. monthly searches'] || '').replaceAll('"', '').replace(',', '.').trim();
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function detectIngredient(keyword) {
  let best = null;
  let bestLength = 0;
  for (const [id, aliases] of Object.entries(INGREDIENT_ALIASES)) {
    for (const alias of aliases) {
      if (keyword.includes(alias) && alias.length > bestLength) {
        best = id;
        bestLength = alias.length;
      }
    }
  }
  return best;
}

function detectGrams(keyword) {
  const matches = [
    ...keyword.matchAll(/\b(\d{1,4})\s*(?:g|gr|gm|gram|grams|gms)\b/g),
    ...keyword.matchAll(/\b(\d{1,4})\s+(?:to|in)\s+cup/g),
  ];
  if (!matches.length) return null;
  const value = Number(matches[0][1]);
  return value >= 1 && value <= 1000 ? value : null;
}

function detectCups(keyword) {
  for (const [pattern, parser] of CUP_PATTERNS) {
    const match = keyword.match(pattern);
    if (!match) continue;
    const cups = parser(match);
    if (Number.isFinite(cups) && cups > 0 && cups <= 10) return Math.round(cups * 1000) / 1000;
  }
  return null;
}

function direction(keyword) {
  if (keyword.includes('cup') && (keyword.includes('gram') || /\bg\b|\bgm\b|\bgr\b/.test(keyword))) {
    const cupIndex = keyword.indexOf('cup');
    const gramIndexes = ['gram', 'g ', 'gm', 'gr'].map((token) => keyword.indexOf(token)).filter((index) => index >= 0);
    const firstGram = Math.min(...gramIndexes);
    if (cupIndex >= 0 && firstGram >= 0 && cupIndex < firstGram) return 'cups_to_grams';
  }
  if (keyword.includes('grams to cups') || keyword.includes('g to cup') || keyword.includes('gm to cup')) {
    return 'grams_to_cups';
  }
  return 'other';
}

function gramsUrl(ingredientId, grams) {
  return `/${ingredientId}/${grams}-grams-to-cups/`;
}

function nearestKnownCupValue(cups) {
  return GENERIC_CUP_VALUES.reduce((best, value) => (
    Math.abs(value - cups) < Math.abs(best - cups) ? value : best
  ), GENERIC_CUP_VALUES[0]);
}

function nearestKnownGramWeight(grams) {
  return GENERIC_GRAM_WEIGHTS.reduce((best, value) => (
    Math.abs(value - grams) < Math.abs(best - grams) ? value : best
  ), GENERIC_GRAM_WEIGHTS[0]);
}

function likelyUrl(item) {
  if (!item.ingredient && item.direction === 'grams_to_cups' && item.grams) {
    return `/grams-to-cups/${nearestKnownGramWeight(item.grams)}-grams-to-cups/`;
  }
  if (!item.ingredient && item.direction === 'cups_to_grams' && item.cups) {
    return `/cups-to-grams/${buildCupConversionSlug(nearestKnownCupValue(item.cups))}/`;
  }
  if (!item.ingredient) return '/';
  if (item.direction === 'grams_to_cups' && item.grams) return gramsUrl(item.ingredient, item.grams);
  if (item.direction === 'cups_to_grams' && item.cups && REVERSE_ENABLED_INGREDIENTS.includes(item.ingredient)) {
    return buildCupToGramsUrl(item.ingredient, nearestKnownCupValue(item.cups));
  }
  if (item.direction === 'cups_to_grams') return `/${item.ingredient}/cups-to-grams/`;
  return `/${item.ingredient}/`;
}

function main() {
  const file = process.argv[2] || DEFAULT_FILE;
  const limit = Number(process.argv[3] || 60);
  const filePath = path.resolve(process.cwd(), file);
  const ingredientIds = loadIngredientIds();
  const rows = parseTsv(decodeFile(filePath)).map((row) => {
    const keyword = row.Keyword.trim().toLowerCase();
    const item = {
      keyword,
      volume: volume(row),
      competition: row.Competition || '',
      direction: direction(keyword),
      ingredient: detectIngredient(keyword),
      grams: detectGrams(keyword),
      cups: detectCups(keyword),
    };
    if (item.ingredient && !ingredientIds.has(item.ingredient)) item.ingredient = null;
    item.url = likelyUrl(item);
    item.clusterKey = [item.direction, item.ingredient || 'generic', item.grams || item.cups || 'hub'].join(':');
    return item;
  });

  const clusters = new Map();
  for (const item of rows) {
    if (!clusters.has(item.clusterKey)) {
      clusters.set(item.clusterKey, {
        key: item.clusterKey,
        direction: item.direction,
        ingredient: item.ingredient,
        grams: item.grams,
        cups: item.cups,
        url: item.url,
        volume: 0,
        keywords: [],
      });
    }
    const cluster = clusters.get(item.clusterKey);
    cluster.volume += item.volume;
    cluster.keywords.push(item);
  }

  const ranked = [...clusters.values()]
    .filter((cluster) => cluster.direction !== 'other' && cluster.volume > 0)
    .sort((a, b) => b.volume - a.volume);

  console.log(`Parsed rows: ${rows.length}`);
  console.log(`Clusters: ${ranked.length}`);
  console.log('\nTop keyword clusters');
  for (const cluster of ranked.slice(0, limit)) {
    const examples = cluster.keywords
      .sort((a, b) => b.volume - a.volume)
      .slice(0, 4)
      .map((item) => `${item.keyword} (${item.volume})`)
      .join('; ');
    console.log(`- ${Math.round(cluster.volume)} | ${cluster.url} | ${examples}`);
  }

  const gaps = ranked
    .filter((cluster) => cluster.direction === 'cups_to_grams' && cluster.ingredient && !REVERSE_ENABLED_INGREDIENTS.includes(cluster.ingredient))
    .slice(0, 30);
  if (gaps.length) {
    console.log('\nCups-to-grams gaps');
    for (const cluster of gaps) console.log(`- ${Math.round(cluster.volume)} | ${cluster.ingredient} | ${cluster.key}`);
  }
}

main();
