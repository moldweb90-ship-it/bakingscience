"use client";

import { useState } from "react";
import Link from "next/link";
import { convert, isFatIngredient, isLiquidIngredient, ingredients, MEASUREMENT_METHODS, STATE_MODIFIERS } from "@/lib/converter";

export interface HubQuickCalculatorProps {
  ingredientId: string;
}

export default function HubQuickCalculator({ ingredientId }: HubQuickCalculatorProps) {
  const [weight, setWeight] = useState("");
  const [method, setMethod] = useState("spoon_level");
  const [state, setState] = useState("solid");

  const ingredient = ingredients[ingredientId];
  if (!ingredient) return null;

  const isFat = isFatIngredient(ingredientId);
  const isLiquid = isLiquidIngredient(ingredientId);
  const weightNum = parseInt(weight, 10);
  const isValid = !isNaN(weightNum) && weightNum >= 1 && weightNum <= 1000;

  let result = null;
  if (isValid) {
    const stateId = isFat ? state : null;
    result = convert(weightNum, ingredientId, method, stateId);
  }

  return (
    <div className="card p-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="hub-weight" className="block text-sm font-medium text-slate-700 mb-1">
            Enter weight in grams
          </label>
          <input
            id="hub-weight"
            type="number"
            min={1}
            max={1000}
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="e.g. 150"
            className="input-field w-full"
          />
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

        {isValid && result && (
          <div className="bg-accent-light rounded-card p-4 text-center">
            <p className="text-3xl font-bold text-accent-hover">{result.cups} cups</p>
            <p className="text-sm text-slate-600 mt-1">
              {weight}g {ingredient.name.toLowerCase()} = {result.cups} cups ({MEASUREMENT_METHODS[method]?.label})
            </p>
            <Link
              href={`/${ingredientId}/${weight}-grams-to-cups/`}
              className="inline-block mt-3 text-accent hover:text-accent-hover font-medium text-sm"
            >
              See full breakdown &rarr;
            </Link>
            <div className="mt-2">
              <Link
                href={`/${ingredientId}/cups-to-grams/`}
                className="inline-block text-slate-500 hover:text-accent text-xs"
              >
                Need reverse? Open Cups -&gt; Grams
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
