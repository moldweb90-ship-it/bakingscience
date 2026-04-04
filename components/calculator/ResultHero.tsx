export interface ResultHeroProps {
  ingredientName: string;
  weightG: number;
  resultCups: number;
  methodName: string;
  subtitle?: string;
}

export default function ResultHero({ ingredientName, weightG, resultCups, methodName, subtitle }: ResultHeroProps) {
  return (
    <div className="card p-4 sm:p-6 lg:p-8 text-center bg-gradient-to-br from-warm-white to-cream">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 mb-3 sm:mb-4 leading-tight">
        How Many Cups is {weightG}g of {ingredientName}?
      </h1>
      <div className="my-4 sm:my-6">
        <p className="text-4xl sm:text-5xl lg:text-6xl font-bold text-accent-hover leading-tight">
          {resultCups}
        </p>
        <p className="text-lg sm:text-xl lg:text-2xl font-medium text-slate-600 mt-1">
          US Cups
        </p>
      </div>
      <p className="text-sm text-slate-500">
        {subtitle || `Using the ${methodName} method`}
      </p>
    </div>
  );
}
