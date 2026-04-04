export interface ResultHeroProps {
  ingredientName: string;
  weightG: number;
  resultCups: number;
  methodName: string;
  subtitle?: string;
}

export default function ResultHero({ ingredientName, weightG, resultCups, methodName, subtitle }: ResultHeroProps) {
  return (
    <div className="card p-6 sm:p-8 text-center bg-gradient-to-br from-warm-white to-cream">
      <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
        How Many Cups is {weightG}g of {ingredientName}?
      </div>
      <div className="my-6">
        <p className="text-result-mobile sm:text-result font-bold text-accent-hover leading-tight">
          {resultCups}
        </p>
        <p className="text-xl sm:text-2xl font-medium text-slate-600 mt-1">
          US Cups
        </p>
      </div>
      <p className="text-sm text-slate-500">
        {subtitle || `Using the ${methodName} method`}
      </p>
    </div>
  );
}
