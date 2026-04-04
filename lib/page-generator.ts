import { ingredients } from './converter';
import { ISR_REVALIDATE_SECONDS } from './constants';

/**
 * Generate static params for ingredient hub pages
 */
export function generateIngredientHubParams() {
  return Object.keys(ingredients).map((id) => ({
    ingredient: id,
  }));
}

/**
 * Generate static params for leaf pages (Section 7.2)
 * Pre-render top 1,000 pages: common_weights × all ingredients
 */
export function generateLeafParams() {
  const params: { ingredient: string; conversion: string }[] = [];

  for (const ingredient of Object.values(ingredients)) {
    for (const weight of ingredient.common_weights_g) {
      params.push({
        ingredient: ingredient.id,
        conversion: `${weight}-grams-to-cups`,
      });
    }
  }

  return params;
}

/**
 * Generate static params for all possible leaf pages (1-1000g per ingredient)
 * Used for ISR fallback
 */
export function generateAllLeafParams() {
  const params: { ingredient: string; conversion: string }[] = [];

  for (const ingredient of Object.values(ingredients)) {
    for (let weight = 1; weight <= 1000; weight++) {
      params.push({
        ingredient: ingredient.id,
        conversion: `${weight}-grams-to-cups`,
      });
    }
  }

  return params;
}

/**
 * ISR revalidation config (Section 7.2) — 7 days
 */
export const revalidate = ISR_REVALIDATE_SECONDS;
