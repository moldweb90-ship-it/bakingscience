'use client';

import Link from 'next/link';
import SearchBar from '@/components/ui/SearchBar';
import { ingredients } from '@/lib/converter';

const popularIngredients = Object.values(ingredients).slice(0, 8);

export default function NotFound() {
  return (
    <div className="py-16 text-center">
      <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
        This conversion doesn&apos;t exist &mdash; yet
      </h1>
      <p className="text-slate-600 mb-8 max-w-md mx-auto">
        We couldn&apos;t find this conversion. Try a weight between 1g and 1000g, or search for your ingredient below.
      </p>

      <div className="max-w-lg mx-auto mb-12">
        <SearchBar ingredients={Object.values(ingredients)} />
      </div>

      <h2 className="text-lg font-semibold text-slate-800 mb-4">Popular Ingredients</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto mb-10">
        {popularIngredients.map((ing) => (
          <Link
            key={ing.id}
            href={`/${ing.id}/`}
            className="card p-4 text-center hover:border-accent transition-colors"
          >
            <span className="text-2xl block mb-1">
              {ing.category === 'flour' ? '\ud83c\udf3e' :
               ing.category === 'sugar' ? '\ud83c\udf6c' :
               ing.type === 'fat' ? '\ud83e\uddc8' :
               ing.category === 'dairy' ? '\ud83e\udd5b' : '\ud83e\uddc3'}
            </span>
            <span className="text-sm font-medium text-slate-700">{ing.name}</span>
          </Link>
        ))}
      </div>

      <Link href="/" className="btn-primary inline-flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        Back to Homepage
      </Link>
    </div>
  );
}
