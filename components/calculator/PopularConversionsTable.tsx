import Link from "next/link";
import { convert } from "@/lib/converter";

export interface PopularConversionsTableProps {
  ingredientId: string;
  ingredientName: string;
  commonWeights: number[];
}

const boldWeights = [100, 150, 200, 250, 500];

export default function PopularConversionsTable({ ingredientId, ingredientName, commonWeights }: PopularConversionsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="table-header">
            <th className="table-cell text-left">Weight (g)</th>
            <th className="table-cell text-left">Cups (Spoon &amp; Level)</th>
            <th className="table-cell text-left">Cups (Dip &amp; Sweep)</th>
            <th className="table-cell text-left">Cups (Sifted)</th>
          </tr>
        </thead>
        <tbody>
          {commonWeights.map((w) => {
            const spoonLevel = convert(w, ingredientId, "spoon_level");
            const dipSweep = convert(w, ingredientId, "dip_sweep");
            const sifted = convert(w, ingredientId, "sifted");
            const isBold = boldWeights.includes(w);

            return (
              <tr key={w} className={`table-row ${commonWeights.indexOf(w) % 2 === 1 ? "table-row-alt" : ""}`}>
                <td className="table-cell">
                  <Link
                    href={`/${ingredientId}/${w}-grams-to-cups/`}
                    className={`font-medium text-accent hover:text-accent-hover ${isBold ? "font-bold" : ""}`}
                  >
                    {w}g
                  </Link>
                </td>
                <td className="table-cell">{spoonLevel.cups}</td>
                <td className="table-cell">{dipSweep.cups}</td>
                <td className="table-cell">{sifted.cups}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
