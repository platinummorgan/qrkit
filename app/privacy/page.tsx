export const metadata = { title: "Privacy Policy — QR Kit" };
export default function Page() {
  return (
    <main className="container py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      
      <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
        <p className="text-lg text-muted-foreground">
          Last updated: October 2025
        </p>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Commitment to Your Privacy</h2>
          <p>
            At QR Kit, we believe privacy is a fundamental right. Unlike traditional QR code generators 
            that upload your data to remote servers, QR Kit processes everything locally in your web browser. 
            This means your sensitive information—whether it's a website URL, Wi-Fi password, or personal 
            contact details—never leaves your device.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Data Collection and Storage</h2>
          <p>
            <strong>QR Code Generation:</strong> All QR code generation happens entirely in your browser 
            using client-side JavaScript. We do not collect, store, transmit, or have access to any data 
            you enter into the QR code generator. Your URLs, Wi-Fi credentials, contact information, and 
            any other data you encode in QR codes remain exclusively on your device.
          </p>
          <p>
            <strong>No Server-Side Processing:</strong> The data you input is processed locally by your 
            browser and is never sent to our servers. We have no ability to see, store, or access any 
            information you encode in your QR codes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Analytics and Cookies</h2>
          <p>
            <strong>Google Analytics:</strong> We use Google Analytics to understand how visitors use our 
            site and to improve the user experience. This service collects anonymous usage data such as 
            page views, session duration, and general geographic location (country/city level). No personally 
            identifiable information is collected through Analytics.
          </p>
          <p>
            <strong>Advertising:</strong> We use Google AdSense to display advertisements. AdSense may use 
            cookies and similar technologies to serve ads based on your prior visits to our site or other 
            websites. You can opt out of personalized advertising by visiting{' '}
            <a href="https://www.google.com/settings/ads" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
              Google's Ads Settings
            </a>.
          </p>
          <p>
            <strong>Essential Cookies:</strong> We use minimal essential cookies required for the basic 
            functionality of the website, such as consent management for advertising preferences.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Third-Party Services</h2>
          <p>
            Our website uses the following third-party services:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Google Analytics:</strong> For anonymous usage statistics and site improvement
            </li>
            <li>
              <strong>Google AdSense:</strong> For displaying advertisements to support the free service
            </li>
            <li>
              <strong>Vercel:</strong> For hosting and content delivery
            </li>
          </ul>
          <p>
            These services may collect limited technical information such as IP addresses, browser types, 
            and referring pages. Please review their respective privacy policies for more information.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Your Data Rights</h2>
          <p>
            Since we don't collect or store any personal data from your QR code generation activities, 
            there is no personal data for us to provide, modify, or delete. The anonymous analytics data 
            collected by Google Analytics is subject to Google's privacy policy and retention practices.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Children's Privacy</h2>
          <p>
            Our service is not directed to children under the age of 13. We do not knowingly collect 
            personal information from children under 13. If you are a parent or guardian and believe 
            your child has provided us with personal information, please contact us.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Changes to This Privacy Policy</h2>
          <p>
            We may update this privacy policy from time to time. We will notify you of any changes by 
            posting the new privacy policy on this page and updating the "Last updated" date.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
          <p>
            If you have any questions about this privacy policy, please contact us at{' '}
            <a href="mailto:admin@ripstuff.net" className="text-primary hover:underline">
              admin@ripstuff.net
            </a>.
          </p>
        </section>
      </div>
    </main>
  );
}