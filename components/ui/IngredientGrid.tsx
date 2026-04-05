import Link from 'next/link';

export interface GridIngredient {
  id: string;
  name: string;
  category: string;
  common_weights_g: number[];
}

export interface IngredientGridProps {
  ingredients: GridIngredient[];
}

const categoryEmojis: Record<string, string> = {
  flour: '🌾',
  sugar: '🍬',
  fat: '🧈',
  dairy: '🥛',
  other: '🧃',
};

const categoryLabels: Record<string, string> = {
  flour: 'Flour',
  sugar: 'Sugar',
  fat: 'Fat',
  dairy: 'Dairy & Liquid',
  other: 'Other Dry',
};

function getTopWeights(weights: number[]): number[] {
  const priority = [100, 200, 250, 500, 1000, 150, 125, 300, 75, 50];
  const result: number[] = [];
  const available = new Set(weights);

  for (const w of priority) {
    if (available.has(w) && !result.includes(w)) {
      result.push(w);
    }
    if (result.length >= 5) break;
  }

  for (const w of weights) {
    if (!result.includes(w)) {
      result.push(w);
    }
    if (result.length >= 5) break;
  }

  return result.sort((a, b) => a - b);
}

export default function IngredientGrid({ ingredients }: IngredientGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4" id="ingredients">
      {ingredients.map((ing) => {
        const topWeights = getTopWeights(ing.common_weights_g);
        const hasMore = ing.common_weights_g.length > 5;

        return (
          <div
            key={ing.id}
            className="card p-5 flex flex-col items-center text-center gap-2 group hover:border-accent transition-colors duration-200"
          >
            <Link href={`/${ing.id}/`} className="flex flex-col items-center">
              <span className="text-3xl mb-1 group-hover:scale-110 transition-transform duration-200">
                {categoryEmojis[ing.category] || '🧃'}
              </span>
              <span className="font-semibold text-slate-800 text-sm leading-tight">
                {ing.name}
              </span>
              <span className="text-xs text-slate-500 capitalize">
                {categoryLabels[ing.category] || ing.category}
              </span>
            </Link>
            <div className="flex flex-wrap justify-center items-center gap-x-1 gap-y-0.5 mt-1 max-w-full overflow-hidden">
              {topWeights.map((w, i) => (
                <span key={w} className="inline-flex items-center">
                  {i > 0 && <span className="text-slate-300 mx-1 text-[10px]">&middot;</span>}
                  <Link
                    href={`/${ing.id}/${w}-grams-to-cups/`}
                    className="text-xs text-accent hover:underline font-medium whitespace-nowrap"
                  >
                    {w}g
                  </Link>
                </span>
              ))}
              {hasMore && (
                <span className="inline-flex items-center">
                  <span className="text-slate-300 mx-1 text-[10px]">&middot;</span>
                  <Link
                    href={`/${ing.id}/`}
                    className="text-xs text-slate-400 hover:text-accent whitespace-nowrap"
                  >
                    more
                  </Link>
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
