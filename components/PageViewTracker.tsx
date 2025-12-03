'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

// Google Analytics gtag型定義
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js',
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
  }
}

export default function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      const gaId = process.env.NEXT_PUBLIC_GA_ID || 'G-VYP9RZRVZ8';
      window.gtag('config', gaId, {
        page_path: pathname,
      });
    }
  }, [pathname, searchParams]);

  return null;
}
