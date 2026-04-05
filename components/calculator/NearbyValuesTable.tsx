import Link from "next/link";
import { convert } from "@/lib/converter";

export interface NearbyValuesTableProps {
  currentWeight: number;
  ingredientId: string;
  density: number;
}

function decimalToFraction(cups: number): string {
  const whole = Math.floor(cups);
  const remainder = cups - whole;

  const fractions: [number, string][] = [
    [0, ""],
    [0.125, "\u215B"],
    [0.25, "\u00BC"],
    [0.333, "\u2153"],
    [0.375, "\u215C"],
    [0.5, "\u00BD"],
    [0.625, "\u215D"],
    [0.667, "\u2154"],
    [0.75, "\u00BE"],
    [0.875, "\u215E"],
  ];

  let closest = "";
  let minDiff = Infinity;
  for (const [val, label] of fractions) {
    const diff = Math.abs(remainder - val);
    if (diff < minDiff) {
      minDiff = diff;
      closest = label;
    }
  }

  if (whole === 0 && closest) return closest;
  if (whole === 0) return cups.toFixed(2);
  if (!closest) return `${whole}`;
  return `${whole} and ${closest}`;
}

export default function NearbyValuesTable({ currentWeight, ingredientId }: NearbyValuesTableProps) {
  const offsets = [-50, -25, -10, 0, 10, 25, 50];
  const values = offsets
    .map((o) => currentWeight + o)
    .filter((v) => v >= 1 && v <= 1000);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm min-w-[300px]">
        <thead>
          <tr className="table-header">
            <th className="table-cell text-left">Weight</th>
            <th className="table-cell text-left">Cups (Spoon &amp; Level)</th>
            <th className="table-cell text-left"></th>
          </tr>
        </thead>
        <tbody>
          {values.map((v) => {
            const result = convert(v, ingredientId, "spoon_level");
            const isCurrent = v === currentWeight;

            return (
              <tr key={v} className={`table-row ${isCurrent ? "bg-accent-light font-bold" : ""}`}>
                <td className="table-cell">
                  {isCurrent ? (
                    <span>{v}g</span>
                  ) : (
                    <Link href={`/${ingredientId}/${v}-grams-to-cups/`} className="text-accent hover:text-accent-hover">
                      {v}g
                    </Link>
                  )}
                </td>
                <td className="table-cell">{decimalToFraction(result.cups)}</td>
                <td className="table-cell">
                  {isCurrent ? (
                    <span className="text-xs text-slate-500">You are here</span>
                  ) : (
                    <Link href={`/${ingredientId}/${v}-grams-to-cups/`} className="text-accent hover:text-accent-hover text-xs">
                      &rarr; Convert
                    </Link>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
