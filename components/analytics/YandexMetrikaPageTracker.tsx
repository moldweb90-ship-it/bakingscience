'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

declare global {
  interface Window {
    ym?: (id: number, action: string, ...args: unknown[]) => void;
  }
}

const YANDEX_METRIKA_ID = 108426727;

export default function YandexMetrikaPageTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.ym !== 'function') {
      return;
    }

    const query = searchParams.toString();
    const url = query ? `${pathname}?${query}` : pathname;
    window.ym(YANDEX_METRIKA_ID, 'hit', url);
  }, [pathname, searchParams]);

  return null;
}
