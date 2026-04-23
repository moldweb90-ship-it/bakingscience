"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Search, X, ArrowRight } from 'lucide-react';
import { buildCupToGramsUrl } from '@/lib/slug-utils';
import { REVERSE_ENABLED_INGREDIENTS } from '@/lib/cups-to-grams';

export interface SearchIngredient {
  id: string;
  name: string;
  category: string;
  common_weights_g: number[];
}

export interface SearchBarProps {
  ingredients: SearchIngredient[];
  initialMode?: SearchMode;
}

interface SearchResult {
  ingredient: SearchIngredient;
  weight: number | null;
  cups: number | null;
  score: number;
}

type SearchMode = 'grams_to_cups' | 'cups_to_grams';

function parseCupValue(raw: string): number | null {
  const normalized = raw.trim().toLowerCase();
  if (!normalized) return null;

  const simpleFraction = normalized.match(/^(\d+)\s*\/\s*(\d+)$/);
  if (simpleFraction) {
    const numerator = parseInt(simpleFraction[1], 10);
    const denominator = parseInt(simpleFraction[2], 10);
    if (denominator === 0) return null;
    return numerator / denominator;
  }

  const mixedFraction = normalized.match(/^(\d+)\s+(\d+)\s*\/\s*(\d+)$/);
  if (mixedFraction) {
    const whole = parseInt(mixedFraction[1], 10);
    const numerator = parseInt(mixedFraction[2], 10);
    const denominator = parseInt(mixedFraction[3], 10);
    if (denominator === 0) return null;
    return whole + numerator / denominator;
  }

  const asNumber = Number(normalized.replace(',', '.'));
  if (Number.isFinite(asNumber)) return asNumber;

  return null;
}

function parseQuery(query: string, mode: SearchMode): { weight: number | null; cups: number | null; terms: string[] } {
  const trimmed = query.trim();
  if (!trimmed) return { weight: null, cups: null, terms: [] };

  if (mode === 'grams_to_cups') {
    const weightMatch = trimmed.match(/^(\d+)\s*g?\s*(.*)/i);
    if (weightMatch) {
      const weight = parseInt(weightMatch[1], 10);
      const rest = weightMatch[2].trim();
      const terms = rest.length > 0 ? rest.toLowerCase().split(/\s+/) : [];
      return { weight: weight >= 1 && weight <= 1000 ? weight : null, cups: null, terms };
    }

    const terms = trimmed.toLowerCase().split(/\s+/);
    return { weight: null, cups: null, terms };
  }

  const cupMatch = trimmed.match(/^(\d+(?:[.,]\d+)?|\d+\s*\/\s*\d+|\d+\s+\d+\s*\/\s*\d+)\s*(cups?|c)?\s*(.*)$/i);
  if (cupMatch) {
    const cups = parseCupValue(cupMatch[1]);
    const rest = cupMatch[3].trim();
    const terms = rest
      .toLowerCase()
      .split(/\s+/)
      .filter((t) => t.length > 0 && !['cup', 'cups', 'gram', 'grams', 'to', 'in'].includes(t));
    const validCups = cups !== null && cups > 0 && cups <= 10 ? Math.round(cups * 1000) / 1000 : null;
    return { weight: null, cups: validCups, terms };
  }

  const terms = trimmed
    .toLowerCase()
    .split(/\s+/)
    .filter((t) => t.length > 0 && !['cup', 'cups', 'gram', 'grams', 'to', 'in'].includes(t));
  return { weight: null, cups: null, terms };
}

function scoreIngredient(ing: SearchIngredient, terms: string[]): number {
  if (terms.length === 0) return 0.5;

  let score = 0;
  const nameLower = ing.name.toLowerCase();
  const idLower = ing.id.toLowerCase();
  const categoryLower = ing.category.toLowerCase();

  for (const term of terms) {
    if (nameLower === term) { score += 10; continue; }
    if (idLower === term) { score += 10; continue; }
    if (nameLower.startsWith(term)) { score += 5; continue; }
    if (idLower.startsWith(term)) { score += 5; continue; }
    if (nameLower.includes(term)) { score += 3; continue; }
    if (idLower.includes(term)) { score += 3; continue; }
    if (categoryLower.includes(term)) { score += 2; continue; }
    const nameWords = nameLower.split(/[\s-]+/);
    if (nameWords.some((w) => w.startsWith(term))) { score += 2; continue; }
    if (nameWords.some((w) => w.includes(term))) { score += 1; continue; }
  }

  return score;
}

function searchIngredients(query: string, ingredients: SearchIngredient[], mode: SearchMode): SearchResult[] {
  const { weight, cups, terms } = parseQuery(query, mode);
  if (terms.length === 0 && weight === null && cups === null) return [];

  const sourceIngredients =
    mode === 'cups_to_grams'
      ? ingredients.filter((ing) => REVERSE_ENABLED_INGREDIENTS.includes(ing.id))
      : ingredients;

  const results: SearchResult[] = [];
  for (const ing of sourceIngredients) {
    const s = scoreIngredient(ing, terms);
    if (s > 0 || (terms.length === 0 && (weight !== null || cups !== null))) {
      results.push({ ingredient: ing, weight, cups, score: s || 0.5 });
    }
  }

  results.sort((a, b) => b.score - a.score);
  return results;
}

export default function SearchBar({ ingredients, initialMode = 'grams_to_cups' }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState<SearchMode>(initialMode);
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = searchIngredients(query, ingredients, mode);
  const conversionResults = results.filter((r) => mode === 'grams_to_cups' ? r.weight !== null : r.cups !== null);
  const hubResults = results.filter((r) => mode === 'grams_to_cups' ? r.weight === null : r.cups === null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleKeyDown(e: React.KeyboardEvent) {
    const allItems = [...conversionResults, ...hubResults];
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) => Math.min(prev + 1, allItems.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (allItems.length > 0) {
        const item = allItems[highlightedIndex >= 0 ? highlightedIndex : 0];
        if (mode === 'grams_to_cups') {
          if (item.weight) {
            window.location.href = `/${item.ingredient.id}/${item.weight}-grams-to-cups/`;
          } else {
            window.location.href = `/${item.ingredient.id}/`;
          }
        } else {
          if (item.cups) {
            window.location.href = buildCupToGramsUrl(item.ingredient.id, item.cups);
          } else {
            window.location.href = `/${item.ingredient.id}/cups-to-grams/`;
          }
        }
      }
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  }

  function clearSearch() {
    setQuery('');
    setOpen(false);
    setHighlightedIndex(-1);
    inputRef.current?.focus();
  }

  const categoryEmojis: Record<string, string> = {
    flour: '🌾',
    sugar: '🍬',
    fat: '🧈',
    dairy: '🥛',
    other: '🧃',
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div className="mb-3">
        <p className="text-sm font-medium text-slate-700 mb-2 text-left">Conversion direction</p>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/"
            onClick={() => {
              setMode('grams_to_cups');
              setQuery('');
              setOpen(false);
              setHighlightedIndex(-1);
            }}
            className={`tab-button ${mode === 'grams_to_cups' ? 'tab-button-active' : ''}`}
          >
            Grams -&gt; Cups
          </Link>
          <Link
            href="/cups-to-grams/"
            onClick={() => {
              setMode('cups_to_grams');
              setQuery('');
              setOpen(false);
              setHighlightedIndex(-1);
            }}
            className={`tab-button ${mode === 'cups_to_grams' ? 'tab-button-active' : ''}`}
          >
            Cups -&gt; Grams
          </Link>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setHighlightedIndex(-1);
          }}
          onFocus={() => query.length > 0 && setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={
            mode === 'grams_to_cups'
              ? 'Try: "150g flour", "150 sugar", "butter", "cake flour"'
              : 'Try: "1 cup flour", "1/2 sugar", "1.5 butter", "cake flour"'
          }
          className="input-field w-full pl-12 pr-10 text-base"
          role="combobox"
          aria-expanded={open && results.length > 0}
          aria-autocomplete="list"
          aria-haspopup="listbox"
          aria-label="Search ingredients"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {open && results.length > 0 && (
        <ul
          className="absolute z-50 mt-1 w-full bg-warm-white border border-slate-200 rounded-card shadow-card-hover max-h-72 overflow-y-auto"
          role="listbox"
        >
          {conversionResults.map((r, i) => {
            const globalIndex = i;
            return (
              <li
                key={`conv-${r.ingredient.id}`}
                role="option"
                aria-selected={globalIndex === highlightedIndex}
                className={`transition-colors min-h-[44px] ${
                  globalIndex === highlightedIndex
                    ? 'bg-accent-light text-accent-hover'
                    : 'hover:bg-slate-50'
                }`}
                onMouseEnter={() => setHighlightedIndex(globalIndex)}
              >
                <Link
                  href={
                    mode === 'grams_to_cups'
                      ? `/${r.ingredient.id}/${r.weight}-grams-to-cups/`
                      : buildCupToGramsUrl(r.ingredient.id, r.cups || 1)
                  }
                  className="flex items-center gap-3 px-4 py-3"
                  onClick={() => { setOpen(false); setQuery(''); }}
                >
                  <ArrowRight size={16} className="text-accent flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="font-semibold text-slate-800 text-sm">
                      {mode === 'grams_to_cups'
                        ? `${r.weight}g ${r.ingredient.name}`
                        : `${r.cups} cup${r.cups === 1 ? '' : 's'} ${r.ingredient.name}`}
                    </span>
                    <span className="block text-xs text-slate-500">
                      {mode === 'grams_to_cups' ? 'Direct conversion ->' : 'Direct conversion ->'}
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}

          {hubResults.map((r, i) => {
            const globalIndex = conversionResults.length + i;
            return (
              <li
                key={`hub-${r.ingredient.id}`}
                role="option"
                aria-selected={globalIndex === highlightedIndex}
                className={`transition-colors min-h-[44px] ${
                  globalIndex === highlightedIndex
                    ? 'bg-accent-light text-accent-hover'
                    : 'hover:bg-slate-50'
                }`}
                onMouseEnter={() => setHighlightedIndex(globalIndex)}
              >
                <Link
                  href={mode === 'grams_to_cups' ? `/${r.ingredient.id}/` : `/${r.ingredient.id}/cups-to-grams/`}
                  className="flex items-center gap-3 px-4 py-3"
                  onClick={() => { setOpen(false); setQuery(''); }}
                >
                  <span className="text-xl flex-shrink-0">
                    {categoryEmojis[r.ingredient.category] || '🧃'}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="font-medium text-slate-800 text-sm">{r.ingredient.name}</span>
                    <span className="block text-xs text-slate-500 capitalize">
                      {r.ingredient.category} &middot; {r.ingredient.common_weights_g.length} conversions
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}

      {open && query.length > 0 && results.length === 0 && (
        <div className="absolute z-50 mt-1 w-full bg-warm-white border border-slate-200 rounded-card shadow-card p-4 text-center">
          <p className="text-sm text-slate-500">
            No results for &quot;{query}&quot;
          </p>
          <p className="text-xs text-slate-400 mt-1">
            {mode === 'grams_to_cups'
              ? 'Try: "150g flour", "150 sugar", "butter"'
              : 'Try: "1 cup flour", "1/2 sugar", "cake flour"'}
          </p>
        </div>
      )}
    </div>
  );
}
