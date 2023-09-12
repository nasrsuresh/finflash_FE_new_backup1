// src/app/Analytics.js

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const gtag = window.gtag;
    if (!gtag) return;

    const url = `${pathname}?${searchParams}`;
    gtag('config', 'G-K1WFKY4JMH', {
      page_path: url,
    });
  }, [pathname, searchParams]);

  return null;
}
