'use client';

import { useMemo, useState } from 'react';
import type { ToolPageKind } from '@/lib/tool-pages';

type ToolCalculatorProps = {
  kind: ToolPageKind;
};

function numberValue(value: string, fallback: number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function format(value: number, decimals = 2): string {
  const rounded = Number(value.toFixed(decimals));
  return Number.isInteger(rounded) ? String(rounded) : String(rounded);
}

export default function ToolCalculator({ kind }: ToolCalculatorProps) {
  const [amount, setAmount] = useState('1');
  const [eggs, setEggs] = useState('1');
  const [butter, setButter] = useState('1');
  const [oldSize, setOldSize] = useState('8');
  const [newSize, setNewSize] = useState('9');
  const [flour, setFlour] = useState('500');
  const [water, setWater] = useState('350');
  const [originalServings, setOriginalServings] = useState('8');
  const [newServings, setNewServings] = useState('12');
  const [cakeSize, setCakeSize] = useState('8');

  const result = useMemo(() => {
    if (kind === 'buttermilk') {
      const cups = numberValue(amount, 1);
      return {
        primary: `${format(cups * 3, 2)} tsp acid`,
        secondary: `Add milk to the ${format(cups, 2)} cup line and rest 5-10 minutes.`,
      };
    }
    if (kind === 'egg-brownies') {
      const count = numberValue(eggs, 1);
      return {
        primary: `${format(count * 0.25, 2)} cup applesauce or yogurt`,
        secondary: `For flax: ${format(count, 0)} tbsp ground flax + ${format(count * 3, 0)} tbsp water.`,
      };
    }
    if (kind === 'butter-oil') {
      const cups = numberValue(butter, 1);
      return {
        primary: `${format(cups * 0.75, 2)} cup oil`,
        secondary: `Reverse estimate: ${format(cups / 0.75, 2)} cups melted butter for ${format(cups, 2)} cup oil.`,
      };
    }
    if (kind === 'pan-size') {
      const oldDiameter = numberValue(oldSize, 8);
      const newDiameter = numberValue(newSize, 9);
      const multiplier = (newDiameter * newDiameter) / (oldDiameter * oldDiameter);
      return {
        primary: `${format(multiplier, 2)}x batter`,
        secondary: multiplier > 1 ? 'Larger pan: cake will be thinner unless you scale up.' : 'Smaller pan: batter will be deeper; check doneness carefully.',
      };
    }
    if (kind === 'sourdough') {
      const flourG = numberValue(flour, 500);
      const waterG = numberValue(water, 350);
      return {
        primary: `${format((waterG / flourG) * 100, 1)}% hydration`,
        secondary: `${format(waterG, 0)}g water divided by ${format(flourG, 0)}g flour.`,
      };
    }
    if (kind === 'cake-serving') {
      const size = numberValue(cakeSize, 8);
      const party = Math.round(size * size * 0.18);
      const wedding = Math.round(size * size * 0.31);
      return {
        primary: `${party}-${party + 3} party servings`,
        secondary: `About ${wedding}-${wedding + 3} wedding-style servings for a tall round cake.`,
      };
    }
    const original = numberValue(originalServings, 8);
    const desired = numberValue(newServings, 12);
    const multiplier = desired / original;
    return {
      primary: `${format(multiplier, 2)}x multiplier`,
      secondary: `Multiply every ingredient by ${format(multiplier, 2)}. Watch eggs, salt, spices, and pan size.`,
    };
  }, [amount, butter, cakeSize, eggs, flour, kind, newServings, newSize, oldSize, originalServings, water]);

  return (
    <div className="rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="bg-slate-900 text-white px-5 py-4">
        <p className="text-sm uppercase tracking-wide text-amber-200">Interactive calculator</p>
        <p className="text-xl font-semibold mt-1">{result.primary}</p>
        <p className="text-sm text-slate-300 mt-1">{result.secondary}</p>
      </div>

      <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {kind === 'buttermilk' && (
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Cups of buttermilk needed</span>
            <input className="mt-2 w-full rounded border border-slate-300 px-3 py-2" value={amount} onChange={(event) => setAmount(event.target.value)} />
          </label>
        )}
        {kind === 'egg-brownies' && (
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Eggs to replace</span>
            <input className="mt-2 w-full rounded border border-slate-300 px-3 py-2" value={eggs} onChange={(event) => setEggs(event.target.value)} />
          </label>
        )}
        {kind === 'butter-oil' && (
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Cups of butter or oil</span>
            <input className="mt-2 w-full rounded border border-slate-300 px-3 py-2" value={butter} onChange={(event) => setButter(event.target.value)} />
          </label>
        )}
        {kind === 'pan-size' && (
          <>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Original round pan, inches</span>
              <input className="mt-2 w-full rounded border border-slate-300 px-3 py-2" value={oldSize} onChange={(event) => setOldSize(event.target.value)} />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">New round pan, inches</span>
              <input className="mt-2 w-full rounded border border-slate-300 px-3 py-2" value={newSize} onChange={(event) => setNewSize(event.target.value)} />
            </label>
          </>
        )}
        {kind === 'sourdough' && (
          <>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Flour, grams</span>
              <input className="mt-2 w-full rounded border border-slate-300 px-3 py-2" value={flour} onChange={(event) => setFlour(event.target.value)} />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Water, grams</span>
              <input className="mt-2 w-full rounded border border-slate-300 px-3 py-2" value={water} onChange={(event) => setWater(event.target.value)} />
            </label>
          </>
        )}
        {kind === 'recipe-scaler' && (
          <>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Original servings</span>
              <input className="mt-2 w-full rounded border border-slate-300 px-3 py-2" value={originalServings} onChange={(event) => setOriginalServings(event.target.value)} />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Desired servings</span>
              <input className="mt-2 w-full rounded border border-slate-300 px-3 py-2" value={newServings} onChange={(event) => setNewServings(event.target.value)} />
            </label>
          </>
        )}
        {kind === 'cake-serving' && (
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Round cake size, inches</span>
            <input className="mt-2 w-full rounded border border-slate-300 px-3 py-2" value={cakeSize} onChange={(event) => setCakeSize(event.target.value)} />
          </label>
        )}
      </div>
    </div>
  );
}
