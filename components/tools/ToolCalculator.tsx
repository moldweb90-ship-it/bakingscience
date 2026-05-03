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
  const [acid, setAcid] = useState('lemon juice');
  const [eggStyle, setEggStyle] = useState('fudgy');
  const [oilType, setOilType] = useState('neutral oil');
  const [panShape, setPanShape] = useState('round');
  const [servingStyle, setServingStyle] = useState('party');

  const result = useMemo(() => {
    if (kind === 'buttermilk') {
      const cups = numberValue(amount, 1);
      return {
        primary: `${format(cups * 3, 2)} tsp ${acid}`,
        secondary: `Add ${acid} first, pour milk to the ${format(cups, 2)} cup line, and rest 5-10 minutes.`,
      };
    }
    if (kind === 'egg-brownies') {
      const count = numberValue(eggs, 1);
      const choice =
        eggStyle === 'vegan'
          ? `${format(count, 0)} flax egg${count === 1 ? '' : 's'}`
          : eggStyle === 'cakey'
            ? `${format(count * 0.25, 2)} cup yogurt`
            : `${format(count * 0.25, 2)} cup unsweetened applesauce`;
      return {
        primary: choice,
        secondary: eggStyle === 'vegan' ? `Mix ${format(count, 0)} tbsp ground flax + ${format(count * 3, 0)} tbsp water and rest 5 minutes.` : 'Cool the brownies fully before judging the set.',
      };
    }
    if (kind === 'butter-oil') {
      const cups = numberValue(butter, 1);
      return {
        primary: `${format(cups * 0.75, 2)} cup ${oilType}`,
        secondary: `Best for pourable batters. Reverse estimate: ${format(cups / 0.75, 2)} cups melted butter for ${format(cups, 2)} cup oil.`,
      };
    }
    if (kind === 'pan-size') {
      const oldDiameter = numberValue(oldSize, 8);
      const newDiameter = numberValue(newSize, 9);
      const areaFactor = panShape === 'round' ? 1 : 1.27;
      const multiplier = ((newDiameter * newDiameter) / (oldDiameter * oldDiameter)) * areaFactor;
      return {
        primary: `${format(multiplier, 2)}x batter`,
        secondary: `${panShape === 'round' ? 'Round pan estimate' : 'Square/rectangle estimate'}: ${multiplier > 1 ? 'scale up or expect thinner batter.' : 'scale down or expect deeper batter.'}`,
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
        primary: servingStyle === 'wedding' ? `${wedding}-${wedding + 3} wedding servings` : `${party}-${party + 3} party servings`,
        secondary: servingStyle === 'wedding' ? 'Narrow event slices assume a taller cake and clean cutting guide.' : 'Casual party slices are wider, so the same cake serves fewer people.',
      };
    }
    const original = numberValue(originalServings, 8);
    const desired = numberValue(newServings, 12);
    const multiplier = desired / original;
    return {
      primary: `${format(multiplier, 2)}x multiplier`,
      secondary: `Multiply every ingredient by ${format(multiplier, 2)}. Watch eggs, salt, spices, and pan size.`,
    };
  }, [acid, amount, butter, cakeSize, eggStyle, eggs, flour, kind, newServings, newSize, oilType, oldSize, originalServings, panShape, servingStyle, water]);

  return (
    <div className="rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="bg-slate-900 text-white px-5 py-5">
          <p className="text-sm uppercase tracking-wide text-amber-200">Interactive calculator</p>
          <p className="text-2xl font-semibold mt-2">{result.primary}</p>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">{result.secondary}</p>
        </div>
        <div className="bg-amber-50 px-5 py-5 border-t lg:border-t-0 lg:border-l border-amber-100">
          <p className="text-sm font-semibold text-slate-900">How to use it</p>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            Change the amount below and use the result as a kitchen starting point. For cakes and bread,
            texture still depends on flour, pan depth, and bake time.
          </p>
        </div>
      </div>

      <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {kind === 'buttermilk' && (
          <>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Cups of buttermilk needed</span>
              <input className="mt-2 w-full rounded border border-slate-300 px-3 py-2 text-base" inputMode="decimal" value={amount} onChange={(event) => setAmount(event.target.value)} />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Acid</span>
              <select className="mt-2 w-full rounded border border-slate-300 px-3 py-2 text-base" value={acid} onChange={(event) => setAcid(event.target.value)}>
                <option>lemon juice</option>
                <option>white vinegar</option>
                <option>apple cider vinegar</option>
              </select>
            </label>
          </>
        )}
        {kind === 'egg-brownies' && (
          <>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Eggs to replace</span>
              <input className="mt-2 w-full rounded border border-slate-300 px-3 py-2 text-base" inputMode="decimal" value={eggs} onChange={(event) => setEggs(event.target.value)} />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Target texture</span>
              <select className="mt-2 w-full rounded border border-slate-300 px-3 py-2 text-base" value={eggStyle} onChange={(event) => setEggStyle(event.target.value)}>
                <option value="fudgy">Fudgy</option>
                <option value="cakey">Slightly cakey</option>
                <option value="vegan">Vegan binder</option>
              </select>
            </label>
          </>
        )}
        {kind === 'butter-oil' && (
          <>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Cups of butter</span>
              <input className="mt-2 w-full rounded border border-slate-300 px-3 py-2 text-base" inputMode="decimal" value={butter} onChange={(event) => setButter(event.target.value)} />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Oil style</span>
              <select className="mt-2 w-full rounded border border-slate-300 px-3 py-2 text-base" value={oilType} onChange={(event) => setOilType(event.target.value)}>
                <option>neutral oil</option>
                <option>vegetable oil</option>
                <option>canola oil</option>
                <option>olive oil</option>
              </select>
            </label>
          </>
        )}
        {kind === 'pan-size' && (
          <>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Original round pan, inches</span>
              <input className="mt-2 w-full rounded border border-slate-300 px-3 py-2 text-base" inputMode="decimal" value={oldSize} onChange={(event) => setOldSize(event.target.value)} />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">New round pan, inches</span>
              <input className="mt-2 w-full rounded border border-slate-300 px-3 py-2 text-base" inputMode="decimal" value={newSize} onChange={(event) => setNewSize(event.target.value)} />
            </label>
            <label className="block sm:col-span-2">
              <span className="text-sm font-medium text-slate-700">New pan shape</span>
              <select className="mt-2 w-full rounded border border-slate-300 px-3 py-2 text-base" value={panShape} onChange={(event) => setPanShape(event.target.value)}>
                <option value="round">Round pan</option>
                <option value="square">Square or rectangle estimate</option>
              </select>
            </label>
          </>
        )}
        {kind === 'sourdough' && (
          <>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Flour, grams</span>
              <input className="mt-2 w-full rounded border border-slate-300 px-3 py-2 text-base" inputMode="decimal" value={flour} onChange={(event) => setFlour(event.target.value)} />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Water, grams</span>
              <input className="mt-2 w-full rounded border border-slate-300 px-3 py-2 text-base" inputMode="decimal" value={water} onChange={(event) => setWater(event.target.value)} />
            </label>
          </>
        )}
        {kind === 'recipe-scaler' && (
          <>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Original servings</span>
              <input className="mt-2 w-full rounded border border-slate-300 px-3 py-2 text-base" inputMode="decimal" value={originalServings} onChange={(event) => setOriginalServings(event.target.value)} />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Desired servings</span>
              <input className="mt-2 w-full rounded border border-slate-300 px-3 py-2 text-base" inputMode="decimal" value={newServings} onChange={(event) => setNewServings(event.target.value)} />
            </label>
          </>
        )}
        {kind === 'cake-serving' && (
          <>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Round cake size, inches</span>
              <input className="mt-2 w-full rounded border border-slate-300 px-3 py-2 text-base" inputMode="decimal" value={cakeSize} onChange={(event) => setCakeSize(event.target.value)} />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Serving style</span>
              <select className="mt-2 w-full rounded border border-slate-300 px-3 py-2 text-base" value={servingStyle} onChange={(event) => setServingStyle(event.target.value)}>
                <option value="party">Party slices</option>
                <option value="wedding">Wedding slices</option>
              </select>
            </label>
          </>
        )}
      </div>
    </div>
  );
}
