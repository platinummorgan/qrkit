'use client';
import { useEffect, useState } from 'react';
import Script from 'next/script';

let scriptLoaded = false;

export default function AdScript() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  
  useEffect(() => {
    // Only load once across the entire app
    if (!scriptLoaded && client) {
      scriptLoaded = true;
      setShouldLoad(true);
    }
  }, [client]);
  
  if (!client || !shouldLoad) {
    return null;
  }

  return (
    <Script
      id="adsbygoogle-script"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
      crossOrigin="anonymous"
      strategy="lazyOnload"
    />
  );
}
