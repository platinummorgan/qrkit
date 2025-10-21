 'use client';

import { useState, useCallback, useEffect } from 'react';
import Tabs from '@/components/Tabs';
import UrlForm from '@/components/UrlForm';
import WifiForm from '@/components/WifiForm';
import VcardForm from '@/components/VcardForm';
import QrPreview from '@/components/QrPreview';
import { getPayloadText } from '@/lib/qr';
import { isBrowser } from '@/lib/isBrowser';

interface QrData {
  type: 'url' | 'wifi' | 'vcard';
  data: any;
  isValid: boolean;
}

export default function HomePage() {
  // Preload with a sample URL so SSR/crawlers see real content
  const [qrData, setQrData] = useState<QrData>({
    type: 'url',
    data: { url: 'https://qrkit.app' },
    isValid: true,
  });
  const [showFaq, setShowFaq] = useState(true); // Expanded by default for crawlers
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Emit qr-generated event when valid QR is created
  useEffect(() => {
    if (qrData.isValid && isBrowser) {
      window.dispatchEvent(new Event('qr-generated'));
    }
  }, [qrData.isValid]);

  // Handle data changes from forms
  const handleUrlData = useCallback((data: { url: string }, isValid: boolean) => {
    setQrData({ type: 'url', data, isValid });
  }, []);

  const handleWifiData = useCallback((data: any, isValid: boolean) => {
    setQrData({ type: 'wifi', data, isValid });
  }, []);

  const handleVcardData = useCallback((data: any, isValid: boolean) => {
    setQrData({ type: 'vcard', data, isValid });
  }, []);

  // Handle tab changes
  const handleTabChange = (tabId: string) => {
    const newType = tabId as 'url' | 'wifi' | 'vcard';
    setQrData(prev => ({
      ...prev,
      type: newType,
      isValid: false, // Reset validity when changing tabs
    }));
  };

  // Toggle dark mode
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (isBrowser) {
      document.documentElement.classList.toggle('dark');
    }
  };

  // Get payload text for QR generation
  const payloadText = qrData.isValid ? getPayloadText(qrData.type, qrData.data) : '';

  // FAQ data
  const faqItems = [
    {
      question: "What is a QR code?",
      answer: "A QR code (Quick Response code) is a two-dimensional barcode that can store various types of information such as URLs, Wi-Fi credentials, or contact information. It can be scanned by smartphones and other devices with a camera. QR codes were invented in 1994 by Denso Wave, a subsidiary of Toyota, for tracking automotive parts during manufacturing. Today, they're used worldwide for everything from marketing campaigns to contactless payments. The 'Quick Response' name refers to the code's ability to be decoded at high speed compared to traditional barcodes."
    },
    {
      question: "How do I generate a Wi-Fi QR code?",
      answer: "Select the Wi-Fi tab, enter your network name (SSID), choose the security type (WPA/WPA2, WEP, or None), enter the password if required, and optionally mark if it's a hidden network. The QR code will be generated automatically as you type. This QR code can be scanned by any modern smartphone (iOS 11+ or Android 10+) to automatically connect to your network without manually entering the password. It's perfect for guest networks, coffee shops, hotels, or anywhere you want to share Wi-Fi access conveniently and securely. The credentials are encoded in a standardized WIFI: format that all major smartphone operating systems recognize."
    },
    {
      question: "What is a vCard QR code?",
      answer: "A vCard QR code contains contact information such as name, phone number, email, company, and address in a digital business card format. When scanned, it can automatically add the contact to the user's phone contacts app without manual data entry. vCard (Virtual Contact File) is an industry-standard format supported by virtually all smartphones and contact management applications. This makes vCard QR codes ideal for business cards, email signatures, conference badges, and networking events. Instead of manually typing contact details or exchanging physical business cards that can be lost, people can simply scan your vCard QR code to instantly save your information."
    },
    {
      question: "Is my data stored on your servers?",
      answer: "No, absolutely not. All QR code generation happens entirely in your web browser using client-side JavaScript. We don't store, upload, or track any of your data. Your Wi-Fi passwords, URLs, contact information, and any other data you enter never leaves your device. This client-side approach ensures complete privacy and security—your sensitive information stays under your control at all times. You can even use QR Kit offline once the page has loaded. We built QR Kit with a privacy-first philosophy because we believe your data belongs to you and only you. Unlike many online QR code generators that require registration or upload your data to their servers, QR Kit processes everything locally in your browser."
    },
    {
      question: "How can I change QR code colors?",
      answer: "Use the color pickers in the customization section to change the foreground (the dark pattern squares) and background (the light area behind the pattern) colors of your QR code. You can also enter hex color codes directly for precise color matching. When customizing colors, ensure sufficient contrast between foreground and background (at least 50% difference) so the QR code remains scannable by cameras. Dark foreground on light background works best. Avoid low-contrast combinations like light gray on white or dark blue on black, as these can make scanning difficult or impossible. You can match your brand colors while maintaining scannability by testing the QR code with multiple devices after customization."
    },
    {
      question: "What formats can I download?",
      answer: "You can download your QR code as SVG (Scalable Vector Graphics) or PNG (Portable Network Graphics). SVG is a vector format that scales infinitely without quality loss, making it perfect for print materials like posters, business cards, banners, and signage where you need crisp edges at any size. PNG is a raster format with a fixed resolution, ideal for digital use such as websites, social media posts, email signatures, and mobile apps. For professional printing, always choose SVG. For quick digital sharing or when file size matters, PNG works great. Both formats preserve your color customizations and maintain full QR code functionality."
    },
    {
      question: "Do I need to sign up or create an account?",
      answer: "No registration required! QR Kit is completely free to use without creating an account, providing an email address, or filling out any forms. Simply visit the site and start generating QR codes immediately. There are no usage limits, no premium tiers, and no hidden costs. We believe in providing a straightforward, accessible tool that respects your time and privacy. You can generate unlimited QR codes, download them in multiple formats, and use them for any purpose—commercial or personal—without restrictions."
    },
    {
      question: "Can I use QR codes offline after generating them?",
      answer: "Yes, once you've generated and downloaded a QR code, it works completely offline. The QR code itself is just an image file (SVG or PNG) that contains your encoded information. It doesn't require an internet connection to be scanned. When someone scans your QR code with their smartphone, the device reads the encoded data directly from the visual pattern—no server lookup or internet connection is needed. This makes QR codes extremely reliable for environments with poor or no connectivity. Note that if your QR code contains a URL, the person scanning will need internet to visit that website, but the QR code scanning process itself works offline."
    },
    {
      question: "Are there any size or usage limits?",
      answer: "No limits whatsoever. Generate as many QR codes as you need, customize them freely, and download them in any format. There are no daily limits, no maximum number of QR codes per user, and no restrictions on commercial use. Whether you're creating one QR code for a personal project or hundreds for a business campaign, QR Kit handles it all for free. The only practical limitation is your browser's memory, which can easily handle thousands of QR codes without issue."
    },
    {
      question: "What devices can scan QR codes?",
      answer: "Nearly all modern smartphones can scan QR codes using their built-in camera apps without additional software. iOS devices (iPhone, iPad) with iOS 11 or later have native QR code scanning built into the Camera app. Android devices running Android 9 (Pie) or later typically include QR code scanning in the default camera app, though this varies by manufacturer. Many Android devices running older versions can scan QR codes through Google Lens or dedicated QR scanner apps available for free in the Google Play Store. Additionally, many tablets, some laptops with webcams, and dedicated barcode scanners support QR code recognition."
    },
    {
      question: "How do I test if my QR code works?",
      answer: "After generating your QR code, the easiest way to test it is to scan it with your smartphone camera. On iPhone, open the Camera app and point it at the QR code displayed on your computer screen—a notification will appear at the top if the code is recognized. On Android, open your camera app or Google Lens and point it at the code. For URL QR codes, verify the link opens correctly. For Wi-Fi codes, check that your device offers to connect to the network. For vCard codes, confirm that all contact fields are populated correctly when you preview adding the contact. It's good practice to test QR codes with multiple devices (both iOS and Android) before printing or distributing them widely."
    },
    {
      question: "Can I create QR codes for commercial use?",
      answer: "Absolutely! QR codes generated with QR Kit can be used for any purpose, including commercial applications. Use them on product packaging, marketing materials, business cards, restaurant menus, retail signage, event tickets, or anywhere else you need to share information quickly. There are no licensing fees, attribution requirements, or usage restrictions. QR codes themselves are an open standard—no one owns the technology, so you're free to use them however you need. Whether you're a small business owner, marketer, event organizer, or enterprise corporation, you can use QR Kit for all your QR code needs."
    }
  ];

  const tabs = [
    {
      id: 'url',
      label: 'URL',
      content: (
        <UrlForm 
          onDataChange={handleUrlData}
          onReset={() => setQrData(prev => ({ ...prev, isValid: false }))}
        />
      ),
    },
    {
      id: 'wifi',
      label: 'Wi-Fi',
      content: (
        <WifiForm 
          onDataChange={handleWifiData}
          onReset={() => setQrData(prev => ({ ...prev, isValid: false }))}
        />
      ),
    },
    {
      id: 'vcard',
      label: 'vCard',
      content: (
        <VcardForm 
          onDataChange={handleVcardData}
          onReset={() => setQrData(prev => ({ ...prev, isValid: false }))}
        />
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-foreground">
                QR Kit — Instant QR Code Generator
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkMode ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Create QR Codes Instantly
          </h2>
          <p className="text-xl text-muted-foreground mb-2">
            Generate QR codes for URLs, Wi-Fi networks, or contact cards
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            No sign-up required • Works offline after load • Privacy-focused
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href="/guides"
              className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:opacity-90 transition-opacity"
            >
              📚 View Guides & Tutorials
            </a>
          </div>
        </div>
      </section>

      {/* Intro Content Section - ~500 words */}
      <section className="bg-muted/30 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Free, Fast & Private QR Code Generator
            </h2>
            
            <p className="text-muted-foreground leading-relaxed mb-4">
              QR Kit is a powerful, browser-based QR code generator that puts your privacy first. 
              Unlike traditional online QR code services that upload your data to remote servers, 
              QR Kit processes everything locally in your web browser. This means your sensitive 
              information—whether it's a website URL, Wi-Fi password, or personal contact details—never 
              leaves your device.
            </p>

            <h3 className="text-2xl font-semibold text-foreground mt-8 mb-4">
              Why Choose QR Kit?
            </h3>

            <p className="text-muted-foreground leading-relaxed mb-4">
              <strong>Complete Privacy:</strong> All QR code generation happens entirely in your browser 
              using client-side JavaScript. We don't collect, store, or transmit any of your data to our 
              servers. Your information stays on your device, giving you complete control and peace of mind.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-4">
              <strong>No Registration Required:</strong> Start creating QR codes immediately without creating 
              an account, providing an email address, or filling out lengthy forms. Simply visit the site and 
              begin generating codes in seconds.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-4">
              <strong>Multiple QR Code Types:</strong> Generate QR codes for various purposes including website 
              URLs, Wi-Fi network credentials (SSID, password, and security type), and vCard contact information 
              (name, phone, email, company, and address). Each type is optimized for its specific use case to 
              ensure maximum compatibility with QR code scanners.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-4">
              <strong>Customizable Design:</strong> Personalize your QR codes with custom colors for both the 
              foreground (the dark pattern) and background. Whether you need a QR code that matches your brand 
              colors or simply want a unique look, our color picker makes customization easy.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-4">
              <strong>Professional Export Options:</strong> Download your generated QR codes in high-quality 
              SVG (vector) format for print materials and professional use, or PNG (raster) format for digital 
              applications and web use. SVG files scale infinitely without quality loss, making them perfect 
              for business cards, posters, and signage.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-4">
              <strong>Works Offline:</strong> Once the page loads, QR Kit continues to function even without 
              an internet connection. Generate as many QR codes as you need, customize them, and download them—all 
              without needing to stay online.
            </p>

            <h3 className="text-2xl font-semibold text-foreground mt-8 mb-4">
              How It Works
            </h3>

            <p className="text-muted-foreground leading-relaxed mb-6">
              Simply select the type of QR code you want to create from the tabs above, fill in the required 
              information, and watch your QR code generate in real-time. You can customize colors, adjust the 
              size, and download your code immediately. The entire process takes just seconds, and because 
              everything runs in your browser, it's both fast and secure. Whether you're sharing a website link, 
              providing Wi-Fi access to guests, or distributing contact information at an event, QR Kit makes 
              the process effortless.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Forms */}
          <div className="space-y-6">
            <div className="bg-card rounded-lg border border-border p-6">
              <Tabs 
                tabs={tabs}
                defaultTab="url"
                onChange={handleTabChange}
              />
            </div>

            {/* Privacy Note */}
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <span className="text-green-500" role="img" aria-label="Shield">🛡️</span>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800 dark:text-green-200">
                    Privacy First
                  </h3>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                    All QR code generation happens in your browser. We don&apos;t upload or store your data.
                  </p>
                </div>
              </div>
            </div>


          </div>

          {/* Right Column - Preview */}
          <div className="space-y-6">
            <QrPreview 
              text={payloadText}
              isValidData={qrData.isValid}
            />

            {/* FAQ Section with embedded SafeAd - visible by default for crawlers */}
            <div id="faq" className="bg-card rounded-lg border border-border">
              <button
                onClick={() => setShowFaq(!showFaq)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg"
                aria-expanded={showFaq}
              >
                <h3 className="text-lg font-semibold text-foreground">
                  Frequently Asked Questions
                </h3>
                <span className={`transform transition-transform ${showFaq ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              
              {showFaq && (
                <div className="px-6 pb-6 space-y-4 border-t border-border mt-4 pt-4">
                  {faqItems.map((item, index) => (
                    <details key={index} className="group" open={index === 0}>
                      <summary className="cursor-pointer font-medium text-foreground hover:text-primary focus:outline-none focus:text-primary list-none">
                        <span className="flex items-center justify-between">
                          {item.question}
                          <span className="ml-2 transform group-open:rotate-180 transition-transform">
                            ▼
                          </span>
                        </span>
                      </summary>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                        {item.answer}
                      </p>
                    </details>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Footer */}
      <div className="lg:hidden mobile-sticky-bottom">
        <div className="flex space-x-3">
          <button
            disabled={!qrData.isValid}
            className="flex-1 btn-primary px-4 py-3 text-sm rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Download PNG
          </button>
          <button
            disabled={!qrData.isValid}
            className="flex-1 btn-secondary px-4 py-3 text-sm rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Share
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-muted/30 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold text-foreground mb-4">QR Kit</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Free, privacy-focused QR code generator. Create QR codes for URLs, Wi-Fi networks, 
                and contact information without compromising your data.
              </p>
              <div className="flex space-x-4">
                <a
                  href="/privacy"
                  className="text-sm text-primary hover:underline focus:outline-none focus:underline"
                >
                  Privacy Policy
                </a>
                <a
                  href="/terms"
                  className="text-sm text-primary hover:underline focus:outline-none focus:underline"
                >
                  Terms of Service
                </a>
                <a
                  href="/contact"
                  className="text-sm text-primary hover:underline focus:outline-none focus:underline"
                >
                  Contact
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4">Features</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>URL QR Codes</li>
                <li>Wi-Fi QR Codes</li>
                <li>vCard QR Codes</li>
                <li>SVG & PNG Export</li>
                <li>Color Customization</li>
                <li>No Data Storage</li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="/faq" className="hover:text-primary focus:text-primary focus:outline-none">
                    FAQ
                  </a>
                </li>
                <li>
                  <a 
                    href="mailto:admin@ripstuff.net" 
                    className="hover:text-primary focus:text-primary focus:outline-none"
                  >
                    Email Support
                  </a>
                </li>
              </ul>

              {/* Links */}
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-foreground mb-4">Links</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>
                    <a 
                      className="hover:underline" 
                      href="https://ripstuff.net" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      RipStuff
                    </a>
                  </li>
                  <li>
                    <a 
                      className="hover:underline" 
                      href="https://payofpath.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      PayoffPath
                    </a>
                  </li>
                </ul>
              </div>


            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-border">
            <p className="text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} QR Kit. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Removed mobile sticky ad to comply with AdSense review - only a single inline ad remains on this page */}
    </div>
  );
}