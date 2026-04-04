import recipesData from './recipes.json';
import { convert, gramsToCups, getMethodModifier, getStateModifier, ingredients } from './converter';
import { RECIPE_MATCH_TOLERANCE } from './constants';

export interface RecipeIngredient {
  ingredient_id: string;
  weight_g: number;
  note: string;
}

export interface Recipe {
  id: string;
  name: string;
  category: string;
  serves: number;
  ingredients: RecipeIngredient[];
  source_note: string;
}

export interface ScaledIngredient {
  ingredient_id: string;
  ingredient_name: string;
  original_weight_g: number;
  scaled_weight_g: number;
  cups: number;
  note: string;
}

export interface ScaledRecipe {
  id: string;
  name: string;
  category: string;
  original_serves: number;
  scaled_serves: number;
  scale_factor: number;
  ingredients: ScaledIngredient[];
  source_note: string;
}

export const recipes: Recipe[] = recipesData as Recipe[];

/**
 * Find recipes that use a similar weight of the given ingredient (Section 6.2)
 * Filter to recipes where the ingredient weight is within ±20% of the page weight.
 */
export function findMatchingRecipes(
  ingredientId: string,
  weightG: number,
): { recipe: Recipe; matchWeight: number; difference: number }[] {
  const matches: { recipe: Recipe; matchWeight: number; difference: number }[] = [];

  for (const recipe of recipes) {
    for (const ing of recipe.ingredients) {
      if (ing.ingredient_id === ingredientId) {
        const tolerance = ing.weight_g * RECIPE_MATCH_TOLERANCE;
        const diff = Math.abs(ing.weight_g - weightG);
        if (diff <= tolerance) {
          matches.push({
            recipe,
            matchWeight: ing.weight_g,
            difference: weightG - ing.weight_g,
          });
        }
      }
    }
  }

  return matches.sort((a, b) => Math.abs(a.difference) - Math.abs(b.difference));
}

/**
 * Scale a recipe by a given multiplier (Section 6.3)
 */
export function scaleRecipe(
  recipe: Recipe,
  scaleFactor: number,
  methodId: string = 'spoon_level',
  stateId: string | null = null,
): ScaledRecipe {
  const scaledIngredients: ScaledIngredient[] = recipe.ingredients.map((ing) => {
    const ingredient = ingredients[ing.ingredient_id];
    const scaledWeight = Math.round(ing.weight_g * scaleFactor * 10) / 10;

    let cups = 0;
    if (ingredient) {
      const methodMod = getMethodModifier(methodId, ing.ingredient_id);
      const stateMod = getStateModifier(ingredient, stateId);
      cups = gramsToCups(scaledWeight, ingredient.base_density_g_per_ml, methodMod, stateMod);
    }

    return {
      ingredient_id: ing.ingredient_id,
      ingredient_name: ingredient?.name ?? ing.ingredient_id,
      original_weight_g: ing.weight_g,
      scaled_weight_g: scaledWeight,
      cups,
      note: ing.note,
    };
  });

  return {
    id: recipe.id,
    name: recipe.name,
    category: recipe.category,
    original_serves: recipe.serves,
    scaled_serves: Math.round(recipe.serves * scaleFactor),
    scale_factor: scaleFactor,
    ingredients: scaledIngredients,
    source_note: recipe.source_note,
  };
}
