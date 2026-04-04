import { MIN_WEIGHT_G, MAX_WEIGHT_G } from './constants';

/**
 * Parse a conversion slug like "150-grams-to-cups" (Section 7.3)
 * Returns the weight value or null if invalid.
 */
export function parseConversionSlug(slug: string): number | null {
  const match = slug.match(/^(\d+(?:\.\d+)?)-grams-to-cups$/i);
  if (!match) return null;

  const raw = match[1];
  const value = parseFloat(raw);

  if (isNaN(value)) return null;
  if (value < MIN_WEIGHT_G || value > MAX_WEIGHT_G) return null;

  return Math.round(value);
}

/**
 * Check if a slug needs a 301 redirect (Section 7.3)
 * Returns the redirect target or null if no redirect needed.
 */
export function getRedirectTarget(
  slug: string,
): { url: string; code: 301 } | null {
  if (slug !== slug.toLowerCase()) {
    return { url: `/${slug.toLowerCase()}/`, code: 301 };
  }

  if (!slug.endsWith('/')) {
    return { url: `/${slug}/`, code: 301 };
  }

  const decimalMatch = slug.match(/^(\d+)\.(\d+)-grams-to-cups\/$/i);
  if (decimalMatch) {
    const rounded = Math.round(parseFloat(decimalMatch[1]));
    if (rounded >= MIN_WEIGHT_G && rounded <= MAX_WEIGHT_G) {
      return { url: `/${rounded}-grams-to-cups/`, code: 301 };
    }
  }

  return null;
}

/**
 * Validate a weight value (Section 7.2)
 */
export function isValidWeight(weight: number): boolean {
  return (
    Number.isInteger(weight) &&
    weight >= MIN_WEIGHT_G &&
    weight <= MAX_WEIGHT_G
  );
}

/**
 * Build a leaf page URL for a given ingredient and weight
 */
export function buildLeafUrl(ingredientId: string, weightG: number): string {
  return `/${ingredientId}/${weightG}-grams-to-cups/`;
}

/**
 * Build an ingredient hub URL
 */
export function buildHubUrl(ingredientId: string): string {
  return `/${ingredientId}/`;
}
