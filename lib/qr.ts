import QRCode from 'qrcode';

export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export interface QROptions {
  text: string;
  size: number;
  margin: number;
  errorCorrectionLevel: ErrorCorrectionLevel;
  foregroundColor: string;
  backgroundColor: string;
}

/**
 * Builds Wi-Fi QR code payload string
 */
export function buildWifiPayload(data: {
  ssid: string;
  encryption: string;
  password: string;
  hidden: boolean;
}): string {
  const { ssid, encryption, password, hidden } = data;
  
  // Escape special characters in SSID and password
  const escapedSsid = ssid.replace(/[\\;,:\"]/g, '\\$&');
  const escapedPassword = password.replace(/[\\;,:\"]/g, '\\$&');
  
  return `WIFI:T:${encryption};S:${escapedSsid};P:${escapedPassword};H:${hidden ? 'true' : 'false'};`;
}

/**
 * Builds vCard QR code payload string (vCard 3.0 format)
 */
export function buildVcardPayload(data: {
  firstName: string;
  lastName: string;
  company: string;
  title: string;
  mobile: string;
  email: string;
  website: string;
  street: string;
  city: string;
  region: string;
  postal: string;
  country: string;
}): string {
  const {
    firstName, lastName, company, title, mobile, email, website,
    street, city, region, postal, country
  } = data;

  const fullName = [firstName, lastName].filter(Boolean).join(' ');
  
  let vcard = 'BEGIN:VCARD\\n';
  vcard += 'VERSION:3.0\\n';
  
  if (lastName || firstName) {
    vcard += `N:${lastName};${firstName};;;\\n`;
  }
  
  if (fullName) {
    vcard += `FN:${fullName}\\n`;
  }
  
  if (company) {
    vcard += `ORG:${company}\\n`;
  }
  
  if (title) {
    vcard += `TITLE:${title}\\n`;
  }
  
  if (mobile) {
    vcard += `TEL;TYPE=CELL:${mobile}\\n`;
  }
  
  if (email) {
    vcard += `EMAIL;TYPE=INTERNET:${email}\\n`;
  }
  
  if (website) {
    vcard += `URL:${website}\\n`;
  }
  
  // Address (only add if at least one field is filled)
  if (street || city || region || postal || country) {
    vcard += `ADR;TYPE=HOME:;;${street};${city};${region};${postal};${country}\\n`;
  }
  
  vcard += 'END:VCARD';
  
  return vcard;
}

/**
 * Generates QR code as SVG string
 */
export async function generateQrSvg(options: QROptions): Promise<string> {
  try {
    const qrOptions = {
      type: 'svg' as const,
      width: options.size,
      margin: options.margin,
      errorCorrectionLevel: options.errorCorrectionLevel,
      color: {
        dark: options.foregroundColor,
        light: options.backgroundColor,
      },
    };

    return await QRCode.toString(options.text, qrOptions);
  } catch (error) {
    throw new Error(`Failed to generate QR code: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Generates QR code as data URL (PNG)
 */
export async function generateQrDataUrl(options: QROptions): Promise<string> {
  try {
    const qrOptions = {
      type: 'image/png' as const,
      width: options.size,
      margin: options.margin,
      errorCorrectionLevel: options.errorCorrectionLevel,
      color: {
        dark: options.foregroundColor,
        light: options.backgroundColor,
      },
    };

    return await QRCode.toDataURL(options.text, qrOptions);
  } catch (error) {
    throw new Error(`Failed to generate QR code: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Normalizes URL by adding protocol if missing
 */
export function normalizeUrl(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return trimmed;
  
  if (!/^https?:\/\//i.test(trimmed)) {
    // Check if it looks like a domain
    if (/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(trimmed)) {
      return `https://${trimmed}`;
    }
  }
  
  return trimmed;
}

/**
 * Gets the raw payload text that will be encoded in the QR code
 */
export function getPayloadText(type: 'url' | 'wifi' | 'vcard', data: any): string {
  switch (type) {
    case 'url':
      return normalizeUrl(data.url || '');
    case 'wifi':
      return buildWifiPayload(data);
    case 'vcard':
      return buildVcardPayload(data);
    default:
      return '';
  }
}

/**
 * Adds a logo overlay to SVG (for center logo feature)
 */
export function addLogoToSvg(svgContent: string, logoDataUrl: string, logoSize: number): string {
  // Parse the SVG to get dimensions
  const viewBoxMatch = svgContent.match(/viewBox="0 0 (\d+) (\d+)"/);
  if (!viewBoxMatch) return svgContent;
  
  const width = parseInt(viewBoxMatch[1]);
  const height = parseInt(viewBoxMatch[2]);
  
  // Calculate logo position (center)
  const logoX = (width - logoSize) / 2;
  const logoY = (height - logoSize) / 2;
  
  // Insert logo image element before closing svg tag
  const logoElement = `<image x="${logoX}" y="${logoY}" width="${logoSize}" height="${logoSize}" href="${logoDataUrl}" />`;
  const updatedSvg = svgContent.replace('</svg>', `${logoElement}</svg>`);
  
  return updatedSvg;
}