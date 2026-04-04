'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Search, X, ArrowRight } from 'lucide-react';
import type { Ingredient } from '@/lib/converter';

export interface SearchBarProps {
  ingredients: Ingredient[];
}

interface SearchResult {
  ingredient: Ingredient;
  weight: number | null;
  score: number;
}

function parseQuery(query: string): { weight: number | null; terms: string[] } {
  const trimmed = query.trim();

  // Try to extract weight: "150g flour", "150 g flour", "150 flour"
  const weightMatch = trimmed.match(/^(\d+)\s*g?\s*(.*)/i);
  if (weightMatch) {
    const weight = parseInt(weightMatch[1], 10);
    const rest = weightMatch[2].trim();
    const terms = rest.length > 0 ? rest.toLowerCase().split(/\s+/) : [];
    return { weight: weight >= 1 && weight <= 1000 ? weight : null, terms };
  }

  // No weight, just search terms
  const terms = trimmed.length > 0 ? trimmed.toLowerCase().split(/\s+/) : [];
  return { weight: null, terms };
}

function scoreIngredient(ing: Ingredient, terms: string[]): number {
  if (terms.length === 0) return 0.5;

  let score = 0;
  const nameLower = ing.name.toLowerCase();
  const idLower = ing.id.toLowerCase();
  const categoryLower = ing.category.toLowerCase();

  for (const term of terms) {
    // Exact name match
    if (nameLower === term) { score += 10; continue; }
    // Exact ID match
    if (idLower === term) { score += 10; continue; }
    // Name starts with term
    if (nameLower.startsWith(term)) { score += 5; continue; }
    // ID starts with term
    if (idLower.startsWith(term)) { score += 5; continue; }
    // Name contains term
    if (nameLower.includes(term)) { score += 3; continue; }
    // ID contains term
    if (idLower.includes(term)) { score += 3; continue; }
    // Category match
    if (categoryLower.includes(term)) { score += 2; continue; }
    // Partial match (term is substring of any word in name)
    const nameWords = nameLower.split(/[\s-]+/);
    if (nameWords.some((w) => w.startsWith(term))) { score += 2; continue; }
    if (nameWords.some((w) => w.includes(term))) { score += 1; continue; }
  }

  return score;
}

function searchIngredients(query: string, ingredients: Ingredient[]): SearchResult[] {
  const { weight, terms } = parseQuery(query);

  if (terms.length === 0 && weight === null) return [];

  const results: SearchResult[] = [];

  for (const ing of ingredients) {
    const s = scoreIngredient(ing, terms);
    if (s > 0) {
      results.push({ ingredient: ing, weight, score: s });
    }
  }

  results.sort((a, b) => b.score - a.score);
  return results;
}

export default function SearchBar({ ingredients }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = searchIngredients(query, ingredients);

  // Separate: results with weight (direct conversion) vs without (hub pages)
  const conversionResults = results.filter((r) => r.weight !== null);
  const hubResults = results.filter((r) => r.weight === null);

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
      // Navigate to first result
      if (allItems.length > 0) {
        const item = allItems[highlightedIndex >= 0 ? highlightedIndex : 0];
        if (item.weight) {
          window.location.href = `/${item.ingredient.id}/${item.weight}-grams-to-cups/`;
        } else {
          window.location.href = `/${item.ingredient.id}/`;
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
    flour: '\ud83c\udf3e',
    sugar: '\ud83c\udf6c',
    fat: '\ud83e\uddc8',
    dairy: '\ud83e\udd5b',
    other: '\ud83e\uddc3',
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
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
          placeholder='Try: "150g flour", "150 sugar", "butter", "cake flour"'
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
          {/* Direct conversion results */}
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
                  href={`/${r.ingredient.id}/${r.weight}-grams-to-cups/`}
                  className="flex items-center gap-3 px-4 py-3"
                  onClick={() => { setOpen(false); setQuery(''); }}
                >
                  <ArrowRight size={16} className="text-accent flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="font-semibold text-slate-800 text-sm">
                      {r.weight}g {r.ingredient.name}
                    </span>
                    <span className="block text-xs text-slate-500">
                      Direct conversion &rarr;
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}

          {/* Hub page results */}
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
                  href={`/${r.ingredient.id}/`}
                  className="flex items-center gap-3 px-4 py-3"
                  onClick={() => { setOpen(false); setQuery(''); }}
                >
                  <span className="text-xl flex-shrink-0">
                    {categoryEmojis[r.ingredient.category] || '\ud83e\uddc3'}
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
            Try: &quot;150g flour&quot;, &quot;150 sugar&quot;, &quot;butter&quot;
          </p>
        </div>
      )}
    </div>
  );
}
