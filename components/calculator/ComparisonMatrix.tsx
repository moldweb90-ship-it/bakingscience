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
    <div className="overflow-x-auto">
      <table className="w-full text-sm min-w-[500px]">
        <thead>
          <tr className="table-header">
            <th className="table-cell text-left sticky left-0 bg-slate-100 z-10">Unit</th>
            {methods.map((m) => (
              <th
                key={m}
                className={`table-cell text-center ${m === activeMethod ? "bg-accent-light text-accent-hover" : ""}`}
              >
                {MEASUREMENT_METHODS[m].label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {units.map((unit, idx) => (
            <tr key={unit.key} className={`table-row ${idx % 2 === 1 ? "table-row-alt" : ""}`}>
              <td className="table-cell font-medium text-slate-800 sticky left-0 bg-inherit z-10">
                {unit.label}
              </td>
              {methods.map((m) => (
                <td
                  key={m}
                  className={`table-cell text-center font-mono ${m === activeMethod ? "bg-accent-light font-bold" : ""}`}
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
