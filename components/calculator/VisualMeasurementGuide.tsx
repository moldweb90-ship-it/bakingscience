export interface VisualMeasurementGuideProps {
  ingredientId: string;
  ingredientName: string;
  ingredientDensity: number;
  weightG: number;
  photoAvailable: boolean;
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

export default function VisualMeasurementGuide({ ingredientName, ingredientDensity, weightG, photoAvailable }: VisualMeasurementGuideProps) {
  const methods = [
    {
      label: "Spoon & Level",
      modifier: 1.0,
      badge: "\u2705 Recommended",
      badgeClass: "text-green-600 bg-green-50",
      cupClass: "border-green-300 ring-2 ring-green-200",
    },
    {
      label: "Dip & Sweep",
      modifier: 1.18,
      badge: "\u26a0\ufe0f Heavy +18%",
      badgeClass: "text-amber-600 bg-amber-50",
      cupClass: "border-slate-300",
    },
    {
      label: "Sifted",
      modifier: 0.85,
      badge: "\ud83e\udeb6 Light -15%",
      badgeClass: "text-blue-600 bg-blue-50",
      cupClass: "border-slate-300",
    },
  ];

  if (photoAvailable) {
    return (
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
          How to Measure {weightG}g of {ingredientName} \u2014 3 Methods Compared
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {methods.map((m) => {
            const cups = weightG / (ingredientDensity * 236.588 * m.modifier);
            const gPerCup = Math.round(ingredientDensity * 236.588 * m.modifier);
            return (
              <div key={m.label} className={`card overflow-hidden ${m.cupClass}`}>
                <div className="bg-slate-100 h-48 flex items-center justify-center text-slate-400">
                  Photo: {m.label.toLowerCase().replace(/ & /g, "-")}.webp
                </div>
                <div className="p-3 text-center">
                  <p className="text-sm font-semibold text-slate-800">{decimalToFraction(cups)} cups</p>
                  <p className="text-xs text-slate-500">({gPerCup}g/cup)</p>
                  <p className={`text-xs font-medium mt-1 px-2 py-0.5 rounded-full inline-block ${m.badgeClass}`}>
                    {m.badge}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
        How to Measure {weightG}g of {ingredientName} \u2014 3 Methods Compared
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {methods.map((m) => {
          const cups = weightG / (ingredientDensity * 236.588 * m.modifier);
          const gPerCup = Math.round(ingredientDensity * 236.588 * m.modifier);
          const fillPercent = Math.min((cups / Math.max(cups, 1)) * 100, 100);
          const relativeFill = Math.min((cups / (weightG / (ingredientDensity * 236.588))) * 80, 95);

          return (
            <div key={m.label} className={`card p-5 text-center ${m.cupClass}`}>
              <div className="flex justify-center mb-3">
                <div className="relative w-16 h-20">
                  <svg viewBox="0 0 100 140" className="w-full h-full">
                    <defs>
                      <clipPath id={`vmg-clip-${m.label}`}>
                        <path d="M15,10 L85,10 L75,130 L25,130 Z" />
                      </clipPath>
                    </defs>
                    <path d="M15,10 L85,10 L75,130 L25,130 Z" fill="none" stroke="#94A3B8" strokeWidth="2" />
                    <rect
                      x="0"
                      y={140 - (130 * relativeFill) / 100}
                      width="100"
                      height={(130 * relativeFill) / 100}
                      fill="#F97316"
                      fillOpacity="0.5"
                      clipPath={`url(#vmg-clip-${m.label})`}
                    />
                    {[0.25, 0.5, 0.75, 1].map((mark) => (
                      <line
                        key={mark}
                        x1="20"
                        y1={130 - 120 * mark}
                        x2="80"
                        y2={130 - 120 * mark}
                        stroke="#CBD5E1"
                        strokeWidth="1"
                        strokeDasharray="4,4"
                      />
                    ))}
                  </svg>
                </div>
              </div>
              <p className="text-xs font-medium text-slate-700 mb-1">{m.label}</p>
              <p className="text-sm font-bold text-slate-900">{decimalToFraction(cups)} cups</p>
              <p className="text-xs text-slate-500">({gPerCup}g/cup)</p>
              <p className={`text-xs font-medium mt-2 px-2 py-0.5 rounded-full inline-block ${m.badgeClass}`}>
                {m.badge}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
