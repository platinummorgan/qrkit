import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About QR Kit – Privacy-First QR Code Generator',
  description: 'Learn about QR Kit: privacy-first, local QR code generation, created by Plat Labs in Columbus, GA.'
};

export default function AboutPage() {
  return (
    <main className="prose prose-lg dark:prose-invert mx-auto py-10 px-4 max-w-2xl">
      <h1>About QR Kit</h1>
      <p>
        <strong>QR Kit</strong> is a privacy-first QR code generator designed for speed, reliability, and trust. All QR codes are generated locally in your browser—your data never leaves your device. No sign-up, no tracking, and no server-side storage.
      </p>
      <p>
        <strong>Created by Plat Labs</strong>, a small team based in Columbus, Georgia, QR Kit was built to make secure QR code creation accessible to everyone. We believe in transparency, simplicity, and empowering users to control their own information.
      </p>
      <p>
        <strong>Why local/offline generation?</strong> Most QR tools upload your data to a remote server. QR Kit does everything in your browser, so sensitive information like Wi-Fi passwords or contact details stays private. This approach also means QR Kit works offline after loading—perfect for events, travel, or anywhere privacy matters.
      </p>
      <p>
        <strong>Credibility:</strong> QR Kit is trusted by thousands of users for business cards, event check-ins, Wi-Fi sharing, and more. Our code is open and regularly reviewed for security and accuracy.
      </p>
      <p>
        <Link href="/privacy">Privacy Policy</Link> | <Link href="/terms">Terms of Service</Link> | <Link href="/contact">Contact</Link>
      </p>
    </main>
  );
}
