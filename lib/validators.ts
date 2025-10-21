export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validates and normalizes URL inputs
 */
export function validateUrl(url: string): ValidationResult {
  if (!url.trim()) {
    return { isValid: false, error: 'URL is required' };
  }

  let normalizedUrl = url.trim();
  
  // Add protocol if missing
  if (!/^https?:\/\//i.test(normalizedUrl)) {
    // Check if it looks like a domain
    if (/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(normalizedUrl)) {
      normalizedUrl = `https://${normalizedUrl}`;
    } else {
      return { isValid: false, error: 'Please enter a valid URL' };
    }
  }

  try {
    new URL(normalizedUrl);
    return { isValid: true };
  } catch {
    return { isValid: false, error: 'Please enter a valid URL' };
  }
}

/**
 * Validates Wi-Fi form inputs
 */
export function validateWifi(data: {
  ssid: string;
  encryption: string;
  password: string;
}): ValidationResult {
  if (!data.ssid.trim()) {
    return { isValid: false, error: 'Network name (SSID) is required' };
  }

  if (data.ssid.length > 32) {
    return { isValid: false, error: 'Network name must be 32 characters or less' };
  }

  // Password required for encrypted networks
  if (data.encryption !== 'nopass' && !data.password.trim()) {
    return { isValid: false, error: 'Password is required for encrypted networks' };
  }

  // WEP password validation (10 or 26 hex chars, or 5/13 ASCII chars)
  if (data.encryption === 'WEP' && data.password) {
    const isHex = /^[0-9A-Fa-f]+$/.test(data.password);
    const length = data.password.length;
    
    if (isHex) {
      if (length !== 10 && length !== 26) {
        return { isValid: false, error: 'WEP hex key must be 10 or 26 characters' };
      }
    } else {
      if (length !== 5 && length !== 13) {
        return { isValid: false, error: 'WEP ASCII key must be 5 or 13 characters' };
      }
    }
  }

  return { isValid: true };
}

/**
 * Validates vCard form inputs
 */
export function validateVcard(data: {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  website: string;
}): ValidationResult {
  // At least one field must be filled
  const hasContent = [data.firstName, data.lastName, data.email, data.mobile, data.website]
    .some((value: string) => value.trim());
  if (!hasContent) {
    return { isValid: false, error: 'Please fill in at least one field' };
  }

  // Email validation if provided
  if (data.email && data.email.trim()) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email.trim())) {
      return { isValid: false, error: 'Please enter a valid email address' };
    }
  }

  // Website validation if provided
  if (data.website && data.website.trim()) {
    const urlValidation = validateUrl(data.website);
    if (!urlValidation.isValid) {
      return { isValid: false, error: 'Please enter a valid website URL' };
    }
  }

  // Phone number basic validation if provided
  if (data.mobile && data.mobile.trim()) {
    const phoneRegex = /^[\+]?[\d\s\-\(\)]{7,}$/;
    if (!phoneRegex.test(data.mobile.trim())) {
      return { isValid: false, error: 'Please enter a valid phone number' };
    }
  }

  return { isValid: true };
}

/**
 * Validates color hex values
 */
export function validateColor(color: string): ValidationResult {
  const hexRegex = /^#[0-9A-Fa-f]{6}$/;
  if (!hexRegex.test(color)) {
    return { isValid: false, error: 'Please enter a valid hex color (e.g., #000000)' };
  }
  return { isValid: true };
}

/**
 * Validates QR code size
 */
export function validateSize(size: number): ValidationResult {
  if (size < 128 || size > 1024) {
    return { isValid: false, error: 'Size must be between 128 and 1024 pixels' };
  }
  return { isValid: true };
}

/**
 * Validates margin/quiet zone
 */
export function validateMargin(margin: number): ValidationResult {
  if (margin < 0 || margin > 8) {
    return { isValid: false, error: 'Margin must be between 0 and 8' };
  }
  return { isValid: true };
}