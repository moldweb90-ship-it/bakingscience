export const COMMON_CUP_VALUES = [
  0.125, 0.25, 0.333, 0.5, 0.667, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 3, 4,
];

export const REVERSE_ENABLED_INGREDIENTS = [
  "all-purpose-flour",
  "almond-flour",
  "bread-flour",
  "brown-sugar",
  "butter",
  "cake-flour",
  "cocoa-powder",
  "coconut-flour",
  "coconut-oil",
  "cornstarch",
  "granulated-sugar",
  "heavy-cream",
  "honey",
  "olive-oil",
  "powdered-sugar",
  "rolled-oats",
  "sour-cream",
  "vegetable-oil",
  "whole-milk",
  "whole-wheat-flour",
];

export function formatCupLabel(cups: number): string {
  const whole = Math.floor(cups);
  const remainder = cups - whole;
  const map: Array<{ value: number; label: string }> = [
    { value: 0.125, label: '1/8' },
    { value: 0.25, label: '1/4' },
    { value: 0.333, label: '1/3' },
    { value: 0.5, label: '1/2' },
    { value: 0.667, label: '2/3' },
    { value: 0.75, label: '3/4' },
  ];

  if (remainder < 0.01) return `${whole}`;

  let closest = map[0];
  let minDiff = Infinity;
  for (const item of map) {
    const diff = Math.abs(remainder - item.value);
    if (diff < minDiff) {
      minDiff = diff;
      closest = item;
    }
  }

  if (whole === 0) return closest.label;
  return `${whole} ${closest.label}`;
}

