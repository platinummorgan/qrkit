import "../styles/globals.css";
import type { Metadata } from "next";
import Script from "next/script";

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "https://qrkit.app";
const TITLE = "QR Kit — Instant QR Codes";
const DESC =
  "Create QR codes for links, Wi-Fi, and vCards. PNG/SVG export. No sign-up. Privacy-first.";

const ADSENSE_CLIENT = "ca-pub-1190913191003622";

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: TITLE,
  description: DESC,
  alternates: { canonical: "https://qrkit.app" },
  openGraph: {
    title: TITLE,
    description: DESC,
    url: BASE,
  siteName: "QR Kit",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
    images: ["/opengraph-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Organization and WebSite JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Platova Labs",
                "url": "https://platovalabs.com",
                "logo": "https://qrkit.app/logo.png"
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "QR Kit",
                "url": "https://qrkit.app"
              }
            ])
          }}
        />
        {/* Google Analytics gtag */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-6EEX1HWJ7B"
          strategy="afterInteractive"
        />
        <Script id="gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6EEX1HWJ7B');
          `}
        </Script>
        {/* Google site verification for Search Console / AdSense */}
        <meta name="google-site-verification" content="f82Djvi3cjW06LUWt38LvTdZHnpNTxTQYqEZS7nmRtA" />
        {/* Funding Choices CMP */}
        <Script
          id="fc-cmp"
          strategy="afterInteractive"
          src={`https://fundingchoicesmessages.google.com/i/${(process.env.NEXT_PUBLIC_ADSENSE_CLIENT || 'ca-pub-1190913191003622').replace('ca-pub-','')}?ers=1`}
        />
        <Script id="fc-cmp-signal" strategy="afterInteractive">
          {`(function(){function s(){if(!window.frames['__fc_loaded']){if(document.body){const i=document.createElement('iframe');i.style.display='none';i.name='__fc_loaded';document.body.appendChild(i);}else{setTimeout(s,50);}}}s();})();`}
        </Script>
        {/* AdSense loader moved to home page so adsbygoogle doesn't appear in legal pages' view-source */}
        {/* SoftwareApplication JSON-LD */}
        <Script id="app-jsonld" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "QR Kit",
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "Web",
            description: DESC,
            url: BASE,
          })}
        </Script>
        {/* FAQ JSON-LD (if the page shows an FAQ section) */}
        <Script id="faq-jsonld" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Is my data uploaded?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "All QR generation happens in your browser. No uploads or storage.",
                },
              },
              {
                "@type": "Question",
                name: "What formats can I export?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "You can export PNG and SVG at multiple sizes.",
                },
              },
              {
                "@type": "Question",
                name: "Which types of QR codes are supported?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "URL, Wi-Fi (SSID/security/password), and vCard contact QRs.",
                },
              },
            ],
          })}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}