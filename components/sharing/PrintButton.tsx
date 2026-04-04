export interface PrintButtonProps {
  ingredientName: string;
  weightG: number;
}

export default function PrintButton({ ingredientName, weightG }: PrintButtonProps) {
  return (
    <button
      onClick={() => window.print()}
      className="btn-secondary text-sm px-4 py-2 min-h-[44px] flex items-center gap-2"
    >
      {"\ud83d\udda8\ufe0f"} Print
    </button>
  );
}
