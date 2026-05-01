import Link from "next/link";
import { cupsToGrams } from "@/lib/converter";
import { buildCupToGramsUrl } from "@/lib/slug-utils";
import { COMMON_CUP_VALUES, formatCupLabel } from "@/lib/cups-to-grams";

export interface PopularCupConversionsTableProps {
  ingredientId: string;
}

export default function PopularCupConversionsTable({ ingredientId }: PopularCupConversionsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="table-header">
            <th className="table-cell text-left">Volume (cups)</th>
            <th className="table-cell text-left">Grams (Spoon &amp; Level)</th>
            <th className="table-cell text-left">Grams (Dip &amp; Sweep)</th>
            <th className="table-cell text-left">Grams (Sifted)</th>
          </tr>
        </thead>
        <tbody>
          {COMMON_CUP_VALUES.map((cups, idx) => {
            const spoon = cupsToGrams(cups, ingredientId, "spoon_level");
            const dip = cupsToGrams(cups, ingredientId, "dip_sweep");
            const sifted = cupsToGrams(cups, ingredientId, "sifted");
            return (
              <tr key={cups} className={`table-row ${idx % 2 === 1 ? "table-row-alt" : ""}`}>
                <td className="table-cell">
                  <Link href={buildCupToGramsUrl(ingredientId, cups)} className="font-medium text-accent hover:text-accent-hover">
                    {formatCupLabel(cups)} cup{cups === 1 ? "" : "s"}
                  </Link>
                </td>
                <td className="table-cell">{Math.round(spoon)}g</td>
                <td className="table-cell">{Math.round(dip)}g</td>
                <td className="table-cell">{Math.round(sifted)}g</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

