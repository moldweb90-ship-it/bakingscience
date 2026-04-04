"use client";

import { useEffect, useState } from "react";

export interface CupGaugeProps {
  cups: number;
  maxCups?: number;
  animated?: boolean;
}

function decimalToFraction(cups: number): string {
  const whole = Math.floor(cups);
  const remainder = cups - whole;

  const fractions: [number, string][] = [
    [0, ""],
    [0.25, "\u00BC"],
    [0.33, "\u2153"],
    [0.5, "\u00BD"],
    [0.67, "\u2154"],
    [0.75, "\u00BE"],
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

export default function CupGauge({ cups, maxCups = 2, animated = true }: CupGaugeProps) {
  const [fillHeight, setFillHeight] = useState(0);
  const fillPercent = Math.min((cups / maxCups) * 100, 100);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => setFillHeight(fillPercent), 100);
      return () => clearTimeout(timer);
    } else {
      setFillHeight(fillPercent);
    }
  }, [fillPercent, animated]);

  const fraction = decimalToFraction(cups);

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[80px] h-[120px] sm:w-[100px] sm:h-[140px]">
        <svg viewBox="0 0 100 140" className="w-full h-full">
          <defs>
            <clipPath id="cup-clip">
              <path d="M15,10 L85,10 L75,130 L25,130 Z" />
            </clipPath>
          </defs>
          <path d="M15,10 L85,10 L75,130 L25,130 Z" fill="none" stroke="#94A3B8" strokeWidth="2" />
          <rect
            x="0"
            y={140 - (130 * fillHeight) / 100}
            width="100"
            height={(130 * fillHeight) / 100}
            fill="#F97316"
            fillOpacity="0.5"
            clipPath="url(#cup-clip)"
            style={{ transition: "all 0.5s ease" }}
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
      <p className="text-sm text-slate-600 mt-2 font-medium">
        &asymp; {fraction} cups
      </p>
    </div>
  );
}
