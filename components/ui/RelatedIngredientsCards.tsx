import Link from "next/link";
import { ingredients, Ingredient } from "@/lib/converter";

export interface RelatedIngredientsCardsProps {
  relatedIds: string[];
  currentIngredientName: string;
}

const categoryEmojis: Record<string, string> = {
  flour: "\ud83c\udf3e",
  sugar: "\ud83c\udf6c",
  fat: "\ud83e\uddc8",
  dairy: "\ud83e\udd5b",
  other: "\ud83e\udde3",
};

export default function RelatedIngredientsCards({ relatedIds, currentIngredientName }: RelatedIngredientsCardsProps) {
  const relatedIngredients = relatedIds
    .map((id) => ingredients[id])
    .filter((ing): ing is Ingredient => ing !== undefined);

  if (relatedIngredients.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {relatedIngredients.map((ing) => (
        <Link
          key={ing.id}
          href={`/${ing.id}/`}
          className="card p-4 flex items-center gap-3 hover:border-accent transition-colors group"
        >
          <span className="text-2xl flex-shrink-0">
            {categoryEmojis[ing.category] || "\ud83e\udde3"}
          </span>
          <div className="min-w-0">
            <p className="text-sm font-medium text-slate-800 group-hover:text-accent transition-colors truncate">
              Compare: {currentIngredientName} vs {ing.name}
            </p>
            <p className="text-xs text-slate-500 capitalize">{ing.category}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
