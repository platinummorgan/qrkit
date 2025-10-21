'use client';

import { useState, useEffect } from 'react';
import { validateWifi } from '@/lib/validators';

interface WifiData {
  ssid: string;
  encryption: string;
  password: string;
  hidden: boolean;
}

interface WifiFormProps {
  onDataChange: (data: WifiData, isValid: boolean) => void;
  onReset?: () => void;
}

const encryptionOptions = [
  { value: 'nopass', label: 'No Password' },
  { value: 'WPA', label: 'WPA/WPA2' },
  { value: 'WPA2', label: 'WPA2' },
  { value: 'WPA3', label: 'WPA3' },
  { value: 'WEP', label: 'WEP (Legacy)' },
];

export default function WifiForm({ onDataChange, onReset }: WifiFormProps) {
  const [ssid, setSsid] = useState('');
  const [encryption, setEncryption] = useState('WPA2');
  const [password, setPassword] = useState('');
  const [hidden, setHidden] = useState(false);
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);

  // Validate and notify parent of changes
  useEffect(() => {
    const data = { ssid, encryption, password, hidden };
    const validation = validateWifi(data);
    
    if (touched) {
      setError(validation.isValid ? '' : (validation.error || ''));
    }
    
    onDataChange(data, validation.isValid);
  }, [ssid, encryption, password, hidden, touched, onDataChange]);

  const handleFieldChange = (field: string, value: string | boolean) => {
    if (!touched) setTouched(true);
    
    switch (field) {
      case 'ssid':
        setSsid(value as string);
        break;
      case 'encryption':
        setEncryption(value as string);
        if (value === 'nopass') setPassword('');
        break;
      case 'password':
        setPassword(value as string);
        break;
      case 'hidden':
        setHidden(value as boolean);
        break;
    }
  };

  const handleReset = () => {
    setSsid('');
    setEncryption('WPA2');
    setPassword('');
    setHidden(false);
    setError('');
    setTouched(false);
    onReset?.();
  };

  const needsPassword = encryption !== 'nopass';

  return (
    <div className="space-y-4">
      {/* SSID Field */}
      <div>
        <label 
          htmlFor="ssid-input" 
          className="block text-sm font-medium text-foreground mb-2"
        >
          Network Name (SSID) <span className="text-destructive">*</span>
        </label>
        <input
          id="ssid-input"
          type="text"
          value={ssid}
          onChange={(e) => handleFieldChange('ssid', e.target.value)}
          placeholder="MyWiFiNetwork"
          className={`input-field w-full ${error && error.includes('SSID') ? 'border-destructive' : ''}`}
          maxLength={32}
          required
        />
        <p className="mt-1 text-xs text-muted-foreground">
          The name of your Wi-Fi network (max 32 characters)
        </p>
      </div>

      {/* Encryption Field */}
      <div>
        <label 
          htmlFor="encryption-select" 
          className="block text-sm font-medium text-foreground mb-2"
        >
          Security Type
        </label>
        <select
          id="encryption-select"
          value={encryption}
          onChange={(e) => handleFieldChange('encryption', e.target.value)}
          className="input-field w-full"
        >
          {encryptionOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <p className="mt-1 text-xs text-muted-foreground">
          Choose the security type of your Wi-Fi network
        </p>
      </div>

      {/* Password Field */}
      {needsPassword && (
        <div>
          <label 
            htmlFor="password-input" 
            className="block text-sm font-medium text-foreground mb-2"
          >
            Password <span className="text-destructive">*</span>
          </label>
          <div className="relative">
            <input
              id="password-input"
              type="password"
              value={password}
              onChange={(e) => handleFieldChange('password', e.target.value)}
              placeholder="Enter Wi-Fi password"
              className={`input-field w-full pr-10 ${error && error.includes('Password') ? 'border-destructive' : ''}`}
              required={needsPassword}
            />
            {password && (
              <button
                type="button"
                onClick={() => setPassword('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Clear password"
              >
                ✕
              </button>
            )}
          </div>
          {encryption === 'WEP' && (
            <p className="mt-1 text-xs text-muted-foreground">
              WEP: 5 or 13 ASCII characters, or 10 or 26 hex characters
            </p>
          )}
        </div>
      )}

      {/* Hidden Network Checkbox */}
      <div className="flex items-center space-x-2">
        <input
          id="hidden-checkbox"
          type="checkbox"
          checked={hidden}
          onChange={(e) => handleFieldChange('hidden', e.target.checked)}
          className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-ring focus:ring-2"
        />
        <label 
          htmlFor="hidden-checkbox" 
          className="text-sm text-foreground cursor-pointer"
        >
          Hidden network
        </label>
      </div>

      {/* Error Display */}
      {error && (
        <div 
          className="p-3 bg-destructive/10 border border-destructive/20 rounded-md"
          role="alert"
          aria-live="polite"
        >
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {/* Reset Button */}
      <div className="pt-4 border-t border-border">
        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2 text-sm bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          Reset Form
        </button>
      </div>

      {/* Example section */}
      <div className="bg-muted/50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-foreground mb-2">Examples:</h4>
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => {
              setSsid('HomeNetwork');
              setEncryption('WPA2');
              setPassword('mypassword123');
              setHidden(false);
            }}
            className="block text-sm text-primary hover:underline focus:outline-none focus:underline"
          >
            Home Wi-Fi (WPA2 with password)
          </button>
          <button
            type="button"
            onClick={() => {
              setSsid('GuestNetwork');
              setEncryption('nopass');
              setPassword('');
              setHidden(false);
            }}
            className="block text-sm text-primary hover:underline focus:outline-none focus:underline"
          >
            Guest Network (No password)
          </button>
        </div>
      </div>
    </div>
  );
}