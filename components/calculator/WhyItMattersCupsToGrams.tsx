import { cupsToGrams } from "@/lib/converter";
import { formatCupLabel } from "@/lib/cups-to-grams";

export interface WhyItMattersCupsToGramsProps {
  ingredientName: string;
  ingredientId: string;
  cups: number;
}

function cupWord(cups: number): string {
  return cups > 1 ? "cups" : "cup";
}

export default function WhyItMattersCupsToGrams({
  ingredientName,
  ingredientId,
  cups,
}: WhyItMattersCupsToGramsProps) {
  const step = 0.25;
  const lowerCups = Math.max(0.125, Math.round((cups - step) * 1000) / 1000);
  const upperCups = Math.round((cups + step) * 1000) / 1000;

  const baseGrams = Math.round(cupsToGrams(cups, ingredientId, "spoon_level"));
  const lowerGrams = Math.round(cupsToGrams(lowerCups, ingredientId, "spoon_level"));
  const upperGrams = Math.round(cupsToGrams(upperCups, ingredientId, "spoon_level"));

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
        Why Cup-to-Grams Accuracy Matters for {ingredientName}
      </h2>
      <div className="card p-6 space-y-4 text-slate-700 leading-relaxed">
        <p>
          Small cup changes create big weight differences. For {ingredientName.toLowerCase()},{" "}
          {formatCupLabel(cups)} {cupWord(cups)} is about {baseGrams}g, but just 1/4 cup more jumps to {upperGrams}g.
        </p>
        <p>
          This is why cup-based recipes can drift: packed, loose, or sifted volume can shift your actual grams.
          Using grams keeps hydration and texture consistent across batches.
        </p>
        <div className="bg-slate-50 rounded-card p-4 grid grid-cols-3 gap-4 text-center text-sm">
          <div>
            <p className="text-slate-500">{formatCupLabel(lowerCups)} cup</p>
            <p className="font-bold text-slate-800">{lowerGrams}g</p>
          </div>
          <div className="bg-accent-light rounded-card">
            <p className="text-accent-hover font-medium">{formatCupLabel(cups)} {cupWord(cups)} (exact)</p>
            <p className="font-bold text-accent-hover text-lg">{baseGrams}g</p>
          </div>
          <div>
            <p className="text-slate-500">{formatCupLabel(upperCups)} {cupWord(upperCups)}</p>
            <p className="font-bold text-slate-800">{upperGrams}g</p>
          </div>
        </div>
        <p>
          If your recipe starts in cups, convert once to grams and bake by weight. That avoids hidden volume error and
          makes your result repeatable every time.
        </p>
      </div>
    </div>
  );
}

