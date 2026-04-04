import { SITE_NAME } from './constants';

/**
 * Anti-snippet title rotation (Section 9.1)
 * Optimized for CTR: answer in title, differentiation from competitors
 *
 * Formula 1 — Answer + Anti-AI (values ending in 0 or 5)
 * Formula 2 — Precision (values ending in 1, 4, 7)
 * Formula 3 — Tool/Interactive (values ending in 2, 3, 6, 8, 9)
 */
export function generateLeafTitle(
  value: number,
  ingredientName: string,
  spoonLevelCups: number,
): string {
  const lastDigit = value % 10;
  const shortName = ingredientName.split(' ')[0];

  if (lastDigit === 0 || lastDigit === 5) {
    return `${value}g ${shortName} in Cups: Exactly ${spoonLevelCups} (Not ~${(spoonLevelCups * 1.1).toFixed(1)}) — 3 Methods`;
  }

  if (lastDigit === 1 || lastDigit === 4 || lastDigit === 7) {
    return `${value}g ${shortName} to Cups: ${spoonLevelCups} Cups Exact (Sifted vs Packed vs Spooned)`;
  }

  return `${value}g ${shortName} Converter: ${spoonLevelCups} Cups — Adjust for Method & Altitude`;
}

/**
 * Fallback title if rotation logic fails
 */
export function generateFallbackTitle(
  value: number,
  ingredientName: string,
): string {
  return `${value}g ${ingredientName} to Cups — Precise Conversion (Sifted vs Packed)`;
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
