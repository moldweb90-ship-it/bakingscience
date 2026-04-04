export interface NutritionFactsProps {
  ingredientName: string;
  nutrition: {
    calories: number;
    protein_g: number;
    carbs_g: number;
    fat_g: number;
    fiber_g: number;
    sugar_g: number;
  };
}

export default function NutritionFacts({ ingredientName, nutrition }: NutritionFactsProps) {
  return (
    <div className="card p-6 max-w-sm border-2 border-slate-800">
      <h3 className="text-2xl font-bold text-slate-900 border-b-4 border-slate-800 pb-2 mb-1">
        Nutrition Facts
      </h3>
      <p className="text-sm text-slate-600 mb-2">Per 100g of {ingredientName}</p>
      <div className="border-b-8 border-slate-800 pb-2 mb-2">
        <div className="flex justify-between items-baseline">
          <span className="text-3xl font-bold text-slate-900">Calories</span>
          <span className="text-3xl font-bold text-slate-900">{nutrition.calories}</span>
        </div>
      </div>
      <div className="space-y-1 text-sm border-b border-slate-300 pb-2">
        <div className="flex justify-between">
          <span className="font-semibold text-slate-800">Total Fat</span>
          <span className="text-slate-700">{nutrition.fat_g}g</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-slate-800">Total Carbohydrates</span>
          <span className="text-slate-700">{nutrition.carbs_g}g</span>
        </div>
        <div className="flex justify-between pl-4">
          <span className="text-slate-700">Dietary Fiber</span>
          <span className="text-slate-600">{nutrition.fiber_g}g</span>
        </div>
        <div className="flex justify-between pl-4">
          <span className="text-slate-700">Total Sugars</span>
          <span className="text-slate-600">{nutrition.sugar_g}g</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-slate-800">Protein</span>
          <span className="text-slate-700">{nutrition.protein_g}g</span>
        </div>
      </div>
      <p className="text-xs text-slate-400 mt-2">
        Values are approximate and based on USDA data.
      </p>
    </div>
  );
}
