export interface ProTipsProps {
  tips: string[];
  ingredientName: string;
  weightG: number;
  fractionText: string;
}

function parseFractionString(input: string): number | null {
  const raw = input.trim().replace(/\s+/g, " ");
  if (!raw) return null;

  const unicodeFractions: Record<string, number> = {
    "⅛": 0.125,
    "¼": 0.25,
    "⅓": 0.333,
    "⅜": 0.375,
    "½": 0.5,
    "⅝": 0.625,
    "⅔": 0.667,
    "¾": 0.75,
    "⅞": 0.875,
  };

  if (unicodeFractions[raw] !== undefined) return unicodeFractions[raw];

  const simpleFraction = raw.match(/^(\d+)\s*\/\s*(\d+)$/);
  if (simpleFraction) {
    const numerator = parseInt(simpleFraction[1], 10);
    const denominator = parseInt(simpleFraction[2], 10);
    if (denominator === 0) return null;
    return numerator / denominator;
  }

  const mixedFraction = raw.match(/^(\d+)\s+(\d+)\s*\/\s*(\d+)$/);
  if (mixedFraction) {
    const whole = parseInt(mixedFraction[1], 10);
    const numerator = parseInt(mixedFraction[2], 10);
    const denominator = parseInt(mixedFraction[3], 10);
    if (denominator === 0) return null;
    return whole + numerator / denominator;
  }

  const numeric = Number(raw);
  return Number.isFinite(numeric) ? numeric : null;
}

export default function ProTips({ tips, ingredientName, weightG, fractionText }: ProTipsProps) {
  if (tips.length === 0) return null;

  const cups = parseFractionString(fractionText);
  const unitLabel = cups !== null && cups > 1 ? "cups" : "cup";
  const measured = cups !== null ? `${fractionText} ${unitLabel}` : "the measured cup amount";
  const weightTip = `${weightG}g of ${ingredientName.toLowerCase()} is about ${measured} using Spoon & Level. For consistency, stick to one measuring method across the whole recipe.`;

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
        How to Measure {ingredientName} Correctly
      </h2>
      <div className="space-y-4">
        {tips.map((tip, index) => (
          <div key={index} className="callout-tip">
            <div className="flex gap-3">
              <span className="text-xl flex-shrink-0 mt-0.5">{"\ud83d\udca1"}</span>
              <p className="text-slate-700 text-sm leading-relaxed">{tip}</p>
            </div>
          </div>
        ))}
        <div className="callout-tip">
          <div className="flex gap-3">
            <span className="text-xl flex-shrink-0 mt-0.5">{"\ud83d\udca1"}</span>
            <p className="text-slate-700 text-sm leading-relaxed">{weightTip}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
