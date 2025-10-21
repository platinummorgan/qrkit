"use client";
import { useEffect, useRef } from "react";

declare global {
  interface Window { adsbygoogle?: any[] }
}

export default function AdSlot({
  slot,
  format = "auto",
  responsive = "true",
  style,
  className,
}: {
  slot: string;
  format?: string;
  responsive?: "true" | "false";
  style?: React.CSSProperties;
  className?: string;
}) {
  const ref = useRef<HTMLModElement | null>(null);
  const styleString = style ? JSON.stringify(style) : '';
  useEffect(() => {
    try {
      // Prevent sticky/fixed ad insertion: if the caller passed a className containing
      // 'sticky' or styles that would position fixed, skip the push and render nothing.
      const isStickyClass = !!(className && /sticky/i.test(className));
      const styleString = style ? JSON.stringify(style).toLowerCase() : '';
      const isFixedStyle = /position"?:\s*"?fixed|position":\s*fixed|"position":"fixed"/.test(styleString);
      if (isStickyClass || isFixedStyle) {
        return;
      }
      if (window && (window.adsbygoogle = window.adsbygoogle || [])) {
        window.adsbygoogle.push({});
      }
    } catch {}
  }, [className, styleString, style]);
  // Only render the inline ad container if it's not a sticky/fixed attempt.
  if (className && /sticky/i.test(className)) return null;
  return (
    <ins
      ref={ref as any}
      className={`adsbygoogle ${className ?? ""}`}
      style={style ?? { display: "block", minHeight: 100 }}
      data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive}
    />
  );
}