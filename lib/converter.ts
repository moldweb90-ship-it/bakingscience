import {
  US_CUP_ML,
  US_TABLESPOON_ML,
  US_TEASPOON_ML,
  US_FL_OZ_ML,
  MEASUREMENT_METHODS,
  STATE_MODIFIERS,
} from './constants';
import ingredientsData from './ingredients.json';

export { MEASUREMENT_METHODS, STATE_MODIFIERS };

export interface Ingredient {
  id: string;
  name: string;
  category: string;
  base_density_g_per_ml: number;
  type: 'dry' | 'liquid' | 'fat';
  states: Record<string, number> | null;
  measurement_method_overrides: Record<string, number> | null;
  nutrition_per_100g: {
    calories: number;
    protein_g: number;
    carbs_g: number;
    fat_g: number;
    fiber_g: number;
    sugar_g: number;
  };
  pro_tips: string[];
  common_weights_g: number[];
  related_ingredients: string[];
  faq: { question: string; answer: string }[];
  description: string;
  photo_available: boolean;
  density_source: string;
  aliases: string[];
}

export interface ConversionResult {
  cups: number;
  tbsp: number;
  tsp: number;
  flOz: number;
  ml: number;
}

export interface IngredientMap {
  [id: string]: Ingredient;
}

export const ingredients: IngredientMap = {};
for (const ing of ingredientsData) {
  ingredients[ing.id] = ing as Ingredient;
}

export function getMethodModifier(
  methodId: string,
  ingredientId?: string,
): number {
  const defaultModifier = MEASUREMENT_METHODS[methodId]?.modifier ?? 1.0;

  if (ingredientId && ingredients[ingredientId]?.measurement_method_overrides) {
    const overrides = ingredients[ingredientId].measurement_method_overrides;
    if (overrides && overrides[methodId] !== undefined) {
      return overrides[methodId];
    }
  }

  return defaultModifier;
}

export function getStateModifier(
  ingredient: Ingredient,
  stateId: string | null,
): number {
  if (!ingredient.states || !stateId) return 1.0;
  return ingredient.states[stateId] ?? 1.0;
}

export function gramsToCups(
  weightG: number,
  density: number,
  methodModifier: number = 1.0,
  stateModifier: number = 1.0,
): number {
  if (weightG <= 0 || density <= 0) return 0;

  const cups =
    weightG / (density * US_CUP_ML * methodModifier * stateModifier);

  return Math.round(cups * 100) / 100;
}

export function cupsToAllUnits(cups: number): ConversionResult {
  return {
    cups: Math.round(cups * 100) / 100,
    tbsp: Math.round(cups * 16 * 100) / 100,
    tsp: Math.round(cups * 48 * 100) / 100,
    flOz: Math.round(cups * 8 * 100) / 100,
    ml: Math.round(cups * US_CUP_ML * 100) / 100,
  };
}

export function convert(
  weightG: number,
  ingredientId: string,
  methodId: string = 'spoon_level',
  stateId: string | null = null,
): ConversionResult {
  const ingredient = ingredients[ingredientId];
  if (!ingredient) {
    throw new Error(`Ingredient not found: ${ingredientId}`);
  }

  const methodMod = getMethodModifier(methodId, ingredientId);
  const stateMod = getStateModifier(ingredient, stateId);
  const cups = gramsToCups(weightG, ingredient.base_density_g_per_ml, methodMod, stateMod);

  return cupsToAllUnits(cups);
}

export function getPrimaryDisplayUnit(cups: number): 'cups' | 'tbsp' | 'tsp' {
  if (cups < 0.01) return 'tsp';
  if (cups < 0.125) return 'tbsp';
  return 'cups';
}

export function isLargeBatch(cups: number): boolean {
  return cups > 20;
}

export function isFatIngredient(ingredientId: string): boolean {
  const ingredient = ingredients[ingredientId];
  return ingredient?.type === 'fat';
}

export function isLiquidIngredient(ingredientId: string): boolean {
  const ingredient = ingredients[ingredientId];
  return ingredient?.type === 'liquid';
}
