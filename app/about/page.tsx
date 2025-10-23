import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About QR Kit – Privacy-First QR Code Generator',
  description: 'Learn about QR Kit: privacy-first, all client-side QR code generation, built by Platova Labs in Columbus, GA, USA. No data collection, reliable SVG export, print-safe defaults.',
};

export default function AboutPage() {
  return (
    <main className="prose prose-lg dark:prose-invert mx-auto py-10 px-4 max-w-2xl">
      <h1>About QR Kit</h1>
      <p>
        <strong>QR Kit</strong> is a privacy-first QR code generator designed for speed, reliability, and trust. All QR codes are generated locally in your browser—your data never leaves your device. No sign-up, no tracking, and no server-side storage. The app works offline after loading, so you can use it anywhere.
      </p>
      <p>
        <strong>Who builds QR Kit?</strong> QR Kit is developed and maintained by Platova Labs, an independent software studio based in Columbus, Georgia, USA. Our mission is to provide reliable, trustworthy tools that respect your privacy and work anywhere.
      </p>
      <p>
        <strong>Why trust QR Kit?</strong> We never collect your data. The generator works offline after the page loads, and you can export QR codes in SVG for perfect print quality. There are no accounts, no analytics, and no tracking.
      </p>
      <p>
        <strong>Reliability and quality:</strong> QR Kit is designed for professionals and everyday users alike. SVG export ensures your codes print sharply at any size. The app is tested on all major browsers and devices. Print-safe defaults help ensure your codes scan reliably in real-world conditions.
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>Client-side only: nothing is sent to our servers</li>
        <li>SVG and PNG export for print and digital</li>
        <li>No sign-up, no tracking, no analytics</li>
        <li>Works offline after loading</li>
        <li>Open, transparent privacy policy</li>
      </ul>
      <p className="mb-4">
        For details, see our <Link href="/privacy" className="underline">Privacy Policy</Link>, explore our <Link href="/guides" className="underline">Guides</Link>, <Link href="/contact" className="underline">Contact us</Link>, or visit <a href="https://platovalabs.com" className="underline" target="_blank" rel="noopener noreferrer">Platova Labs</a>.
      </p>
      <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} Plat Labs, Columbus, GA, USA</p>
    </main>
  );
}
