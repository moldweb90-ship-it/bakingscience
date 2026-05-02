import { US_CUP_ML, US_FL_OZ_ML, US_TABLESPOON_ML, US_TEASPOON_ML } from "./constants";

export const CUP_UNIT_VALUES = [
  0.125, 0.25, 0.333, 0.5, 0.667, 0.75, 1, 1.25, 1.333, 1.5, 1.75, 2, 2.5, 3, 4, 5, 6, 8,
];

export const TEASPOON_VALUES = [1, 2, 3, 4, 6, 8, 12, 16, 24, 32, 48, 96];

export const TABLESPOON_VALUES = [1, 2, 3, 4, 5, 8, 12, 16, 24, 32];

export const ML_VALUES = [40, 50, 80, 100, 120, 125, 150, 200, 225, 240, 250, 300, 500];

export const OUNCE_VALUES = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16];

export const ML_REFERENCE_INGREDIENTS = [
  { id: "water", name: "water", density: 1, note: "1 ml water is 1 gram at kitchen precision." },
  { id: "whole-milk", name: "whole milk", density: 1.03, note: "Milk is slightly denser than water." },
  { id: "all-purpose-flour", name: "all-purpose flour", density: 0.529, note: "Spoon & Level flour; scooping can be heavier." },
  { id: "granulated-sugar", name: "granulated sugar", density: 0.845, note: "Granulated sugar is much denser than flour." },
  { id: "butter", name: "butter", density: 0.959, note: "Solid butter, before melting." },
  { id: "rice", name: "cooked white rice", density: 0.668, note: "Fluffed cooked rice; packing changes the weight." },
  { id: "honey", name: "honey", density: 1.42, note: "Honey is denser than water and milk." },
];

export function cupsToTeaspoons(cups: number): number {
  return cups * 48;
}

export function teaspoonsToCups(teaspoons: number): number {
  return teaspoons / 48;
}

export function cupsToTablespoons(cups: number): number {
  return cups * 16;
}

export function tablespoonsToCups(tablespoons: number): number {
  return tablespoons / 16;
}

export function mlToGrams(ml: number, density: number): number {
  return ml * density;
}

export function gramsToMl(grams: number, density: number): number {
  return grams / density;
}

export function ouncesToGrams(ounces: number): number {
  return ounces * 28.3495;
}

export function gramsToOunces(grams: number): number {
  return grams / 28.3495;
}

export function fluidOuncesToMl(fluidOunces: number): number {
  return fluidOunces * US_FL_OZ_ML;
}

export function formatNumber(value: number, decimals = 2): string {
  const rounded = Number(value.toFixed(decimals));
  return Number.isInteger(rounded) ? String(rounded) : String(rounded);
}

export function formatCupAmount(cups: number): string {
  const whole = Math.floor(cups);
  const remainder = cups - whole;
  const fractions = [
    { value: 0.125, label: "1/8" },
    { value: 0.25, label: "1/4" },
    { value: 0.333, label: "1/3" },
    { value: 0.5, label: "1/2" },
    { value: 0.667, label: "2/3" },
    { value: 0.75, label: "3/4" },
  ];

  if (remainder < 0.01) return `${whole}`;
  const closest = fractions.reduce((best, item) =>
    Math.abs(item.value - remainder) < Math.abs(best.value - remainder) ? item : best,
  );
  return whole === 0 ? closest.label : `${whole} ${closest.label}`;
}

export function cupWord(cups: number): string {
  return cups <= 1 ? "cup" : "cups";
}

export function buildCupUnitSlug(cups: number, target: "teaspoons" | "tablespoons"): string {
  return `${formatCupAmount(cups).replace(" ", "-").replace("/", "-")}-${cupWord(cups)}-to-${target}`;
}

export function parseCupUnitSlug(slug: string, target: "teaspoons" | "tablespoons"): number | null {
  const suffix = `-${target}`;
  if (!slug.endsWith(suffix)) return null;
  const cupPart = slug.slice(0, -suffix.length).replace(/-cups?-to$/, "");
  const parts = cupPart.split("-");
  if (parts.length === 1) return Number(parts[0]);
  if (parts.length === 2) return Number(parts[0]) / Number(parts[1]);
  if (parts.length === 3) return Number(parts[0]) + Number(parts[1]) / Number(parts[2]);
  return null;
}

export function buildSimpleUnitSlug(value: number, from: string, to: string): string {
  return `${formatNumber(value, 3).replace(".", "-")}-${from}-to-${to}`;
}

export function parseSimpleUnitSlug(slug: string, from: string, to: string): number | null {
  const match = slug.match(new RegExp(`^(\\d+(?:-\\d+)?)-${from}-to-${to}$`, "i"));
  if (!match) return null;
  const value = Number(match[1].replace("-", "."));
  return Number.isFinite(value) && value > 0 ? value : null;
}

export const UNIT_FACTS = {
  cupMl: US_CUP_ML,
  tablespoonMl: US_TABLESPOON_ML,
  teaspoonMl: US_TEASPOON_ML,
  flOzMl: US_FL_OZ_ML,
};
