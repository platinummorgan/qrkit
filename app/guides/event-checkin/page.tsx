import Link from 'next/link';
import { Metadata } from 'next';
import AdSlot from '@/components/AdSlot';

export const metadata: Metadata = {
  title: 'QR Event Check-In: Fast, Secure, and Simple | QR Kit',
  description: 'A practical guide to using QR codes for event check-in: static vs dynamic, anti-duplication, signage, privacy, and launch checklist.'
};

export default function EventCheckinGuide() {
  return (
    <main className="prose prose-lg dark:prose-invert mx-auto py-8 px-4 max-w-3xl">
      <h1>QR Event Check-In: Fast, Secure, and Simple</h1>
      <p>
        QR codes make event check-in fast, accurate, and scalable—no expensive scanners or custom apps required. This guide covers how to use QR tickets for events, how they compare to guest lists, and how to avoid common pitfalls.
      </p>
      <h2>Overview: QR Tickets vs. Guest Lists</h2>
      <p>
        QR tickets encode a unique code or URL for each attendee. At the door, staff scan the code using a standard camera app or QR reader. This is faster and less error-prone than searching a guest list, especially for large events.
      </p>
      <table>
        <thead><tr><th>Role</th><th>Action</th></tr></thead>
        <tbody>
          <tr><td>Attendee</td><td>Shows QR ticket (phone or print)</td></tr>
          <tr><td>Staff</td><td>Scans code, checks validity</td></tr>
          <tr><td>Ops Lead</td><td>Monitors flow, resolves issues</td></tr>
        </tbody>
      </table>
      <h2>Generating QR Codes: Static vs. Dynamic</h2>
      <p>
        <strong>Static QR:</strong> Each ticket has a unique, pre-generated code (e.g., a random string or ID). No internet required at the door. Good for small/medium events.
      </p>
      <p>
        <strong>Dynamic QR:</strong> Each code links to a live URL (e.g., https://yourdomain.com/checkin/abc123). Allows real-time validation and anti-duplication, but requires connectivity and a backend.
      </p>
      <h2>Anti-Duplication Tips</h2>
      <ul>
        <li>For static codes, print a unique code on each ticket and check off used codes manually or with a spreadsheet.</li>
        <li>For dynamic codes, mark tickets as used in your backend after first scan.</li>
        <li>Use short, random codes (8+ chars) to prevent guessing.</li>
        <li>Train staff to spot screenshots or photocopies.</li>
      </ul>
  <AdSlot slot={process.env.NEXT_PUBLIC_AD_SLOT_INLINE!} />
      <h2>Check-In Flow with a Consumer Camera App</h2>
      <ol>
        <li>Attendee presents QR (on phone or printout).</li>
        <li>Staff uses a phone camera or QR app to scan.</li>
        <li>App displays the code or URL; staff checks against list or backend.</li>
        <li>Mark as checked-in (manually or in app).</li>
      </ol>
      <h2>Signage Templates</h2>
      <ul>
        <li>"Scan your QR ticket here" (with arrow or icon)</li>
        <li>"Need help? See staff at the desk"</li>
        <li>"Lost your code? Provide your name and ID"</li>
      </ul>
      <h2>Ops Checklist</h2>
      <ul>
        <li>Test all codes before event day (print and digital)</li>
        <li>Charge all devices and have backups</li>
        <li>Train staff on scanning and fallback process</li>
        <li>Prepare a manual guest list as backup</li>
        <li>Set up clear signage at entry points</li>
      </ul>
      <h2>Privacy Note</h2>
      <p>
        QR Kit generates all codes client-side—no attendee data is uploaded or stored. For dynamic check-in, use a secure backend and avoid embedding personal info in the QR itself.
      </p>
      <h2>Launch Day Checklist</h2>
      <ol>
        <li>Arrive early and test scanning at the door</li>
        <li>Distribute devices and backup chargers</li>
        <li>Brief staff on check-in flow and troubleshooting</li>
        <li>Set up signage and entry lanes</li>
        <li>Have a backup guest list ready</li>
        <li>Monitor flow and adjust as needed</li>
        <li>Record any issues for post-event review</li>
      </ol>
      <hr />
      <p>
        <Link href="/guides" className="text-primary">← Back to Guides</Link> | <Link href="/" className="text-primary">Home</Link>
      </p>
    </main>
  );
}
