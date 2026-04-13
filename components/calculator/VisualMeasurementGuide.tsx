export interface VisualMeasurementGuideProps {
  ingredientId: string;
  ingredientName: string;
  ingredientDensity: number;
  weightG: number;
  photoAvailable: boolean;
  showTitle?: boolean;
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

// Small cup component for the visual guide
function SmallCup({ fillPercent, clipId }: { fillPercent: number; clipId: string }) {
  return (
    <svg viewBox="0 0 100 140" className="w-8 h-12 mr-1">
      <defs>
        <clipPath id={clipId}>
          <path d="M15,10 L85,10 L75,130 L25,130 Z" />
        </clipPath>
      </defs>
      {/* Cup outline */}
      <path d="M15,10 L85,10 L75,130 L25,130 Z" fill="none" stroke="#94A3B8" strokeWidth="2" />
      {/* Fill rect */}
      {fillPercent > 0 && (
        <rect
          x="0"
          y={140 - (130 * fillPercent) / 100}
          width="100"
          height={(130 * fillPercent) / 100}
          fill="#F97316"
          fillOpacity="0.6"
          clipPath={`url(#${clipId})`}
        />
      )}
    </svg>
  );
}

function CupVisualization({ cups, baseClipId }: { cups: number; baseClipId: string }) {
  const wholeCups = Math.floor(cups);
  const fractionalPart = cups % 1;
  const needsPartialCup = fractionalPart > 0.01;
  
  // Limit display to max 4 cups to avoid overflow, show "+" if more
  const displayWhole = Math.min(wholeCups, 4);
  const hasOverflow = wholeCups >= 4;

  return (
    <div className="flex items-end justify-center mb-2 h-14">
      {Array.from({ length: displayWhole }).map((_, i) => (
        <SmallCup key={`full-${i}`} fillPercent={100} clipId={`${baseClipId}-full-${i}`} />
      ))}
      {hasOverflow && (
        <span className="text-xs font-bold text-accent mr-1 self-center">+</span>
      )}
      {needsPartialCup && (
        <SmallCup fillPercent={fractionalPart * 100} clipId={`${baseClipId}-partial`} />
      )}
    </div>
  );
}

export default function VisualMeasurementGuide({
  ingredientName,
  ingredientDensity,
  weightG,
  photoAvailable,
  showTitle = true,
}: VisualMeasurementGuideProps) {
  const methods = [
    {
      label: "Spoon & Level",
      modifier: 1.0,
      badge: "✅ Recommended",
      badgeClass: "text-green-600 bg-green-50",
      cupClass: "border-green-300 ring-2 ring-green-200",
    },
    {
      label: "Dip & Sweep",
      modifier: 1.18,
      badge: "⚠️ Heavy +18%",
      badgeClass: "text-amber-600 bg-amber-50",
      cupClass: "border-slate-300",
    },
    {
      label: "Sifted",
      modifier: 0.85,
      badge: "🪶 Light -15%",
      badgeClass: "text-blue-600 bg-blue-50",
      cupClass: "border-slate-300",
    },
  ];

  const title = `How to Measure ${weightG}g of ${ingredientName} - 3 Methods Compared`;

  if (photoAvailable) {
    return (
      <div>
        {showTitle && (
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
            {title}
          </h2>
        )}
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
      {showTitle && (
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
          {title}
        </h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {methods.map((m) => {
          const cups = weightG / (ingredientDensity * 236.588 * m.modifier);
          const gPerCup = Math.round(ingredientDensity * 236.588 * m.modifier);
          const safeLabel = m.label.replace(/[\s&]/g, "");

          return (
            <div key={m.label} className={`card p-5 text-center ${m.cupClass}`}>
              {/* Visualization with multiple cups */}
              <CupVisualization cups={cups} baseClipId={`vmg-${safeLabel}`} />
              
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
