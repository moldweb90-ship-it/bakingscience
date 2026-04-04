import Link from 'next/link';
import type { Ingredient } from '@/lib/converter';

export interface IngredientGridProps {
  ingredients: Ingredient[];
}

const categoryEmojis: Record<string, string> = {
  flour: '\ud83c\udf3e',
  sugar: '\ud83c\udf6c',
  fat: '\ud83e\uddc8',
  dairy: '\ud83e\udd5b',
  other: '\ud83e\uddc3',
};

const categoryLabels: Record<string, string> = {
  flour: 'Flour',
  sugar: 'Sugar',
  fat: 'Fat',
  dairy: 'Dairy & Liquid',
  other: 'Other Dry',
};

export default function IngredientGrid({ ingredients }: IngredientGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4" id="ingredients">
      {ingredients.map((ing) => (
        <Link
          key={ing.id}
          href={`/${ing.id}/`}
          className="card p-5 flex flex-col items-center text-center gap-2 group hover:border-accent transition-colors duration-200"
        >
          <span className="text-3xl mb-1 group-hover:scale-110 transition-transform duration-200">
            {categoryEmojis[ing.category] || '\ud83e\uddc3'}
          </span>
          <span className="font-semibold text-slate-800 text-sm leading-tight">
            {ing.name}
          </span>
          <span className="text-xs text-slate-500 capitalize">
            {categoryLabels[ing.category] || ing.category}
          </span>
          <span className="text-xs text-accent font-medium">
            {ing.common_weights_g.length} conversions
          </span>
        </Link>
      ))}
    </div>
  );
}
