"use client";

import { STATE_MODIFIERS } from "@/lib/converter";

export interface StateSwitcherProps {
  states: Record<string, number> | null;
  activeState: string;
  onStateChange: (state: string) => void;
  ingredientName: string;
}

const stateDescriptions: Record<string, string> = {
  solid: "Cold {name} straight from the refrigerator",
  softened: "Room temperature {name} that gives slightly when pressed",
  melted: "Fully liquid {name} - volume decreases significantly",
};

export default function StateSwitcher({ states, activeState, onStateChange, ingredientName }: StateSwitcherProps) {
  if (!states) return null;

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Ingredient state">
        {Object.keys(states).map((s) => (
          <button
            key={s}
            role="tab"
            aria-selected={activeState === s}
            onClick={() => onStateChange(s)}
            className={`tab-button ${activeState === s ? "tab-button-active" : ""}`}
          >
            {STATE_MODIFIERS[s]?.label || s}
          </button>
        ))}
      </div>
      <p className="text-sm text-slate-600 mt-3 px-1">
        {(stateDescriptions[activeState] || "").replace("{name}", ingredientName.toLowerCase())}
      </p>
    </div>
  );
}
