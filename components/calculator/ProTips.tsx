export interface ProTipsProps {
  tips: string[];
  ingredientName: string;
  weightG: number;
  fractionText: string;
}

function decimalToFraction(cups: number): string {
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
    [1.0, ""],
  ];

  const base = Math.floor(cups);
  const remainder = cups - base;

  let bestLabel = "";
  let bestDiff = Infinity;
  let bestWhole = base;

  for (const [val, label] of fractions) {
    const diff = Math.abs(remainder - val);
    if (diff < bestDiff) {
      bestDiff = diff;
      bestLabel = label;
      if (val >= 1.0) bestWhole = base + 1;
    }
  }

  if (bestWhole === 0 && bestLabel) return bestLabel;
  if (bestWhole === 0) return cups.toFixed(2);
  if (!bestLabel) return `${bestWhole}`;
  return `${bestWhole}${bestLabel}`;
}

export default function ProTips({ tips, ingredientName, weightG, fractionText }: ProTipsProps) {
  if (tips.length === 0) return null;

  const cleanedTips = tips.map((tip) =>
    tip.replace(/\bAP flour\b/gi, ingredientName.toLowerCase())
  );

  const cups = parseFloat(fractionText);
  const whole = Math.floor(cups);
  const frac = decimalToFraction(cups);
  const fracOnly = frac.replace(/^\d+/, "");
  const cupWord = whole === 1 ? "cup" : "cups";

  const weightTip = `${weightG}g of ${ingredientName.toLowerCase()} is about ${frac} ${cupWord} - that's ${whole} full ${cupWord} plus ${fracOnly || "a full cup"} of another.`;

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
        How to Measure {ingredientName} Correctly
      </h2>
      <div className="space-y-4">
        {cleanedTips.map((tip, index) => (
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
