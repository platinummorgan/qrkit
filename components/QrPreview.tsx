'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { generateQrSvg, generateQrDataUrl, type QROptions, type ErrorCorrectionLevel } from '@/lib/qr';
import { downloadSvg, downloadPng, copyToClipboard, svgToPng, shareContent, dataUrlToFile } from '@/lib/download';
import ColorInput from './ColorInput';

interface QrPreviewProps {
  text: string;
  isValidData: boolean;
}

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error';
}

export default function QrPreview({ text, isValidData }: QrPreviewProps) {
  // QR Options State
  const [size, setSize] = useState(400);
  const [margin, setMargin] = useState(4);
  const [errorCorrection, setErrorCorrection] = useState<ErrorCorrectionLevel>('M');
  const [foregroundColor, setForegroundColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  
  // Logo State
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoDataUrl, setLogoDataUrl] = useState<string>('');
  const [logoSize, setLogoSize] = useState(60);
  
  // Generated QR State
  const [qrSvg, setQrSvg] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string>('');
  
  // UI State
  const [toasts, setToasts] = useState<Toast[]>();
  const logoInputRef = useRef<HTMLInputElement>(null);

  // Generate QR code when options change
  useEffect(() => {
    if (!text || !isValidData) {
      setQrSvg('');
      return;
    }

    const generateQr = async () => {
      setIsGenerating(true);
      setError('');
      
      try {
        const options: QROptions = {
          text,
          size,
          margin,
          errorCorrectionLevel: errorCorrection,
          foregroundColor,
          backgroundColor,
        };

        const svg = await generateQrSvg(options);
        setQrSvg(svg);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to generate QR code');
      } finally {
        setIsGenerating(false);
      }
    };

    generateQr();
  }, [text, isValidData, size, margin, errorCorrection, foregroundColor, backgroundColor]);

  // Handle logo file upload
  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.match(/^image\/(png|jpeg|jpg|svg\+xml)$/)) {
      showToast('Please select a PNG, JPG, or SVG image', 'error');
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      showToast('Image must be smaller than 2MB', 'error');
      return;
    }

    setLogoFile(file);

    // Convert to data URL
    const reader = new FileReader();
    reader.onload = (e) => {
      setLogoDataUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Remove logo
  const removeLogo = () => {
    setLogoFile(null);
    setLogoDataUrl('');
    if (logoInputRef.current) {
      logoInputRef.current.value = '';
    }
  };

  // Toast management
  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    const id = Date.now().toString();
    const newToast = { id, message, type };
    setToasts(prev => [...(prev || []), newToast]);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      setToasts(prev => prev?.filter(t => t.id !== id) || []);
    }, 3000);
  };

  // Download SVG
  const handleDownloadSvg = () => {
    if (!qrSvg) return;
    
    try {
      downloadSvg(qrSvg, 'qrcode.svg');
      showToast('SVG downloaded successfully!');
    } catch (err) {
      showToast('Failed to download SVG', 'error');
    }
  };

  // Download PNG
  const handleDownloadPng = () => {
    if (!qrSvg) return;
    
    try {
      svgToPng(qrSvg, size, (dataUrl) => {
        downloadPng(dataUrl, 'qrcode.png');
        showToast('PNG downloaded successfully!');
      });
    } catch (err) {
      showToast('Failed to download PNG', 'error');
    }
  };

  // Copy payload text
  const handleCopyPayload = async () => {
    if (!text) return;
    
    try {
      await copyToClipboard(text);
      showToast('Payload copied to clipboard!');
    } catch (err) {
      showToast('Failed to copy to clipboard', 'error');
    }
  };

  // Share QR code
  const handleShare = async () => {
    if (!qrSvg) return;
    
    try {
      // Try to convert to PNG for sharing
      svgToPng(qrSvg, size, async (dataUrl) => {
        const file = dataUrlToFile(dataUrl, 'qrcode.png');
        
        const shared = await shareContent({
          title: 'QR Code',
          text: 'Check out this QR code I generated',
          files: [file]
        });
        
        if (!shared) {
          // Fallback to copying the site URL
          await copyToClipboard(window.location.href);
          showToast('Link copied to clipboard!');
        }
      });
    } catch (err) {
      showToast('Failed to share', 'error');
    }
  };

  const errorCorrectionOptions = [
    { value: 'L', label: 'Low (~7%)' },
    { value: 'M', label: 'Medium (~15%)' },
    { value: 'Q', label: 'Quartile (~25%)' },
    { value: 'H', label: 'High (~30%)' },
  ];

  return (
    <div className="space-y-6">
      {/* QR Code Preview */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">QR Code Preview</h2>
        
        <div className="qr-preview relative">
          {isGenerating ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-64 text-destructive">
              <p className="text-center">
                <span className="block">⚠️</span>
                <span className="text-sm">{error}</span>
              </p>
            </div>
          ) : !text || !isValidData ? (
            <div className="flex items-center justify-center h-64 text-muted-foreground">
              <p className="text-center">
                <span className="block text-4xl mb-2">📱</span>
                <span className="text-sm">Enter data to generate QR code</span>
              </p>
            </div>
          ) : (
            <div
              className="flex items-center justify-center"
              dangerouslySetInnerHTML={{ __html: qrSvg }}
              role="img"
              aria-label="Generated QR code"
            />
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={handleDownloadSvg}
            disabled={!qrSvg}
            className="btn-primary px-4 py-2 text-sm rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Download SVG
          </button>
          
          <button
            onClick={handleDownloadPng}
            disabled={!qrSvg}
            className="btn-primary px-4 py-2 text-sm rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Download PNG
          </button>
          
          <button
            onClick={handleCopyPayload}
            disabled={!text}
            className="btn-secondary px-4 py-2 text-sm rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Copy Data
          </button>
          
          <button
            onClick={handleShare}
            disabled={!qrSvg}
            className="btn-secondary px-4 py-2 text-sm rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Share
          </button>
        </div>
      </div>

      {/* Customization Options */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Customization</h3>
        
        <div className="space-y-6">
          {/* Size Control */}
          <div>
            <label htmlFor="size-slider" className="block text-sm font-medium text-foreground mb-2">
              Size: {size}px
            </label>
            <div className="flex items-center space-x-4">
              <span className="text-xs text-muted-foreground">128</span>
              <input
                id="size-slider"
                type="range"
                min="128"
                max="1024"
                step="32"
                value={size}
                onChange={(e) => setSize(parseInt(e.target.value))}
                className="flex-1 h-2 bg-secondary rounded-lg appearance-none cursor-pointer slider"
              />
              <span className="text-xs text-muted-foreground">1024</span>
            </div>
          </div>

          {/* Colors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ColorInput
              id="foreground-color"
              label="Foreground Color"
              value={foregroundColor}
              onChange={setForegroundColor}
            />
            
            <ColorInput
              id="background-color"
              label="Background Color"
              value={backgroundColor}
              onChange={setBackgroundColor}
            />
          </div>

          {/* Error Correction */}
          <div>
            <label htmlFor="error-correction" className="block text-sm font-medium text-foreground mb-2">
              Error Correction Level
            </label>
            <select
              id="error-correction"
              value={errorCorrection}
              onChange={(e) => setErrorCorrection(e.target.value as ErrorCorrectionLevel)}
              className="input-field w-full md:w-auto"
            >
              {errorCorrectionOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-muted-foreground">
              Higher levels can recover from more damage but create denser codes
            </p>
          </div>

          {/* Margin */}
          <div>
            <label htmlFor="margin-input" className="block text-sm font-medium text-foreground mb-2">
              Margin (Quiet Zone)
            </label>
            <input
              id="margin-input"
              type="number"
              min="0"
              max="8"
              value={margin}
              onChange={(e) => setMargin(parseInt(e.target.value) || 0)}
              className="input-field w-20"
            />
            <p className="mt-1 text-xs text-muted-foreground">
              White space around the QR code (0-8)
            </p>
          </div>

          {/* Logo Upload */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Center Logo (Optional)
            </label>
            
            {!logoFile ? (
              <div>
                <input
                  ref={logoInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/svg+xml"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
                <button
                  onClick={() => logoInputRef.current?.click()}
                  className="btn-secondary px-4 py-2 text-sm rounded-md"
                >
                  Upload Logo
                </button>
                <p className="mt-1 text-xs text-muted-foreground">
                  PNG, JPG, or SVG. Max 2MB. Keep under 30% of QR size for best scanning.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Image
                    src={logoDataUrl}
                    alt="Logo preview"
                    width={48}
                    height={48}
                    className="w-12 h-12 object-contain border border-border rounded"
                  />
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{logoFile.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(logoFile.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  <button
                    onClick={removeLogo}
                    className="text-destructive hover:text-destructive/80 text-sm"
                  >
                    Remove
                  </button>
                </div>
                
                <div>
                  <label htmlFor="logo-size" className="block text-xs text-muted-foreground mb-1">
                    Logo Size: {logoSize}px
                  </label>
                  <input
                    id="logo-size"
                    type="range"
                    min="20"
                    max="120"
                    step="10"
                    value={logoSize}
                    onChange={(e) => setLogoSize(parseInt(e.target.value))}
                    className="w-32 h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Toast Notifications */}
      {toasts && toasts.length > 0 && (
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`toast-slide-in px-4 py-3 rounded-md shadow-lg ${
                toast.type === 'success'
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white'
              }`}
            >
              {toast.message}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}