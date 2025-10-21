import type { Metadata } from 'next';
import Link from 'next/link';
import GuideAd from '@/components/GuideAd';

export const metadata: Metadata = {
  title: 'Creating Wi-Fi QR Codes for Easy Network Sharing — QR Kit',
  description: 'Complete guide to generating Wi-Fi QR codes that allow guests to connect to your network instantly without typing passwords.',
};

export default function WiFiQRCodesGuide() {
  return (
    <main className="container py-12 max-w-4xl">
      <nav className="mb-8">
        <Link href="/guides" className="text-primary hover:underline">
          ← Back to Guides
        </Link>
      </nav>

      <article className="prose prose-lg dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold mb-6">
          Creating Wi-Fi QR Codes for Easy Network Sharing
        </h1>

        <p className="text-lg text-muted-foreground mb-8">
          Say goodbye to dictating complicated Wi-Fi passwords to guests. Learn how to create a Wi-Fi QR code 
          that allows anyone to connect to your network instantly by simply scanning with their smartphone.
        </p>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mt-8 mb-4">What is a Wi-Fi QR Code?</h2>
          <p>
            A Wi-Fi QR code is a special type of QR code that contains your wireless network credentials—specifically 
            your network name (SSID), security type (WPA/WPA2/WEP), and password—encoded in a standardized format. When 
            someone scans this QR code with their smartphone camera, their device automatically detects the Wi-Fi 
            credentials and offers to connect to the network without manual entry.
          </p>
          <p>
            This technology is built into most modern smartphones (iOS 11+ and Android 10+) and eliminates the need 
            to share passwords verbally or via text. It's particularly useful for businesses, Airbnb hosts, coffee 
            shops, and anyone who frequently has guests needing network access.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mt-8 mb-4">How to Create a Wi-Fi QR Code</h2>
          
          <h3 className="text-2xl font-semibold mt-6 mb-3">Step 1: Gather Your Network Information</h3>
          <p>
            Before generating your QR code, you'll need three pieces of information:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>
              <strong>Network Name (SSID):</strong> This is the name of your Wi-Fi network that appears when 
              people search for available networks. You can find this in your router settings or on the sticker 
              on your router.
            </li>
            <li>
              <strong>Security Type:</strong> Most modern networks use WPA/WPA2 security. Older networks might 
              use WEP, and some guest networks use no security (Open). Check your router settings if you're unsure.
            </li>
            <li>
              <strong>Password:</strong> The password required to connect to your network. This is case-sensitive 
              and should be entered exactly as configured in your router.
            </li>
          </ul>

          <h3 className="text-2xl font-semibold mt-6 mb-3">Step 2: Use QR Kit's Wi-Fi Generator</h3>
          <p>
            Navigate to <Link href="/" className="text-primary hover:underline">QR Kit's home page</Link> and 
            select the "Wi-Fi" tab. Fill in the following fields:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>Network name (SSID)</li>
            <li>Security type (WPA/WPA2, WEP, or None)</li>
            <li>Password (if your network is secured)</li>
            <li>Check "Hidden Network" if your SSID is hidden from broadcast</li>
          </ul>
          <p>
            The QR code will generate automatically as you type. QR Kit processes everything in your browser, 
            so your Wi-Fi password never leaves your device—ensuring complete privacy and security.
          </p>

          <h3 className="text-2xl font-semibold mt-6 mb-3">Step 3: Customize and Download</h3>
          <p>
            Customize your QR code's appearance using the color pickers to match your brand or décor. Choose 
            colors with sufficient contrast (dark foreground, light background) to ensure reliable scanning. 
            Download your QR code in either:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>
              <strong>PNG format:</strong> For digital use, social media, or online sharing
            </li>
            <li>
              <strong>SVG format:</strong> For printing at any size without quality loss—perfect for signs, 
              table tents, or business cards
            </li>
          </ul>
        </section>

        <section id="content-section" className="mb-12">
          <h2 className="text-3xl font-semibold mt-8 mb-4">Best Practices for Wi-Fi QR Codes</h2>
          
          <h3 className="text-2xl font-semibold mt-6 mb-3">Placement and Visibility</h3>
          <p>
            <strong>Position strategically:</strong> Place your Wi-Fi QR code in locations where guests naturally 
            gather or first arrive—entryways, reception desks, guest rooms, or table tents. The QR code should be 
            at eye level and well-lit for easy scanning.
          </p>
          <p>
            <strong>Print at appropriate size:</strong> For QR codes that will be scanned from a distance, print 
            them larger. A minimum size of 2x2 inches (5x5 cm) is recommended for close-range scanning, but 4x4 
            inches or larger works better for across-the-room scanning.
          </p>

          <h3 className="text-2xl font-semibold mt-6 mb-3">Security Considerations</h3>
          <p>
            <strong>Guest network recommended:</strong> For businesses and hosts, create a separate guest network 
            with a unique password and limited access to your main network resources. This protects your primary 
            devices and sensitive data while still providing internet access to guests.
          </p>
          <p>
            <strong>Regular password rotation:</strong> Change your Wi-Fi password periodically (every 3-6 months) 
            and generate a new QR code. This is especially important for businesses or short-term rental properties 
            where many people have access to the code.
          </p>

          <h3 className="text-2xl font-semibold mt-6 mb-3">Design and Branding</h3>
          <p>
            <strong>Add context text:</strong> Include a label like "Scan for Free Wi-Fi" or "Connect to Guest Network" 
            above or below your QR code so people understand what it does.
          </p>
          <p>
            <strong>Brand consistency:</strong> Customize the QR code colors to match your brand identity, but 
            maintain sufficient contrast (at least 50% difference between foreground and background) to ensure 
            reliable scanning across different devices and lighting conditions.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mt-8 mb-4">Common Use Cases</h2>
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <strong>Restaurants and Cafes:</strong> Print QR codes on table tents or menu cards so customers 
              can connect while waiting for service
            </li>
            <li>
              <strong>Hotels and Airbnb:</strong> Place QR codes in guest rooms, welcome booklets, or check-in 
              materials for hassle-free connectivity
            </li>
            <li>
              <strong>Offices and Co-working Spaces:</strong> Provide guest Wi-Fi access without sharing passwords 
              verbally or storing them in insecure locations
            </li>
            <li>
              <strong>Events and Conferences:</strong> Print large QR codes at entrances or on signage for attendee 
              connectivity
            </li>
            <li>
              <strong>Retail Stores:</strong> Offer free Wi-Fi to customers to improve their shopping experience 
              and encourage longer visits
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mt-8 mb-4">Troubleshooting</h2>
          
          <h3 className="text-2xl font-semibold mt-6 mb-3">QR Code Won't Scan</h3>
          <p>
            If guests report that the QR code won't scan, check these common issues:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Ensure the QR code is printed clearly without smudging or pixelation</li>
            <li>Verify adequate contrast between the QR code and its background</li>
            <li>Check that lighting is sufficient—QR codes are harder to scan in dim conditions</li>
            <li>Make sure the QR code isn't damaged, crumpled, or behind reflective surfaces</li>
          </ul>

          <h3 className="text-2xl font-semibold mt-6 mb-3">Device Won't Connect After Scanning</h3>
          <p>
            If the device recognizes the QR code but fails to connect:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Verify the password is correct and matches your router configuration exactly (case-sensitive)</li>
            <li>Confirm the security type (WPA/WPA2/WEP) matches your router settings</li>
            <li>Check if your router has MAC address filtering enabled that might block unknown devices</li>
            <li>Ensure your network is broadcasting its SSID (unless you've specifically marked it as hidden)</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mt-8 mb-4">Privacy and Security</h2>
          <p>
            When using QR Kit to generate your Wi-Fi QR code, your network credentials are processed entirely 
            in your browser. We don't collect, store, or transmit your Wi-Fi password to any servers. The QR 
            code generation happens client-side using JavaScript, ensuring your sensitive network information 
            remains completely private.
          </p>
          <p>
            However, remember that anyone who can scan your QR code can access your network. For this reason, 
            we strongly recommend:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Using a separate guest network isolated from your main network and devices</li>
            <li>Limiting bandwidth or setting time restrictions for guest access if your router supports it</li>
            <li>Changing your Wi-Fi password periodically, especially in high-traffic environments</li>
            <li>Monitoring connected devices through your router's admin interface</li>
          </ul>
        </section>

        {/* Ad within content */}
        <div className="my-12 border-t border-b border-border py-8">
          <GuideAd slotId={process.env.NEXT_PUBLIC_AD_SLOT_INLINE!} />
        </div>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mt-8 mb-4">Conclusion</h2>
          <p>
            Wi-Fi QR codes are a simple, effective way to share network access without the hassle of verbal 
            password sharing or security compromises. By following the best practices outlined in this guide, 
            you can create professional, secure Wi-Fi QR codes that improve the guest experience while 
            maintaining network security.
          </p>
          <p>
            Ready to create your Wi-Fi QR code? Head to <Link href="/" className="text-primary hover:underline">
            QR Kit's generator</Link> and create your custom QR code in seconds—completely free and private.
          </p>
        </section>
      </article>

      <div className="mt-12 pt-8 border-t border-border">
        <Link href="/guides" className="text-primary hover:underline">
          ← Back to all guides
        </Link>
      </div>
    </main>
  );
}
