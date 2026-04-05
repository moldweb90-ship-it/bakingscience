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

/**
 * Generate leaf title optimized for real search queries.
 * Format: "250 g sugar to Cups: 2.77 Cups | BakingConverter"
 */
export function generateLeafTitle(
  value: number,
  ingredientId: string,
  spoonLevelCups: number,
): string {
  const name = shortName[ingredientId] || ingredientId.replace(/-/g, ' ');
  return `${value} g ${name} to Cups: ${spoonLevelCups} Cups | BakingConverter`;
}

/**
 * Fallback title
 */
export function generateFallbackTitle(
  value: number,
  ingredientId: string,
): string {
  const name = shortName[ingredientId] || ingredientId.replace(/-/g, ' ');
  return `${value} g ${name} to Cups | BakingConverter`;
}

/**
 * Generate hub page title
 */
export function generateHubTitle(ingredientName: string): string {
  return `${ingredientName} — Grams to Cups Calculator (3 Methods Compared)`;
}

export function generateHubDescription(ingredientName: string, _ingredient: { category: string }): string {
  return `Convert ${ingredientName.toLowerCase()} from grams to cups with precision. See how sifted, packed, and spooned methods change your measurement. Includes nutrition facts and expert baking tips.`;
}

export function getShortName(ingredientId: string): string {
  return shortName[ingredientId] || ingredientId.replace(/-/g, ' ');
}
