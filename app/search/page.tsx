"use client";
import { useState } from "react";

const guides = [
	{ title: "Event Check-In QR Codes", href: "/guides/event-checkin" },
	{ title: "Brand-Safe QR Design", href: "/guides/brand-safe-qr-design" },
	{ title: "Wi-Fi QR Codes", href: "/guides/wifi-qr-codes" },
];

export default function SearchPage() {
	const [query, setQuery] = useState("");
	const filtered = guides.filter((g) =>
		g.title.toLowerCase().includes(query.toLowerCase())
	);
	return (
		<main className="container mx-auto max-w-md py-10">
			<h1 className="text-xl font-semibold mb-4">Search Guides</h1>
			<input
				type="text"
				placeholder="Search guide titles..."
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				className="border rounded px-2 py-1 w-full mb-4"
			/>
			<ul className="space-y-2">
				{filtered.length === 0 && (
					<li className="text-gray-500">No guides found.</li>
				)}
				{filtered.map((g) => (
					<li key={g.href}>
						<a
							href={g.href}
							className="underline text-blue-600"
						>
							{g.title}
						</a>
					</li>
				))}
			</ul>
		</main>
	);
}