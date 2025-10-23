import type { Metadata } from 'next';
"use client";
import { useState } from "react";

export const metadata: Metadata = {
  title: "Contact – QR Kit",
  description: "Contact QR Kit. We typically reply within 1–2 business days at contact@qrkit.app.",
};

export default function Page() {
  const [sent, setSent] = useState(false);
  return (
    <main className="container py-8 max-w-md mx-auto">
      <h1 className="text-xl font-semibold mb-4">Contact</h1>
      <p className="mb-4">Email: <a className="underline" href="mailto:contact@qrkit.app">contact@qrkit.app</a></p>
      <form
        className="space-y-3 border rounded-md p-4 bg-muted/20"
        onSubmit={e => { e.preventDefault(); setSent(true); }}
        autoComplete="off"
      >
        <label className="block">
          <span className="text-sm">Your name</span>
          <input type="text" required className="mt-1 block w-full border rounded px-2 py-1" />
        </label>
        <label className="block">
          <span className="text-sm">Your email</span>
          <input type="email" required className="mt-1 block w-full border rounded px-2 py-1" />
        </label>
        <label className="block">
          <span className="text-sm">Message</span>
          <textarea required rows={3} className="mt-1 block w-full border rounded px-2 py-1" />
        </label>
        <button type="submit" className="bg-primary text-white rounded px-4 py-2">Send</button>
        <div className="text-xs text-gray-500 mt-2">We typically reply within 1–2 business days at contact@qrkit.app.</div>
        {sent && <div className="text-green-600 text-sm mt-2">Message sent (demo only, not delivered).</div>}
      </form>
    </main>
  );
}