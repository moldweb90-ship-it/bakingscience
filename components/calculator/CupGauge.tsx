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

function CupSVG({ fillPercent }: { fillPercent: number }) {
  return (
    <svg viewBox="0 0 100 140" className="w-full h-full">
      <defs>
        <clipPath id="cup-clip">
          <path d="M15,10 L85,10 L75,130 L25,130 Z" />
        </clipPath>
      </defs>
      <path d="M15,10 L85,10 L75,130 L25,130 Z" fill="none" stroke="#94A3B8" strokeWidth="2" />
      <rect
        x="0"
        y={140 - (130 * fillPercent) / 100}
        width="100"
        height={(130 * fillPercent) / 100}
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
  );
}

export default function CupGauge({ cups, maxCups = 2, animated = true }: CupGaugeProps) {
  const [fillHeight, setFillHeight] = useState(0);

  const wholeCups = Math.floor(cups);
  const fractionalPart = cups - wholeCups;
  const lastCupPercent = Math.min(fractionalPart * 100, 100);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => setFillHeight(lastCupPercent), 100);
      return () => clearTimeout(timer);
    } else {
      setFillHeight(lastCupPercent);
    }
  }, [lastCupPercent, animated]);

  const fraction = decimalToFraction(cups);
  const unitLabel = cups > 1 ? "cups" : "cup";

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-end gap-2 sm:gap-3">
        {/* Full cups */}
        {Array.from({ length: Math.min(wholeCups, 3) }).map((_, i) => (
          <div key={`full-${i}`} className="relative w-[50px] h-[75px] sm:w-[65px] sm:h-[95px]">
            <svg viewBox="0 0 100 140" className="w-full h-full">
              <defs>
                <clipPath id={`cup-clip-full-${i}`}>
                  <path d="M15,10 L85,10 L75,130 L25,130 Z" />
                </clipPath>
              </defs>
              <path d="M15,10 L85,10 L75,130 L25,130 Z" fill="none" stroke="#94A3B8" strokeWidth="2" />
              <rect
                x="0"
                y="10"
                width="100"
                height="120"
                fill="#F97316"
                fillOpacity="0.5"
                clipPath={`url(#cup-clip-full-${i})`}
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
        ))}

        {/* Partial cup (or the only cup if < 1) */}
        {wholeCups < 3 && (
          <div className="relative w-[50px] h-[75px] sm:w-[65px] sm:h-[95px]">
            <svg viewBox="0 0 100 140" className="w-full h-full">
              <defs>
                <clipPath id="cup-clip-partial">
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
                clipPath="url(#cup-clip-partial)"
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
        )}

        {/* Overflow indicator for > 3 cups */}
        {wholeCups >= 3 && (
          <div className="flex items-center justify-center w-[50px] h-[75px] sm:w-[65px] sm:h-[95px] text-sm font-bold text-accent">
            +{wholeCups - 2}
          </div>
        )}
      </div>

      <p className="text-sm text-slate-600 mt-2 font-medium">
        &asymp; {fraction} {unitLabel}
      </p>
    </div>
  );
}
