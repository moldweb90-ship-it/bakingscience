export const GENERIC_GRAM_WEIGHTS = [
  15, 25, 28, 30, 35, 40, 50, 60, 70, 75, 80, 85, 90, 100, 110, 120, 125, 130, 140, 150,
  160, 170, 175, 180, 200, 225, 240, 250, 270, 280, 300, 340, 350, 400, 450, 500, 600,
  700, 750, 800, 1000,
];

export const GENERIC_CUP_VALUES = [
  0.125, 0.25, 0.333, 0.5, 0.667, 0.75, 1, 1.25, 1.333, 1.5, 1.75, 2, 2.25, 2.5, 3, 4, 5,
];

export const GENERIC_INGREDIENT_IDS = [
  "all-purpose-flour",
  "granulated-sugar",
  "brown-sugar",
  "powdered-sugar",
  "butter",
  "bread-flour",
  "cake-flour",
  "whole-wheat-flour",
  "almond-flour",
  "cocoa-powder",
  "rolled-oats",
  "whole-milk",
  "heavy-cream",
  "honey",
  "olive-oil",
];

export function formatCupAmount(cups: number): string {
  const whole = Math.floor(cups);
  const remainder = cups - whole;
  const fractions: Array<{ value: number; label: string }> = [
    { value: 0.125, label: "1/8" },
    { value: 0.25, label: "1/4" },
    { value: 0.333, label: "1/3" },
    { value: 0.5, label: "1/2" },
    { value: 0.667, label: "2/3" },
    { value: 0.75, label: "3/4" },
  ];

  if (remainder < 0.01) return `${whole}`;

  let closest = fractions[0];
  let minDiff = Infinity;
  for (const fraction of fractions) {
    const diff = Math.abs(remainder - fraction.value);
    if (diff < minDiff) {
      minDiff = diff;
      closest = fraction;
    }
  }

  return whole === 0 ? closest.label : `${whole} ${closest.label}`;
}

export function cupWord(cups: number): string {
  return cups > 1 ? "cups" : "cup";
}
