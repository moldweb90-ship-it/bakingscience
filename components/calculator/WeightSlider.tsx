"use client";

import { useState } from "react";
import Link from "next/link";
import { convert } from "@/lib/converter";

export interface WeightSliderProps {
  currentWeight: number;
  ingredientId: string;
  density: number;
  method: string;
  state: string | null;
  onWeightChange: (weight: number) => void;
}

export default function WeightSlider({ currentWeight, ingredientId, density, method, state, onWeightChange }: WeightSliderProps) {
  const [sliderWeight, setSliderWeight] = useState(currentWeight);

  const result = convert(sliderWeight, ingredientId, method, state);
  const isDifferent = sliderWeight !== currentWeight;

  return (
    <div className="card p-6">
      <div className="flex items-center gap-4 mb-4">
        <input
          type="range"
          min={1}
          max={1000}
          value={sliderWeight}
          onChange={(e) => {
            const w = parseInt(e.target.value, 10);
            setSliderWeight(w);
            onWeightChange(w);
          }}
          className="flex-1 h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-accent"
          aria-label="Weight slider"
        />
        <input
          type="number"
          min={1}
          max={1000}
          value={sliderWeight}
          onChange={(e) => {
            const w = parseInt(e.target.value, 10);
            if (!isNaN(w) && w >= 1 && w <= 1000) {
              setSliderWeight(w);
              onWeightChange(w);
            }
          }}
          className="input-field w-24 text-center"
          aria-label="Weight in grams"
        />
      </div>
      <div className="text-center mb-3">
        <p className="text-2xl font-bold text-accent-hover">{result.cups} cups</p>
        <p className="text-sm text-slate-500">{sliderWeight}g = {result.cups} cups</p>
      </div>
      {result.cups > 20 && (
        <p className="text-xs text-amber-600 text-center">
          For large batches, we recommend using a kitchen scale.
        </p>
      )}
      {isDifferent && (
        <div className="text-center mt-3">
          <Link
            href={`/${ingredientId}/${sliderWeight}-grams-to-cups/`}
            className="text-accent hover:text-accent-hover font-medium text-sm"
          >
            See the full breakdown for {sliderWeight}g &rarr;
          </Link>
        </div>
      )}
    </div>
  );
}
