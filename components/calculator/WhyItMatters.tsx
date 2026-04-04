import { convert } from "@/lib/converter";

export interface WhyItMattersProps {
  ingredientName: string;
  weightG: number;
  ingredientId: string;
}

export default function WhyItMatters({ ingredientName, weightG, ingredientId }: WhyItMattersProps) {
  const base = convert(weightG, ingredientId, "spoon_level");
  const plus10 = convert(weightG + 10, ingredientId, "spoon_level");
  const minus10 = convert(weightG - 10 >= 1 ? weightG - 10 : 1, ingredientId, "spoon_level");
  const errorCups = plus10.cups - base.cups;

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
        Why Exact {ingredientName} Measurement Matters
      </h2>
      <div className="card p-6 space-y-4 text-slate-700 leading-relaxed">
        <p>
          A 10g error when measuring {ingredientName.toLowerCase()} can change your result by {Math.abs(errorCups).toFixed(2)} cups.
          That&apos;s the difference between a perfectly balanced recipe and one that turns out too dry or too wet.
        </p>
        <p>
          Adding just 10 extra grams of {ingredientName.toLowerCase()} (the weight of about two teaspoons) absorbs extra moisture
          and can turn a tender result into a dense, dry one. Conversely, using 10g less means your structure may not hold.
        </p>
        <div className="bg-slate-50 rounded-card p-4 grid grid-cols-3 gap-4 text-center text-sm">
          <div>
            <p className="text-slate-500">-10g</p>
            <p className="font-bold text-slate-800">{minus10.cups} cups</p>
          </div>
          <div className="bg-accent-light rounded-card">
            <p className="text-accent-hover font-medium">{weightG}g (exact)</p>
            <p className="font-bold text-accent-hover text-lg">{base.cups} cups</p>
          </div>
          <div>
            <p className="text-slate-500">+10g</p>
            <p className="font-bold text-slate-800">{plus10.cups} cups</p>
          </div>
        </div>
        <p>
          This is why professional bakers always weigh their ingredients. Volume measurements are inherently inconsistent,
          but with our converter, you get the exact cup measurement for your specific weight and method.
        </p>
      </div>
    </div>
  );
}
