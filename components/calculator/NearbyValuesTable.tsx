import Link from "next/link";
import { convert } from "@/lib/converter";

export interface NearbyValuesTableProps {
  currentWeight: number;
  ingredientId: string;
  density: number;
}

function formatCups(n: number): string {
  return n === 1 ? "1 cup" : `${n} cups`;
}

export default function NearbyValuesTable({ currentWeight, ingredientId, density }: NearbyValuesTableProps) {
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
                <td className="table-cell">{formatCups(result.cups)}</td>
                <td className="table-cell">
                  {isCurrent ? (
                    <span className="text-xs text-slate-500">You are here</span>
                  ) : (
                    <Link href={`/${ingredientId}/${v}-grams-to-cups/`} className="text-accent hover:text-accent-hover text-xs">
                      &rarr; View
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
