"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { cupsToGrams, ingredients, isFatIngredient, isLiquidIngredient, MEASUREMENT_METHODS, STATE_MODIFIERS } from "@/lib/converter";
import { buildCupToGramsUrl } from "@/lib/slug-utils";
import { COMMON_CUP_VALUES } from "@/lib/cups-to-grams";

export interface CupToGramsQuickCalculatorProps {
  ingredientId: string;
}

export default function CupToGramsQuickCalculator({ ingredientId }: CupToGramsQuickCalculatorProps) {
  const [cups, setCups] = useState(1);
  const [method, setMethod] = useState("spoon_level");
  const [state, setState] = useState("solid");
  const cupUnit = cups > 1 ? "cups" : "cup";

  const ingredient = ingredients[ingredientId];
  if (!ingredient) return null;

  const isFat = isFatIngredient(ingredientId);
  const isLiquid = isLiquidIngredient(ingredientId);
  const stateId = isFat ? state : null;

  const grams = useMemo(() => cupsToGrams(cups, ingredientId, method, stateId), [cups, ingredientId, method, stateId]);

  return (
    <div className="card p-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="hub-cups" className="block text-sm font-medium text-slate-700 mb-1">
            Enter cups
          </label>
          <select
            id="hub-cups"
            value={cups}
            onChange={(e) => setCups(Number(e.target.value))}
            className="input-field w-full"
          >
            {COMMON_CUP_VALUES.map((value) => (
              <option key={value} value={value}>
                {value} {value > 1 ? "cups" : "cup"}
              </option>
            ))}
          </select>
        </div>

        {!isLiquid && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Measurement method</label>
            <div className="flex flex-wrap gap-2">
              {Object.values(MEASUREMENT_METHODS).map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMethod(m.id)}
                  className={`tab-button ${method === m.id ? "tab-button-active" : ""}`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {isFat && ingredient.states && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">State</label>
            <div className="flex flex-wrap gap-2">
              {Object.keys(ingredient.states).map((s) => (
                <button
                  key={s}
                  onClick={() => setState(s)}
                  className={`tab-button ${state === s ? "tab-button-active" : ""}`}
                >
                  {STATE_MODIFIERS[s]?.label || s}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="bg-accent-light rounded-card p-4 text-center">
          <p className="text-3xl font-bold text-accent-hover">{grams} grams</p>
          <p className="text-sm text-slate-600 mt-1">
            {cups} {cupUnit} {ingredient.name.toLowerCase()} = {grams}g ({MEASUREMENT_METHODS[method]?.label})
          </p>
          <Link
            href={buildCupToGramsUrl(ingredientId, cups)}
            className="inline-block mt-3 text-accent hover:text-accent-hover font-medium text-sm"
          >
            See full breakdown &rarr;
          </Link>
          <div className="mt-2">
            <Link
              href={`/${ingredientId}/`}
              className="inline-block text-slate-500 hover:text-accent text-xs"
            >
              Need reverse? Open Grams -&gt; Cups
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

