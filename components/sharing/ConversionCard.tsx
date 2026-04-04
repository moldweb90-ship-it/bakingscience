import { forwardRef } from "react";

export interface ConversionCardProps {
  ingredientName: string;
  weightG: number;
  resultCups: number;
  methodName: string;
  spoonLevelCups: number;
  dipSweepCups: number;
  siftedCups: number;
}

const ConversionCard = forwardRef<HTMLDivElement, ConversionCardProps>(
  ({ ingredientName, weightG, resultCups, methodName, spoonLevelCups, dipSweepCups, siftedCups }, ref) => {
    return (
      <div
        ref={ref}
        className="w-[1080px] h-[1080px] bg-[#FDF6E3] border-4 border-[#F97316] p-12 flex flex-col items-center justify-center text-center"
        style={{ fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" }}
      >
        <div className="text-left w-full mb-8">
          <span className="text-3xl">{"\ud83e\uddc1"}</span>
          <span className="text-2xl font-bold text-slate-900 ml-2">BakingScience.io</span>
        </div>

        <p className="text-4xl font-bold text-slate-900 uppercase tracking-wide mb-6">
          {ingredientName}
        </p>

        <div className="my-8">
          <p className="text-6xl font-bold text-slate-900">{weightG}g</p>
          <p className="text-5xl text-slate-400 my-2">=</p>
          <p className="text-7xl font-bold text-[#F97316]">{resultCups} cups</p>
        </div>

        <p className="text-2xl text-slate-600 mb-6">
          Method: {methodName}
        </p>

        <div className="space-y-2 text-xl text-slate-500 mb-8">
          <p>Spoon & Level: {spoonLevelCups} cups</p>
          <p>Dip & Sweep: {dipSweepCups} cups</p>
          <p>Sifted: {siftedCups} cups</p>
        </div>

        <p className="text-lg text-slate-400 mt-auto">
          bakingscience.io
        </p>
      </div>
    );
  }
);

ConversionCard.displayName = "ConversionCard";

export default ConversionCard;
