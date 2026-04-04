"use client";

import { MEASUREMENT_METHODS } from "@/lib/converter";

export interface MethodSwitcherProps {
  activeMethod: string;
  onMethodChange: (method: string) => void;
  ingredientType: string;
}

export default function MethodSwitcher({ activeMethod, onMethodChange, ingredientType }: MethodSwitcherProps) {
  if (ingredientType === "liquid") return null;

  return (
    <div>
      <div className="flex flex-wrap gap-1 sm:gap-2" role="tablist" aria-label="Measurement method">
        {Object.values(MEASUREMENT_METHODS).map((m) => (
          <button
            key={m.id}
            role="tab"
            aria-selected={activeMethod === m.id}
            onClick={() => onMethodChange(m.id)}
            className={`tab-button flex-1 min-w-[120px] text-center ${activeMethod === m.id ? "tab-button-active" : ""}`}
          >
            <span className="block text-sm font-medium">{m.label}</span>
            <span className="block text-xs mt-0.5">{m.badge}</span>
          </button>
        ))}
      </div>
      <p className="text-sm text-slate-600 mt-3 px-1">
        {MEASUREMENT_METHODS[activeMethod]?.description || ""}
      </p>
    </div>
  );
}
