import Link from "next/link";
import { findMatchingRecipes, recipes, Recipe } from "@/lib/recipe-scaler";
import { ingredients } from "@/lib/converter";

export interface RecipeContextProps {
  ingredientId: string;
  weightG: number;
}

export default function RecipeContext({ ingredientId, weightG }: RecipeContextProps) {
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
      {matches.slice(0, 2).map(({ recipe, matchWeight }) => (
        <div key={recipe.id} className="card p-5">
          <h3 className="font-semibold text-slate-900 mb-2">{recipe.name}</h3>
          <p className="text-sm text-slate-600 mb-3">
            Serves {recipe.serves} &mdash; This is a common weight for this recipe ({matchWeight}g of {ingredientId})
          </p>
          <ul className="space-y-1 text-sm">
            {recipe.ingredients.map((ing) => {
              const ingredient = ingredients[ing.ingredient_id];
              return (
                <li key={ing.ingredient_id} className="flex items-center gap-2">
                  <Link
                    href={`/${ing.ingredient_id}/`}
                    className="text-accent hover:text-accent-hover font-medium"
                  >
                    {ingredient?.name || ing.ingredient_id}
                  </Link>
                  <span className="text-slate-500">{ing.weight_g}g</span>
                  {ing.note && <span className="text-slate-400 text-xs">({ing.note})</span>}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
