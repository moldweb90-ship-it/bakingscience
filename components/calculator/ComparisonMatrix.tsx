import { convert, cupsToAllUnits, MEASUREMENT_METHODS } from "@/lib/converter";

export interface ComparisonMatrixProps {
  weightG: number;
  density: number;
  activeMethod: string;
  stateModifier: number;
}

export default function ComparisonMatrix({ weightG, density, activeMethod, stateModifier }: ComparisonMatrixProps) {
  const methods = ["spoon_level", "dip_sweep", "sifted"];
  const units = [
    { label: "Cups", key: "cups" as const },
    { label: "Tablespoons", key: "tbsp" as const },
    { label: "Teaspoons", key: "tsp" as const },
    { label: "Fluid Ounces", key: "flOz" as const },
    { label: "Milliliters", key: "ml" as const },
  ];

  const results: Record<string, ReturnType<typeof cupsToAllUnits>> = {};
  for (const method of methods) {
    const cups = weightG / (density * 236.588 * MEASUREMENT_METHODS[method].modifier * stateModifier);
    results[method] = cupsToAllUnits(cups);
  }

  return (
    <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
      <table className="w-full text-sm min-w-[450px]">
        <thead>
          <tr className="table-header">
            <th className="table-cell text-left sticky left-0 bg-slate-100 z-10 min-w-[80px]">Unit</th>
            {methods.map((m) => (
              <th
                key={m}
                className={`table-cell text-center px-2 sm:px-4 ${m === activeMethod ? "bg-accent-light text-accent-hover" : ""}`}
              >
                <span className="text-xs sm:text-sm">{MEASUREMENT_METHODS[m].label}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {units.map((unit, idx) => (
            <tr key={unit.key} className={`table-row ${idx % 2 === 1 ? "table-row-alt" : ""}`}>
              <td className="table-cell font-medium text-slate-800 sticky left-0 bg-inherit z-10 min-w-[80px] text-xs sm:text-sm">
                {unit.label}
              </td>
              {methods.map((m) => (
                <td
                  key={m}
                  className={`table-cell text-center font-mono text-xs sm:text-sm px-2 sm:px-4 ${m === activeMethod ? "bg-accent-light font-bold" : ""}`}
                >
                  {results[m][unit.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
