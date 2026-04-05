import Link from "next/link";
import { findMatchingRecipes, recipes, Recipe } from "@/lib/recipe-scaler";
import { ingredients } from "@/lib/converter";

export interface RecipeContextProps {
  ingredientId: string;
  ingredientName: string;
  weightG: number;
}

function decimalToFraction(cups: number): string {
  const whole = Math.floor(cups);
  const remainder = cups - whole;

  const fractions: [number, string][] = [
    [0, ""],
    [0.125, "\u215B"],
    [0.25, "\u00BC"],
    [0.333, "\u2153"],
    [0.375, "\u215C"],
    [0.5, "\u00BD"],
    [0.625, "\u215D"],
    [0.667, "\u2154"],
    [0.75, "\u00BE"],
    [0.875, "\u215E"],
  ];

  let closest = "";
  let minDiff = Infinity;
  for (const [val, label] of fractions) {
    const diff = Math.abs(remainder - val);
    if (diff < minDiff) {
      minDiff = diff;
      closest = label;
    }
  }

  if (whole === 0 && closest) return closest;
  if (whole === 0) return cups.toFixed(2);
  if (!closest) return `${whole}`;
  return `${whole} and ${closest}`;
}

export default function RecipeContext({ ingredientId, ingredientName, weightG }: RecipeContextProps) {
  const matches = findMatchingRecipes(ingredientId, weightG);

  if (matches.length === 0) {
    const allMatches: { recipe: Recipe; matchWeight: number; difference: number }[] = [];
    for (const recipe of recipes) {
      for (const ing of recipe.ingredients) {
        if (ing.ingredient_id === ingredientId) {
          allMatches.push({
            recipe,
            matchWeight: ing.weight_g,
            difference: weightG - ing.weight_g,
          });
        }
      }
    }
    allMatches.sort((a, b) => Math.abs(a.difference) - Math.abs(b.difference));

    if (allMatches.length === 0) return null;

    const closest = allMatches[0];
    const diffText = closest.difference > 0 ? "less" : "more";

    return (
      <div className="callout-info">
        <h3 className="font-semibold text-slate-800 mb-2">No common recipes found</h3>
        <p className="text-sm text-slate-700">
          We don&apos;t have a recipe using exactly {weightG}g, but the closest is{" "}
          <Link href={`/${ingredientId}/${closest.matchWeight}-grams-to-cups/`} className="text-accent hover:text-accent-hover font-medium">
            {closest.recipe.name}
          </Link>{" "}
          which uses {closest.matchWeight}g. That&apos;s {Math.abs(closest.difference)}g {diffText} than your conversion.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {matches.slice(0, 2).map(({ recipe, matchWeight }) => {
        const isExactMatch = matchWeight === weightG;

        return (
          <div key={recipe.id} className="card p-5">
            <h3 className="font-semibold text-slate-900 mb-2">{recipe.name}</h3>
            <p className="text-sm text-slate-600 mb-3">
              Serves {recipe.serves} - Uses {matchWeight}g {ingredientName.toLowerCase().split(" ")[0]}{isExactMatch ? "" : ` (close to your ${weightG}g)`}
            </p>
            <ul className="space-y-1 text-sm">
              {recipe.ingredients.map((ing) => {
                const ingredient = ingredients[ing.ingredient_id];
                let cups = 0;
                if (ingredient) {
                  let effectiveMod = 1.0;
                  if (ingredient.type === "liquid") {
                    effectiveMod = 1.0;
                  } else if (ingredient.type === "fat" && ingredient.states) {
                    effectiveMod = ingredient.states.solid ?? 1.0;
                  } else {
                    effectiveMod = 1.0;
                  }
                  cups = ing.weight_g / (ingredient.base_density_g_per_ml * 236.588 * effectiveMod);
                }

                return (
                  <li key={ing.ingredient_id} className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/${ing.ingredient_id}/`}
                        className="text-accent hover:text-accent-hover font-medium"
                      >
                        {ingredient?.name || ing.ingredient_id}
                      </Link>
                      {ing.note && <span className="text-slate-400 text-xs">({ing.note})</span>}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-slate-500 font-mono">{ing.weight_g}g</span>
                      <span className="text-slate-400">({decimalToFraction(cups)})</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
