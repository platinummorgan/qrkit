'use client';
import { useEffect, useState } from 'react';

export default function SafeAd({ slotId }: { slotId: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onGen = () => setShow(true);
    window.addEventListener('qr-generated', onGen);

    const faq = document.getElementById('faq');
    const io = faq ? new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setShow(true);
    }, { threshold: 0.3 }) : null;
    if (faq && io) io.observe(faq);

    return () => { window.removeEventListener('qr-generated', onGen); io?.disconnect(); };
  }, []);

  useEffect(() => {
    if (show) {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error('AdSense error:', err);
      }
    }
  }, [show]);

  if (!show || !process.env.NEXT_PUBLIC_ADSENSE_CLIENT) return null;

  return (
    <ins className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT!}
      data-ad-slot={slotId}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
