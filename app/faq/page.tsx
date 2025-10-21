import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ – QR Kit',
  description: 'Answers about generating URL, Wi-Fi, and vCard QR codes with QR Kit.',
};

const faqs = [
  {
    q: 'Where is my data stored?',
    a: 'Nowhere on our servers. We generate QR codes entirely in your browser. The data is encoded inside the QR itself.',
  },
  {
    q: 'What happens when someone scans a vCard QR?',
    a: 'The encoded contact card (vCard) is directly read by the scanner app; it can offer to create a contact without calling our servers.',
  },
  {
    q: 'Can I customize colors?',
    a: 'Yes. Use the color pickers and the QR will be regenerated on the fly.',
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
          <details key={i} className="group p-4" open={i === 0}>
            <summary className="cursor-pointer list-none font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500">
              {f.q}
            </summary>
            <div className="mt-2 text-gray-700">{f.a}</div>
          </details>
        ))}
      </div>
    </main>
  );
}