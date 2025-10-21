'use client';

import { useState, useEffect } from 'react';
import { validateUrl } from '@/lib/validators';
import { normalizeUrl } from '@/lib/qr';

interface UrlFormProps {
  onDataChange: (data: { url: string }, isValid: boolean) => void;
  onReset?: () => void;
}

export default function UrlForm({ onDataChange, onReset }: UrlFormProps) {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);

  // Validate and notify parent of changes
  useEffect(() => {
    const validation = validateUrl(url);
    const normalizedUrl = url ? normalizeUrl(url) : url;
    
    if (touched) {
      setError(validation.isValid ? '' : (validation.error || ''));
    }
    
    onDataChange({ url: normalizedUrl }, validation.isValid);
  }, [url, touched, onDataChange]);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    if (!touched) setTouched(true);
  };

  const handleReset = () => {
    setUrl('');
    setError('');
    setTouched(false);
    onReset?.();
  };

  return (
    <div className="space-y-4">
      <div>
        <label 
          htmlFor="url-input" 
          className="block text-sm font-medium text-foreground mb-2"
        >
          Website URL
        </label>
        <div className="relative">
          <input
            id="url-input"
            type="url"
            value={url}
            onChange={handleUrlChange}
            placeholder="https://example.com"
            className={`input-field w-full ${error ? 'border-destructive' : ''}`}
            aria-describedby={error ? 'url-error' : undefined}
            aria-invalid={!!error}
          />
          {url && (
            <button
              type="button"
              onClick={() => setUrl('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Clear URL"
            >
              ✕
            </button>
          )}
        </div>
        {error && (
          <p 
            id="url-error" 
            className="mt-1 text-sm text-destructive" 
            role="alert"
            aria-live="polite"
          >
            {error}
          </p>
        )}
        <p className="mt-1 text-xs text-muted-foreground">
          Enter any website URL. We&apos;ll add https:// if needed.
        </p>
      </div>

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
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => setUrl('https://github.com')}
            className="block text-sm text-primary hover:underline focus:outline-none focus:underline"
          >
            https://github.com
          </button>
          <button
            type="button"
            onClick={() => setUrl('google.com')}
            className="block text-sm text-primary hover:underline focus:outline-none focus:underline"
          >
            google.com (will become https://google.com)
          </button>
          <button
            type="button"
            onClick={() => setUrl('mailto:hello@example.com')}
            className="block text-sm text-primary hover:underline focus:outline-none focus:underline"
          >
            mailto:hello@example.com
          </button>
        </div>
      </div>
    </div>
  );
}