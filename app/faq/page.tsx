import type { Metadata } from 'next';
import AdSlot from '@/components/AdSlot';

export const metadata: Metadata = {
  title: 'FAQ – QR Kit',
  description: 'Expert answers about QR code scanning, print, Wi-Fi, vCard, error correction, and more. QR Kit privacy-first help.',
};

const faqs = [
  {
    q: 'Why won’t my colored QR code scan?',
    a: 'Low contrast or using light colors for the foreground can make QR codes unscannable. Always use a dark color on a light background and test with multiple devices. The quiet zone (margin) is also critical for scan reliability.',
  },
  {
    q: 'What is the quiet zone and how big should it be?',
    a: 'The quiet zone is the empty margin around your QR code. It should be at least 4 modules wide (the smallest square in the code). Most generators set this automatically, but for print, ensure at least 4x the module size.',
  },
  {
    q: 'Should I use SVG or PNG for printing QR codes? What DPI?',
    a: 'SVG is best for print because it scales infinitely with no loss of quality. PNG is fine for web or small stickers, but for posters or signage, use SVG and print at 300 DPI or higher.',
  },
  {
    q: 'Why does my Wi-Fi QR code work on Android but not iOS?',
    a: 'iOS requires the correct security type (WPA/WPA2, WEP, or None) and does not support hidden SSIDs. Double-check your settings and test on both platforms. Android is more flexible but may warn about hidden networks.',
  },
  {
    q: 'Can I use a QR code for a hidden Wi-Fi network?',
    a: 'Yes, but not all devices support this. iOS does not support hidden SSIDs via QR. For best results, use visible SSIDs.',
  },
  {
    q: 'Which vCard fields are supported and what are the compatibility caveats?',
    a: 'Name, organization, phone, email, and address are supported. Some apps may not import all fields—test with your target device. vCard versions and field support vary by platform.',
  },
  {
    q: 'Are URL shorteners safe for QR codes? Why do some scanners warn?',
    a: 'Shorteners can break or be blocked. For critical uses, encode the final destination URL directly. Some scanners warn about shorteners due to phishing risks. Use reputable services and avoid for sensitive uses.',
  },
  {
    q: 'How big should I print my QR code for different viewing distances?',
    a: 'For close scanning (15 cm/6 in), 2 cm (0.8 in) is enough. For 1 m (3 ft), use at least 10 cm (4 in). See table below for guidance.',
  },
  {
    q: 'What are the error correction levels (L/M/Q/H) and their trade-offs?',
    a: 'Error correction lets QR codes scan even if partially damaged. L (7%), M (15%), Q (25%), H (30%). Use Q or H if adding a logo or printing on rough surfaces, but note the code gets denser and harder to scan at small sizes.',
  },
  {
    q: 'My QR works on screen but not when printed. Why?',
    a: 'Print quality, low contrast, glare, or missing quiet zone can cause this. Use SVG for print, check your printer settings, and ensure the code is large enough. Avoid glossy paper and test in real conditions.',
  },
  {
    q: 'Can I put a big logo in the center of my QR code?',
    a: 'Yes, but keep the logo under 30% of the code area and use high error correction (Q or H). Too large a logo or low error correction will make the code unscannable.',
  },
];

const sizeTable = [
  { distance: '15 cm (6 in)', minSize: '2 cm (0.8 in)' },
  { distance: '1 m (3 ft)', minSize: '10 cm (4 in)' },
  { distance: '3 m (10 ft)', minSize: '30 cm (12 in)' },
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
      <div className="divide-y divide-gray-200 rounded-md border mb-8">
        {faqs.map((f, i) => (
          <>
            <details key={i} className="group p-4" open={i === 0}>
              <summary className="cursor-pointer list-none font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500">
                {f.q}
              </summary>
              <div className="mt-2 text-gray-700">{f.a}</div>
              {i === 6 && (
                <table className="my-4 w-full text-sm border rounded">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-2 text-left">Viewing Distance</th>
                      <th className="p-2 text-left">Minimum QR Size</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizeTable.map(row => (
                      <tr key={row.distance}>
                        <td className="p-2">{row.distance}</td>
                        <td className="p-2">{row.minSize}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </details>
            {i === 4 && (
              <div className="my-6">
                <AdSlot slot={process.env.NEXT_PUBLIC_AD_SLOT_INLINE!} />
              </div>
            )}
          </>
        ))}
      </div>
      <div className="text-xs text-gray-500 mt-8">
        For more help, see our{' '}
        <a href="/guides" className="underline">
          Guides
        </a>{' '}
        or{' '}
        <a href="/contact" className="underline">
          Contact us
        </a>.
      </div>
    </main>
  );
}