"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import CupGauge from "./CupGauge";
import MethodSwitcher from "./MethodSwitcher";
import StateSwitcher from "./StateSwitcher";
import AltitudeToggle from "./AltitudeToggle";
import RecipeScaler from "./RecipeScaler";
import AdBanner from "@/components/ads/AdBanner";
import AdInContent from "@/components/ads/AdInContent";
import { cupsToAllUnits, cupsToGrams, MEASUREMENT_METHODS } from "@/lib/converter";
import type { Recipe } from "@/lib/recipe-scaler";
import { COMMON_CUP_VALUES, formatCupLabel } from "@/lib/cups-to-grams";
import { buildCupToGramsUrl } from "@/lib/slug-utils";

export interface CupToGramsLeafCalculatorProps {
  ingredientId: string;
  ingredientName: string;
  ingredientType: string;
  cups: number;
  states: Record<string, number> | null;
  matchedRecipe: Recipe | null;
}

function formatGrams(value: number): string {
  const roundedInt = Math.round(value);
  if (Math.abs(value - roundedInt) < 0.005) return `${roundedInt}`;
  return `${Math.round(value * 100) / 100}`;
}

function cupWord(cups: number): string {
  return cups > 1 ? "cups" : "cup";
}

export default function CupToGramsLeafCalculator({
  ingredientId,
  ingredientName,
  ingredientType,
  cups,
  states,
  matchedRecipe,
}: CupToGramsLeafCalculatorProps) {
  const [activeMethod, setActiveMethod] = useState("spoon_level");
  const [activeState, setActiveState] = useState("solid");
  const [altitudeEnabled, setAltitudeEnabled] = useState(false);
  const [selectedCup, setSelectedCup] = useState(cups);

  const isFat = ingredientType === "fat";
  const isLiquid = ingredientType === "liquid";
  const stateId = isFat ? activeState : null;

  const grams = useMemo(
    () => cupsToGrams(cups, ingredientId, activeMethod, stateId),
    [cups, ingredientId, activeMethod, stateId],
  );
  const spoon = cupsToGrams(cups, ingredientId, "spoon_level", stateId);
  const dip = cupsToGrams(cups, ingredientId, "dip_sweep", stateId);
  const sifted = cupsToGrams(cups, ingredientId, "sifted", stateId);
  const units = cupsToAllUnits(cups);

  return (
    <div className="space-y-8">
      <section className="card p-4 sm:p-6 lg:p-8 text-center bg-gradient-to-br from-warm-white to-cream">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 mb-3 sm:mb-4 leading-tight">
          How Many Grams is {formatCupLabel(cups)} {cupWord(cups)} of {ingredientName}?
        </h1>
        <div className="my-4 sm:my-6">
          <p className="text-4xl sm:text-5xl lg:text-6xl font-bold text-accent-hover leading-tight">{formatGrams(grams)}g</p>
          <p className="text-lg sm:text-xl lg:text-2xl font-medium text-slate-600 mt-1">Using {MEASUREMENT_METHODS[activeMethod]?.label}</p>
        </div>
      </section>

      <div className="flex justify-center">
        <CupGauge cups={cups} maxCups={Math.max(cups + 0.5, 2)} />
      </div>

      {!isLiquid && (
        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-3">Measurement Methods Compared</h2>
          <MethodSwitcher
            activeMethod={activeMethod}
            onMethodChange={setActiveMethod}
            ingredientType={ingredientType}
          />
        </section>
      )}

      {isFat && states && (
        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-3">Ingredient State</h2>
          <StateSwitcher
            states={states}
            activeState={activeState}
            onStateChange={setActiveState}
            ingredientName={ingredientName}
          />
        </section>
      )}

      <section>
        <AltitudeToggle enabled={altitudeEnabled} onToggle={setAltitudeEnabled} />
      </section>

      <section>
        <AdBanner />
      </section>

      <section className="card p-6">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">All Methods &amp; Units Compared</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[450px]">
            <thead>
              <tr className="table-header">
                <th className="table-cell text-left">Unit</th>
                <th className="table-cell text-center">Spoon &amp; Level</th>
                <th className="table-cell text-center">Dip &amp; Sweep</th>
                <th className="table-cell text-center">Sifted</th>
              </tr>
            </thead>
            <tbody>
              <tr className="table-row">
                <td className="table-cell font-medium">Grams</td>
                <td className="table-cell text-center">{formatGrams(spoon)}g</td>
                <td className="table-cell text-center">{formatGrams(dip)}g</td>
                <td className="table-cell text-center">{formatGrams(sifted)}g</td>
              </tr>
              <tr className="table-row table-row-alt">
                <td className="table-cell font-medium">Tablespoons</td>
                <td className="table-cell text-center">{units.tbsp}</td>
                <td className="table-cell text-center">{units.tbsp}</td>
                <td className="table-cell text-center">{units.tbsp}</td>
              </tr>
              <tr className="table-row">
                <td className="table-cell font-medium">Teaspoons</td>
                <td className="table-cell text-center">{units.tsp}</td>
                <td className="table-cell text-center">{units.tsp}</td>
                <td className="table-cell text-center">{units.tsp}</td>
              </tr>
              <tr className="table-row table-row-alt">
                <td className="table-cell font-medium">Milliliters</td>
                <td className="table-cell text-center">{units.ml}</td>
                <td className="table-cell text-center">{units.ml}</td>
                <td className="table-cell text-center">{units.ml}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="card p-6">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Try Different Weights</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {COMMON_CUP_VALUES.map((value) => (
            <Link
              key={value}
              href={buildCupToGramsUrl(ingredientId, value)}
              onMouseEnter={() => setSelectedCup(value)}
              className={`card p-3 text-center hover:border-accent transition-colors text-sm ${value === selectedCup ? "border-accent" : ""}`}
            >
              <span className="font-medium text-accent">{formatCupLabel(value)} {cupWord(value)}</span>
              <span className="block text-slate-500 text-xs">{cupsToGrams(value, ingredientId, activeMethod, stateId)}g</span>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <AdInContent />
      </section>

      {matchedRecipe && (
        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-1">Recipe Multiplier &amp; Converter</h2>
          <p className="text-sm text-slate-600 mb-4">Scale this baking recipe and convert between grams and cups instantly.</p>
          <RecipeScaler
            recipe={matchedRecipe}
            currentWeight={Math.round(grams)}
            ingredientId={ingredientId}
            activeMethod={activeMethod}
          />
        </section>
      )}
    </div>
  );
}

