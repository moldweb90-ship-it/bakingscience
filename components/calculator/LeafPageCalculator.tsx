"use client";

import { useState, useRef } from "react";
import ResultHero from "./ResultHero";
import CupGauge from "./CupGauge";
import MethodSwitcher from "./MethodSwitcher";
import StateSwitcher from "./StateSwitcher";
import AltitudeToggle from "./AltitudeToggle";
import ComparisonMatrix from "./ComparisonMatrix";
import WeightSlider from "./WeightSlider";
import RecipeScaler from "./RecipeScaler";
import ConversionCard from "@/components/sharing/ConversionCard";
import ShareButtons from "@/components/sharing/ShareButtons";
import PrintButton from "@/components/sharing/PrintButton";
import SaveImageButton from "@/components/sharing/SaveImageButton";
import AdBanner from "@/components/ads/AdBanner";
import AdInContent from "@/components/ads/AdInContent";
import { convert, cupsToAllUnits, MEASUREMENT_METHODS } from "@/lib/converter";
import type { Recipe } from "@/lib/recipe-scaler";

export interface LeafPageCalculatorProps {
  ingredientId: string;
  ingredientName: string;
  ingredientType: string;
  weightG: number;
  density: number;
  states: Record<string, number> | null;
  photoAvailable: boolean;
  matchedRecipe: Recipe | null;
  canonicalUrl: string;
  pageTitle: string;
  pageDescription: string;
}

function formatCups(n: number): string {
  return n === 1 ? "1 cup" : `${n} cups`;
}

export default function LeafPageCalculator({
  ingredientId,
  ingredientName,
  ingredientType,
  weightG,
  density,
  states,
  photoAvailable,
  matchedRecipe,
  canonicalUrl,
  pageTitle,
  pageDescription,
}: LeafPageCalculatorProps) {
  const [activeMethod, setActiveMethod] = useState("spoon_level");
  const [activeState, setActiveState] = useState("solid");
  const [altitudeEnabled, setAltitudeEnabled] = useState(false);
  const [sliderWeight, setSliderWeight] = useState(weightG);

  const cardRef = useRef<HTMLDivElement>(null);

  const stateModifier = states ? states[activeState] ?? 1.0 : 1.0;
  const methodModifier = MEASUREMENT_METHODS[activeMethod]?.modifier ?? 1.0;

  const resultCups = weightG / (density * 236.588 * methodModifier * stateModifier);
  const roundedCups = Math.round(resultCups * 100) / 100;

  const spoonLevelCups = Math.round(weightG / (density * 236.588 * 1.0 * stateModifier) * 100) / 100;
  const siftedCups = Math.round(weightG / (density * 236.588 * 0.85 * stateModifier) * 100) / 100;
  const dipSweepCups = Math.round(weightG / (density * 236.588 * 1.18 * stateModifier) * 100) / 100;

  const isFat = ingredientType === "fat";
  const isLiquid = ingredientType === "liquid";

  const methodSubtitles: Record<string, string> = {
    spoon_level: "Using the Spoon & Level method (recommended)",
    dip_sweep: "Using the Dip & Sweep method (heavy, +18%)",
    sifted: "Using the Sifted method (light, -15%)",
  };

  return (
    <div className="space-y-8">
      {/* Section B: Result Hero */}
      <ResultHero
        ingredientName={ingredientName}
        weightG={weightG}
        resultCups={roundedCups}
        methodName={MEASUREMENT_METHODS[activeMethod]?.label || ""}
        subtitle={methodSubtitles[activeMethod] || ""}
      />

      {/* Cup Gauge */}
      <div className="flex justify-center">
        <CupGauge cups={roundedCups} maxCups={Math.max(roundedCups + 0.5, 2)} />
      </div>

      {/* Section C: Method Switcher */}
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

      {/* Section D: State Switcher */}
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

      {/* Section E: Altitude Toggle */}
      <section>
        <AltitudeToggle enabled={altitudeEnabled} onToggle={setAltitudeEnabled} />
      </section>

      {/* Section F: Ad Slot #1 */}
      <section>
        <AdBanner />
      </section>

      {/* Section G: Comparison Matrix */}
      <section>
        <h2 className="text-xl font-semibold text-slate-900 mb-4">All Methods &amp; Units Compared</h2>
        <ComparisonMatrix
          weightG={weightG}
          density={density}
          activeMethod={activeMethod}
          stateModifier={stateModifier}
        />
      </section>

      {/* Section H: Visual Measurement Guide */}
      {/* Rendered in server component */}

      {/* Section I: Nearby Values Table */}
      {/* Rendered in server component */}

      {/* Section J: Weight Slider */}
      <section>
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Try Different Weights</h2>
        <WeightSlider
          currentWeight={weightG}
          ingredientId={ingredientId}
          density={density}
          method={activeMethod}
          state={isFat ? activeState : null}
          onWeightChange={setSliderWeight}
        />
      </section>

      {/* Section K: Ad Slot #2 */}
      <section>
        <AdInContent />
      </section>

      {/* Section L: Recipe Context */}
      {/* Rendered in server component */}

      {/* Section M: Recipe Scaler */}
      {matchedRecipe && (
        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Scale This Recipe</h2>
          <RecipeScaler
            recipe={matchedRecipe}
            currentWeight={weightG}
            ingredientId={ingredientId}
            activeMethod={activeMethod}
          />
        </section>
      )}

      {/* Section N: Nutrition Block */}
      {/* Rendered in server component */}

      {/* Section O: Pro Tips */}
      {/* Rendered in server component */}

      {/* Section P: Why It Matters */}
      {/* Rendered in server component */}

      {/* Section Q: FAQ */}
      {/* Rendered in server component */}

      {/* Section R: Sharing Block */}
      <section className="card p-6">
        <ConversionCard
          ref={cardRef}
          ingredientName={ingredientName}
          weightG={weightG}
          resultCups={roundedCups}
          methodName={MEASUREMENT_METHODS[activeMethod]?.label || ""}
          spoonLevelCups={spoonLevelCups}
          dipSweepCups={dipSweepCups}
          siftedCups={siftedCups}
        />
        <div className="mt-6">
          <ShareButtons
            url={canonicalUrl}
            title={pageTitle}
            description={pageDescription}
          />
          <div className="flex flex-wrap gap-3 mt-4">
            <PrintButton ingredientName={ingredientName} weightG={weightG} />
            <SaveImageButton targetRef={cardRef} fileName={`${ingredientId}-${weightG}g`} />
          </div>
        </div>
      </section>

      {/* Sections S, T rendered in server component */}
    </div>
  );
}
