"use client";

import { useState } from "react";

export interface BlogShareButtonsProps {
  url: string;
  title: string;
}

export default function BlogShareButtons({ url, title }: BlogShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="flex flex-wrap gap-3">
      <a
        href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-secondary text-sm px-4 py-2 min-h-[44px]"
      >
        {"\ud83d\udccc"} Pin to Pinterest
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-secondary text-sm px-4 py-2 min-h-[44px]"
      >
        {"\ud83d\udc26"} Share on X
      </a>
      <button
        onClick={handleCopy}
        className="btn-secondary text-sm px-4 py-2 min-h-[44px]"
      >
        {"\ud83d\udccb"} {copied ? "Link copied!" : "Copy Link"}
      </button>
    </div>
  );
}
