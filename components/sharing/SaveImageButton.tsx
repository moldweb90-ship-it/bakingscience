"use client";

import { useState } from "react";

export interface SaveImageButtonProps {
  targetRef: React.RefObject<HTMLDivElement | null>;
  fileName: string;
}

export default function SaveImageButton({ targetRef, fileName }: SaveImageButtonProps) {
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const element = targetRef.current;
      if (!element) return;

      const canvas = await html2canvas(element, {
        backgroundColor: "#FDF6E3",
        scale: 2,
      });

      const link = document.createElement("a");
      link.download = `${fileName}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Failed to save image:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <button
      onClick={handleSave}
      disabled={saving}
      className="btn-secondary text-sm px-4 py-2 min-h-[44px] flex items-center gap-2 disabled:opacity-50"
    >
      \ud83d\udcf7 {saving ? "Saving..." : "Save Image"}
    </button>
  );
}
