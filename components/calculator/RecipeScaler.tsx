"use client";

import { useState } from "react";
import Link from "next/link";
import { scaleRecipe, Recipe } from "@/lib/recipe-scaler";
import { MEASUREMENT_METHODS, ingredients } from "@/lib/converter";

export interface RecipeScalerProps {
  recipe: Recipe;
  currentWeight: number;
  ingredientId: string;
  activeMethod: string;
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

function formatCups(cups: number): string {
  if (cups === 0) return "0 cups";
  if (cups === 1) return "1 cup";

  const whole = Math.floor(cups);
  const remainder = cups - whole;

  const fractions: [number, string][] = [
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

  if (whole === 0) return `${closest} cup`;
  if (!closest) return `${whole} cups`;
  return `${whole} ${closest} cups`;
}

export default function RecipeScaler({ recipe, activeMethod }: RecipeScalerProps) {
  const [scale, setScale] = useState(1);
  const [customScale, setCustomScale] = useState("");

  const scaleFactor = customScale ? parseFloat(customScale) : scale;

  const scaledRecipe = (() => {
    const methodMod = MEASUREMENT_METHODS[activeMethod]?.modifier ?? 1.0;
    const scaledIngredients = recipe.ingredients.map((ing) => {
      const ingredient = ingredients[ing.ingredient_id];
      const scaledWeight = Math.round(ing.weight_g * scaleFactor * 10) / 10;

      let cups = 0;
      if (ingredient) {
        let effectiveMod = 1.0;
        if (ingredient.type === "liquid") {
          effectiveMod = 1.0;
        } else if (ingredient.type === "fat" && ingredient.states) {
          effectiveMod = ingredient.states.solid ?? 1.0;
        } else {
          effectiveMod = methodMod;
        }
        cups = Math.round(scaledWeight / (ingredient.base_density_g_per_ml * 236.588 * effectiveMod) * 100) / 100;
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
      name: recipe.name,
      scaled_serves: Math.round(recipe.serves * scaleFactor),
      scale_factor: scaleFactor,
      ingredients: scaledIngredients,
    };
  })();

  const presets = [
    { value: 0.5, label: "\u00BD Recipe" },
    { value: 1, label: "1x" },
    { value: 1.5, label: "1.5x" },
    { value: 2, label: "Double" },
    { value: 3, label: "Triple" },
  ];

  return (
    <div className="card p-6">
      <p className="text-lg font-semibold text-slate-900 mb-1">
        {scaledRecipe.name} (scaled to {scaledRecipe.scale_factor}x, serves {scaledRecipe.scaled_serves})
      </p>

      <div className="overflow-x-auto mb-4">
        <table className="w-full text-sm min-w-[400px]">
          <thead>
            <tr className="table-header">
              <th className="table-cell text-left">Ingredient</th>
              <th className="table-cell text-center">Grams</th>
              <th className="table-cell text-center">Cups</th>
            </tr>
          </thead>
          <tbody>
            {scaledRecipe.ingredients.map((ing) => (
              <tr key={ing.ingredient_id} className="table-row">
                <td className="table-cell">
                  <Link href={`/${ing.ingredient_id}/`} className="text-accent hover:text-accent-hover font-medium">
                    {ing.ingredient_name}
                  </Link>
                  {ing.note && <span className="text-slate-400 text-xs ml-1">({ing.note})</span>}
                </td>
                <td className="table-cell text-center font-mono">{ing.scaled_weight_g}g</td>
                <td className="table-cell text-center font-mono">{formatCups(ing.cups)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        {presets.map((p) => (
          <button
            key={p.value}
            onClick={() => { setScale(p.value); setCustomScale(""); }}
            className={`btn-secondary text-sm px-3 py-2 min-h-[36px] ${scaledRecipe.scale_factor === p.value && !customScale ? "bg-accent-light text-accent-hover border-accent" : ""}`}
          >
            {p.label}
          </button>
        ))}
        <div className="flex items-center gap-1">
          <span className="text-sm text-slate-500">Custom:</span>
          <input
            type="number"
            min={0.1}
            max={10}
            step={0.1}
            value={customScale}
            onChange={(e) => setCustomScale(e.target.value)}
            onFocus={() => setCustomScale(customScale || "1")}
            className="input-field w-20 text-sm py-1 min-h-[36px]"
            placeholder="1.0"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mt-4">
        <button onClick={() => window.print()} className="btn-secondary text-sm px-4 py-2 min-h-[44px]">
          {"\ud83d\udda8\ufe0f"} Print Recipe Card
        </button>
      </div>
    </div>
  );
}
