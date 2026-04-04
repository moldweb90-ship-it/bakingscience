export interface ProTipsProps {
  tips: string[];
  ingredientName: string;
}

export default function ProTips({ tips, ingredientName }: ProTipsProps) {
  if (tips.length === 0) return null;

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
        Expert Tips for Measuring {ingredientName}
      </h2>
      <div className="space-y-4">
        {tips.map((tip, index) => (
          <div key={index} className="callout-tip">
            <div className="flex gap-3">
              <span className="text-xl flex-shrink-0 mt-0.5">{"\ud83d\udca1"}</span>
              <p className="text-slate-700 text-sm leading-relaxed">{tip}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
