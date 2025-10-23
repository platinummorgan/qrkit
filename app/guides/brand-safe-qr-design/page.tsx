import Link from 'next/link';
import { Metadata } from 'next';
import AdSlot from '@/components/AdSlot';

export const metadata: Metadata = {
  title: 'Brand-Safe QR Design: Print-Ready Codes That Always Scan | QR Kit',
  description: 'A practical guide to QR code design: contrast, quiet zone, sizing, color, logo, print/export, and a 10-point checklist.'
};

export default function BrandSafeQRDesignGuide() {
  return (
    <main className="prose prose-lg dark:prose-invert mx-auto py-8 px-4 max-w-3xl">
      <h1>Brand-Safe QR Design: Print-Ready Codes That Always Scan</h1>
      <p>
        QR codes are only effective if they scan instantly—every time, on every device. This guide covers the key design rules for reliable, brand-safe QR codes, including contrast, sizing, color, and export tips.
      </p>
      <h2>Contrast Ratios & Color Pitfalls</h2>
      <p>
        Always use a dark foreground on a light background. Aim for a contrast ratio of at least 4.5:1. Avoid light-on-dark, gradients, or busy backgrounds. Never use yellow, red, or pastel codes for critical uses.
      </p>
      <h2>Quiet Zone: The Invisible Buffer</h2>
      <p>
        The quiet zone is the empty margin around your QR code. It should be at least 4 modules wide (the smallest square in the code). Without it, scanners may fail.
      </p>
      <h2>Module Size vs. Viewing Distance</h2>
      <table>
        <thead><tr><th>Scan Distance</th><th>Min QR Size</th></tr></thead>
        <tbody>
          <tr><td>6 in (15 cm)</td><td>0.8 in (2 cm)</td></tr>
          <tr><td>12 in (30 cm)</td><td>1.6 in (4 cm)</td></tr>
          <tr><td>3 ft (1 m)</td><td>4 in (10 cm)</td></tr>
          <tr><td>10 ft (3 m)</td><td>12 in (30 cm)</td></tr>
        </tbody>
      </table>
  <AdSlot slot={process.env.NEXT_PUBLIC_AD_SLOT_INLINE!} />
      <h2>Logo & Center Image Sizing</h2>
      <p>
        Keep logos or center images under 30% of the QR area. Use high error correction (Q or H) if adding a logo. Test with and without the logo before printing.
      </p>
      <h2>Test Protocol</h2>
      <ul>
        <li>Test on multiple devices (iOS, Android, old and new phones)</li>
        <li>Test in different lighting and at different angles</li>
        <li>Print a sample and scan from intended distance</li>
        <li>Check for quiet zone and color contrast</li>
      </ul>
      <h2>Print & Export: SVG vs. PNG</h2>
      <p>
        For print, always use SVG (vector) for infinite scaling. PNG is fine for web or small stickers, but avoid for posters or signage. Set DPI to 300+ for print.
      </p>
      <h2>10-Point Design Checklist</h2>
      <ol>
        <li>Dark foreground, light background</li>
        <li>4+ module quiet zone</li>
        <li>Minimum size for scan distance</li>
        <li>No busy backgrounds or overlays</li>
        <li>Logo under 30% of area</li>
        <li>High error correction if using logo</li>
        <li>Test on multiple devices</li>
        <li>Export as SVG for print</li>
        <li>Print a sample and scan</li>
        <li>Include a fallback URL if possible</li>
      </ol>
      <hr />
      <p>
        <Link href="/guides" className="text-primary">← Back to Guides</Link> | <Link href="/" className="text-primary">Home</Link>
      </p>
    </main>
  );
}
