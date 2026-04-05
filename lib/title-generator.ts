import { SITE_NAME } from './constants';

const shortName: Record<string, string> = {
  'all-purpose-flour': 'flour',
  'whole-wheat-flour': 'whole wheat flour',
  'bread-flour': 'bread flour',
  'cake-flour': 'cake flour',
  'almond-flour': 'almond flour',
  'coconut-flour': 'coconut flour',
  'granulated-sugar': 'sugar',
  'powdered-sugar': 'powdered sugar',
  'brown-sugar': 'brown sugar',
  'butter': 'butter',
  'coconut-oil': 'coconut oil',
  'vegetable-oil': 'vegetable oil',
  'olive-oil': 'olive oil',
  'heavy-cream': 'heavy cream',
  'whole-milk': 'milk',
  'sour-cream': 'sour cream',
  'honey': 'honey',
  'cornstarch': 'cornstarch',
  'rolled-oats': 'oats',
  'cocoa-powder': 'cocoa powder',
};

/**
 * Generate leaf title optimized for real search queries.
 * Pattern: "{grams} Grams {shortName} to Cups: {result} Cups | BakingConverter"
 */
export function generateLeafTitle(
  value: number,
  ingredientId: string,
  spoonLevelCups: number,
): string {
  const name = shortName[ingredientId] || ingredientId.replace(/-/g, ' ');
  
  // Try full "Grams" first
  let title = `${value} Grams ${name} to Cups: ${spoonLevelCups} Cups | ${SITE_NAME}`;
  
  // If too long (>60 chars), switch to "g"
  if (title.length > 60) {
    title = `${value}g ${name} to Cups: ${spoonLevelCups} Cups | ${SITE_NAME}`;
  }
  
  // If still too long, truncate name
  if (title.length > 60) {
    const short = name.split(' ').slice(0, 2).join(' ');
    title = `${value}g ${short} to Cups: ${spoonLevelCups} Cups | ${SITE_NAME}`;
  }

  return title;
}

/**
 * Fallback title
 */
export function generateFallbackTitle(
  value: number,
  ingredientId: string,
): string {
  const name = shortName[ingredientId] || ingredientId.replace(/-/g, ' ');
  return `${value} Grams ${name} to Cups | ${SITE_NAME}`;
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
