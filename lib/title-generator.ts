import { SITE_NAME } from './constants';

const shortName: Record<string, string> = {
  'all-purpose-flour': 'flour',
  'whole-wheat-flour': 'flour',
  'bread-flour': 'flour',
  'cake-flour': 'flour',
  'almond-flour': 'almond flour',
  'coconut-flour': 'coconut flour',
  'granulated-sugar': 'sugar',
  'powdered-sugar': 'sugar',
  'brown-sugar': 'sugar',
  'butter': 'butter',
  'coconut-oil': 'coconut oil',
  'vegetable-oil': 'oil',
  'olive-oil': 'olive oil',
  'heavy-cream': 'heavy cream',
  'whole-milk': 'milk',
  'sour-cream': 'sour cream',
  'honey': 'honey',
  'cornstarch': 'cornstarch',
  'rolled-oats': 'oats',
  'cocoa-powder': 'cocoa',
};

function titleCase(value: string): string {
  return value.replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatCupTitleValue(cups: number): string {
  const rounded = Math.round(cups * 100) / 100;
  const fractions: Array<[number, string]> = [
    [0.125, '1/8'],
    [0.25, '1/4'],
    [0.333, '1/3'],
    [0.375, '3/8'],
    [0.5, '1/2'],
    [0.625, '5/8'],
    [0.667, '2/3'],
    [0.75, '3/4'],
    [0.875, '7/8'],
  ];

  const whole = Math.floor(rounded);
  const remainder = rounded - whole;
  let closest = '';
  let minDiff = Infinity;

  for (const [value, label] of fractions) {
    const diff = Math.abs(remainder - value);
    if (diff < minDiff) {
      minDiff = diff;
      closest = label;
    }
  }

  if (minDiff <= 0.015 && closest) {
    if (whole === 0) return closest;
    return `${whole} ${closest}`;
  }

  return String(rounded);
}

function cupWord(cups: number): string {
  return Math.abs(cups - 1) < 0.001 ? 'cup' : 'cups';
}

/**
 * Generate leaf title optimized for real search queries.
 * Format: "250g Sugar to cups: 1 1/4 cups | BakingConverter"
 */
export function generateLeafTitle(
  value: number,
  ingredientId: string,
  spoonLevelCups: number,
): string {
  const name = shortName[ingredientId] || ingredientId.replace(/-/g, ' ');
  const cups = formatCupTitleValue(spoonLevelCups);
  return `${value}g ${titleCase(name)} to cups: ${cups} ${cupWord(spoonLevelCups)} | BakingConverter`;
}

/**
 * Fallback title
 */
export function generateFallbackTitle(
  value: number,
  ingredientId: string,
): string {
  const name = shortName[ingredientId] || ingredientId.replace(/-/g, ' ');
  return `${value} g ${name} to cups | BakingConverter`;
}

/**
 * Generate hub page title
 */
export function generateHubTitle(ingredientName: string): string {
  return `${ingredientName} - Grams to Cups Calculator (3 Methods Compared)`;
}

export function generateHubDescription(ingredientName: string, _ingredient: { category: string }): string {
  return `Convert ${ingredientName.toLowerCase()} from grams to cups with precision. See how sifted, packed, and spooned methods change your measurement. Includes nutrition facts and expert baking tips.`;
}

export function getShortName(ingredientId: string): string {
  return shortName[ingredientId] || ingredientId.replace(/-/g, ' ');
}
