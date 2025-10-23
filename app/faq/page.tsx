import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ – QR Kit',
  description: 'Answers about generating URL, Wi-Fi, and vCard QR codes with QR Kit.',
};

import AdSlot from '@/components/AdSlot';
const faqs = [
  {
    q: 'Why won’t my colored QR code scan?',
    a: 'Low contrast or using light colors for the foreground can make QR codes unscannable. Always use a dark color on a light background and test with multiple devices.',
  },
  {
    q: 'What is the quiet zone and why does it matter?',
    a: 'The quiet zone is the empty margin around your QR code. It should be at least 4 modules wide. Without it, scanners may fail to detect the code.',
  },
  {
    q: 'Should I use SVG or PNG for printing?',
    a: 'SVG is best for print because it scales infinitely with no loss of quality. PNG is fine for web or small stickers, but avoid for posters or signage.',
  },
  {
    q: 'Why does my Wi-Fi QR code work on Android but not iOS?',
    a: 'iOS requires the correct security type (WPA/WPA2, WEP, or None) and does not support hidden SSIDs. Double-check your settings and test on both platforms.',
  },
  {
    q: 'Can I use a QR code for a hidden Wi-Fi network?',
    a: 'Yes, but not all devices support this. iOS does not support hidden SSIDs via QR. For best results, use visible SSIDs.',
  },
  {
    q: 'What vCard fields are supported?',
    a: 'Name, phone, email, company, and address are supported. Some apps may not import all fields—test with your target device.',
  },
  {
    q: 'Are URL shorteners safe for QR codes?',
    a: 'Shorteners can break or be blocked. For critical uses, encode the final destination URL directly. If you use a shortener, pick a reputable one.',
  },
  {
    q: 'How big should I print my QR code?',
    a: 'For close scanning (6 in), 0.8 in (2 cm) is enough. For 3 ft (1 m), use at least 4 in (10 cm). Always test at actual size and distance.',
  },
  {
    q: 'What is error correction and when should I use it?',
    a: 'Error correction lets QR codes scan even if partially damaged. Use higher levels (Q or H) if adding a logo or printing on rough surfaces, but note the code gets denser.',
  },
  {
    q: 'My QR works on screen but not when printed. Why?',
    a: 'Print quality, low contrast, or missing quiet zone can cause this. Use SVG for print, check your printer settings, and ensure the code is large enough.',
  },
  {
    q: 'Where is my data stored?',
    a: 'Nowhere on our servers. We generate QR codes entirely in your browser. The data is encoded inside the QR itself.',
  },
  {
    q: 'Do I need an account?',
    a: 'No sign-up. Everything runs client-side.',
  },
];

export default function FAQPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <main className="container mx-auto max-w-3xl py-10">
      <h1 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h1>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="divide-y divide-gray-200 rounded-md border">
        {faqs.map((f, i) => (
          <>
            <details key={i} className="group p-4" open={i === 0}>
              <summary className="cursor-pointer list-none font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500">
                {f.q}
              </summary>
              <div className="mt-2 text-gray-700">{f.a}</div>
            </details>
            {i === 4 && (
              <div className="my-6">
                <AdSlot slot={process.env.NEXT_PUBLIC_AD_SLOT_INLINE!} />
              </div>
            )}
          </>
        ))}
      </div>
    </main>
  );
}