"use client";

import { useState } from "react";

export interface AltitudeToggleProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

export default function AltitudeToggle({ enabled, onToggle }: AltitudeToggleProps) {
  return (
    <div>
      <label className="flex items-center gap-3 cursor-pointer min-h-[44px]">
        <span className="text-sm text-slate-700 font-medium">{"\u26f0\ufe0f"} Baking above 3,500 ft?</span>
        <button
          role="switch"
          aria-checked={enabled}
          onClick={() => onToggle(!enabled)}
          className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${enabled ? "bg-accent" : "bg-slate-300"}`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${enabled ? "translate-x-5" : "translate-x-0"}`}
          />
        </button>
      </label>
      {enabled && (
        <div className="callout-warning mt-3">
          <p className="font-semibold text-slate-800 mb-1">High Altitude Baking Adjustments</p>
          <p className="text-sm text-slate-600 mb-2">Essential tips for baking above 3,500 ft (1,070m)</p>
          <ul className="text-sm text-slate-700 space-y-1 list-disc list-inside">
            <li>Add 2-4 tablespoons of flour per cup</li>
            <li>Increase liquid by 2-4 tablespoons</li>
            <li>Increase oven temperature by 15-25{"\u00b0"}F</li>
            <li>Decrease sugar by 1-3 tablespoons per cup</li>
            <li>Decrease leavening by 25%</li>
          </ul>
          <p className="text-xs text-slate-500 mt-3">
            Affected cities: Denver, Salt Lake City, Albuquerque, Colorado Springs, Flagstaff, Santa Fe, Boise, Reno
          </p>
        </div>
      )}
    </div>
  );
}
