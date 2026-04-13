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

const CUP_TO_GRAMS_SUFFIX_RE =
  /^(.+)-(?:c|cup|cups)(?:-(?:to|in))-grams$/i;

function parseCupToken(token: string): number | null {
  const cleaned = token.trim().replace(/_/g, '-');
  if (!cleaned) return null;

  const fractionMatch = cleaned.match(/^(\d+)-(\d+)$/);
  if (fractionMatch) {
    const numerator = parseInt(fractionMatch[1], 10);
    const denominator = parseInt(fractionMatch[2], 10);
    if (denominator === 0) return null;
    return numerator / denominator;
  }

  const mixedMatch = cleaned.match(/^(\d+)-(\d+)-(\d+)$/);
  if (mixedMatch) {
    const whole = parseInt(mixedMatch[1], 10);
    const numerator = parseInt(mixedMatch[2], 10);
    const denominator = parseInt(mixedMatch[3], 10);
    if (denominator === 0) return null;
    return whole + numerator / denominator;
  }

  const numeric = Number(cleaned.replace('-', '.'));
  return Number.isFinite(numeric) ? numeric : null;
}

export function parseCupConversionSlug(slug: string): number | null {
  const match = slug.toLowerCase().match(CUP_TO_GRAMS_SUFFIX_RE);
  if (!match) return null;

  const cups = parseCupToken(match[1]);
  if (cups === null || cups <= 0 || cups > 10) return null;

  return Math.round(cups * 1000) / 1000;
}

export function buildCupConversionSlug(cups: number): string {
  const epsilon = 0.0001;
  const whole = Math.floor(cups);
  const remainder = cups - whole;
  const commonFractions: Array<{ value: number; token: string }> = [
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
  for (const f of commonFractions) {
    const diff = Math.abs(remainder - f.value);
    if (diff < minDiff) {
      minDiff = diff;
      best = f;
    }
  }

  if (whole === 0) return `${best.token}-cup-to-grams`;
  return `${whole}-${best.token}-cups-to-grams`;
}

export function buildCupToGramsUrl(ingredientId: string, cups: number): string {
  return `/${ingredientId}/cups-to-grams/${buildCupConversionSlug(cups)}/`;
}
