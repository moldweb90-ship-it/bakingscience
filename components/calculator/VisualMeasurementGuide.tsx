export interface VisualMeasurementGuideProps {
  ingredientId: string;
  ingredientName: string;
  weightG: number;
  photoAvailable: boolean;
}

export default function VisualMeasurementGuide({ ingredientName, weightG, photoAvailable }: VisualMeasurementGuideProps) {
  if (photoAvailable) {
    return (
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
          What Does {weightG}g of {ingredientName} Look Like?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {["spoon-level", "dip-sweep", "sifted"].map((method) => (
            <div key={method} className="card overflow-hidden">
              <div className="bg-slate-100 h-48 flex items-center justify-center text-slate-400">
                Photo: {method}.webp
              </div>
              <p className="p-3 text-xs text-slate-600 text-center">
                {weightG}g measured with {method.replace("-", " & ")}
              </p>
            </div>
          ))}
        </div>
        <p className="text-sm text-slate-500 mt-3 text-center">
          Notice how the same {weightG}g looks different depending on your method
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
        What Does {weightG}g of {ingredientName} Look Like?
      </h2>
      <div className="card p-8 text-center">
        <div className="flex justify-center gap-8 mb-4">
          {["Spoon & Level", "Dip & Sweep", "Sifted"].map((method) => (
            <div key={method} className="flex flex-col items-center">
              <div className="w-16 h-20 border-2 border-slate-300 rounded-b-lg relative overflow-hidden">
                <div
                  className="absolute bottom-0 left-0 right-0 bg-accent opacity-40"
                  style={{ height: method === "Sifted" ? "70%" : method === "Dip & Sweep" ? "90%" : "80%" }}
                />
              </div>
              <span className="text-xs text-slate-500 mt-2">{method}</span>
            </div>
          ))}
        </div>
        <p className="text-sm text-slate-500">
          Visual guide: Photos coming soon. For now, use our cup gauge above.
        </p>
      </div>
    </div>
  );
}
