"use client";

import { useState } from "react";

export interface ShareButtonsProps {
  url: string;
  title: string;
  description: string;
  imageUrl?: string;
}

export default function ShareButtons({ url, title, description }: ShareButtonsProps) {
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

  const pinterestUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(description)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;

  return (
    <div>
      <h3 className="text-lg font-semibold text-slate-900 mb-3">Share your exact measurement</h3>
      <div className="flex flex-wrap gap-3">
        <a
          href={pinterestUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary text-sm px-4 py-2 min-h-[44px] flex items-center gap-2 hover:bg-red-50 hover:border-red-200"
        >
          {"\ud83d\udccc"} Pin to Pinterest
        </a>
        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary text-sm px-4 py-2 min-h-[44px] flex items-center gap-2 hover:bg-slate-50"
        >
          {"\ud83d\udc26"} Share on X
        </a>
        <button
          onClick={handleCopy}
          className="btn-secondary text-sm px-4 py-2 min-h-[44px] flex items-center gap-2"
        >
          {"\ud83d\udccb"} {copied ? "Link copied!" : "Copy Link"}
        </button>
      </div>
      {copied && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-4 py-2 rounded-button text-sm shadow-lg animate-fade-in z-50">
          Link copied to clipboard!
        </div>
      )}
    </div>
  );
}
