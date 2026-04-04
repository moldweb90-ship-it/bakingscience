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
      <div className="flex flex-col sm:flex-row gap-1 sm:gap-2" role="tablist" aria-label="Measurement method">
        {Object.values(MEASUREMENT_METHODS).map((m) => (
          <button
            key={m.id}
            role="tab"
            aria-selected={activeMethod === m.id}
            onClick={() => onMethodChange(m.id)}
            className={`tab-button flex-1 text-center text-xs px-2 py-2 ${activeMethod === m.id ? "tab-button-active" : ""}`}
          >
            <span className="block font-medium leading-tight">{m.label}</span>
            <span className="block text-[10px] mt-0.5 leading-tight">{m.badge}</span>
          </button>
        ))}
      </div>
      <p className="text-sm text-slate-600 mt-3 px-1">
        {MEASUREMENT_METHODS[activeMethod]?.description || ""}
      </p>
    </div>
  );
}
