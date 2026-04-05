export interface NutritionBlockProps {
  ingredientName: string;
  weightG: number;
  ingredientDensity: number;
  nutritionPer100g: {
    calories: number;
    protein_g: number;
    carbs_g: number;
    fat_g: number;
    fiber_g: number;
    sugar_g: number;
  };
}

export default function NutritionBlock({ ingredientName, weightG, ingredientDensity, nutritionPer100g }: NutritionBlockProps) {
  const scale = weightG / 100;
  const calories = Math.round(nutritionPer100g.calories * scale);
  const protein = Math.round(nutritionPer100g.protein_g * scale * 10) / 10;
  const carbs = Math.round(nutritionPer100g.carbs_g * scale * 10) / 10;
  const fat = Math.round(nutritionPer100g.fat_g * scale * 10) / 10;
  const fiber = Math.round(nutritionPer100g.fiber_g * scale * 10) / 10;
  const sugar = Math.round(nutritionPer100g.sugar_g * scale * 10) / 10;

  // Per cup values
  const gramsPerCup = Math.round(ingredientDensity * 236.588);
  const cupScale = gramsPerCup / 100;
  const cupCalories = Math.round(nutritionPer100g.calories * cupScale);
  const cupCarbs = Math.round(nutritionPer100g.carbs_g * cupScale * 10) / 10;
  const cupProtein = Math.round(nutritionPer100g.protein_g * cupScale * 10) / 10;
  const cupFat = Math.round(nutritionPer100g.fat_g * cupScale * 10) / 10;

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
        {ingredientName} Nutrition Facts — {weightG}g (Calories, Carbs &amp; Protein)
      </h2>
      <div
        className="card p-6 max-w-sm border-2 border-slate-800"
        aria-label={`${ingredientName} nutrition label — ${weightG}g serving`}
      >
        <h3 className="text-2xl font-bold text-slate-900 border-b-4 border-slate-800 pb-2 mb-1">
          Nutrition Facts
        </h3>
        <p className="text-sm text-slate-600 mb-2">Serving size: {weightG}g</p>
        <div className="border-b-8 border-slate-800 pb-2 mb-2">
          <div className="flex justify-between items-baseline">
            <span className="text-3xl font-bold text-slate-900">Calories</span>
            <span className="text-3xl font-bold text-slate-900">{calories}</span>
          </div>
        </div>
        <div className="space-y-1 text-sm border-b border-slate-300 pb-2">
          <div className="flex justify-between">
            <span className="font-semibold text-slate-800">Total Fat</span>
            <span className="text-slate-700">{fat}g</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-slate-800">Total Carbohydrates</span>
            <span className="text-slate-700">{carbs}g</span>
          </div>
          <div className="flex justify-between pl-4">
            <span className="text-slate-700">Dietary Fiber</span>
            <span className="text-slate-600">{fiber}g</span>
          </div>
          <div className="flex justify-between pl-4">
            <span className="text-slate-700">Total Sugars</span>
            <span className="text-slate-600">{sugar}g</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-slate-800">Protein</span>
            <span className="text-slate-700">{protein}g</span>
          </div>
        </div>
        <p className="text-sm text-slate-600 mt-3 pt-3 border-t border-slate-200">
          Per 1 cup (spoon &amp; level): {cupCalories} calories, {cupCarbs}g carbs, {cupProtein}g protein, {cupFat}g fat
        </p>
        <p className="text-xs text-slate-400 mt-2">
          Values are approximate and based on USDA data.
        </p>
      </div>
    </div>
  );
}
