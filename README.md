# QR Now

QR Now is a free, privacy-focused QR code generator that works entirely in your browser.

## Features

- **URL QR Codes** - Generate QR codes for any website link
- **Wi-Fi QR Codes** - Share Wi-Fi credentials easily
- **vCard QR Codes** - Create contact card QR codes
- **SVG & PNG Export** - Download in vector or raster formats
- **Color Customization** - Customize foreground and background colors
- **Privacy First** - All generation happens locally, no data stored
- **Responsive Design** - Works on desktop and mobile
- **Accessibility** - Full keyboard navigation and screen reader support

## Tech Stack

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **QRCode.js** for QR generation
- **Vercel** for deployment

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd qrnow
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Deploy with one click
4. Set environment variables if needed:
   - `NEXT_PUBLIC_BASE_URL` - Your production domain

Or use the Vercel CLI:
```bash
vercel --prod
```

## Privacy

QR Now is built with privacy as the core principle:

- All QR code generation happens entirely in your browser
- No data is sent to servers or stored anywhere
- No tracking or analytics on user input
- Works offline after initial load

## License

MIT License - see LICENSE file for details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Support

For questions or support, contact: admin@ripstuff.net