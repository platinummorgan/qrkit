import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'QR Code Guides & Tutorials — QR Kit',
  description: 'Learn how to create and use QR codes effectively for Wi-Fi sharing, event check-ins, business cards, and more.',
};

const guides = [
  {
    slug: 'wifi-qr-codes',
    title: 'Creating Wi-Fi QR Codes for Easy Network Sharing',
    description: 'Learn how to generate Wi-Fi QR codes that allow guests to connect to your network instantly without typing passwords.',
    readTime: '5 min read',
  },
  {
    slug: 'event-checkin',
    title: 'Using QR Codes for Event Check-In and Registration',
    description: 'Streamline your event management with QR code-based check-in systems for conferences, concerts, and gatherings.',
    readTime: '6 min read',
  },
  {
    slug: 'brand-safe-qr-design',
    title: 'Brand-Safe QR Code Design: Best Practices',
    description: 'Design QR codes that match your brand while maintaining scannability and professional appearance.',
    readTime: '4 min read',
  },
];

export default function GuidesPage() {
  return (
    <main className="container py-12 max-w-6xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">QR Code Guides & Tutorials</h1>
        <p className="text-xl text-muted-foreground">
          Comprehensive guides to help you create effective QR codes for various use cases.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="group bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors"
          >
            <h2 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
              {guide.title}
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {guide.description}
            </p>
            <span className="text-sm text-primary font-medium">
              {guide.readTime} →
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-16 bg-muted/30 rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-4">Ready to Create Your QR Code?</h2>
        <p className="text-muted-foreground mb-6">
          Use our free QR code generator to create professional QR codes for URLs, Wi-Fi networks, and contact information.
        </p>
        <Link
          href="/"
          className="inline-block bg-foreground text-background px-6 py-3 rounded-md font-medium hover:opacity-90 transition-opacity"
        >
          Start Generating QR Codes
        </Link>
      </div>
    </main>
  );
}
