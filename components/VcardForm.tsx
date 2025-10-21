'use client';

import { useState, useEffect } from 'react';
import { validateVcard } from '@/lib/validators';

interface VcardData {
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
}

interface VcardFormProps {
  onDataChange: (data: VcardData, isValid: boolean) => void;
  onReset?: () => void;
}

export default function VcardForm({ onDataChange, onReset }: VcardFormProps) {
  const [formData, setFormData] = useState<VcardData>({
    firstName: '',
    lastName: '',
    company: '',
    title: '',
    mobile: '',
    email: '',
    website: '',
    street: '',
    city: '',
    region: '',
    postal: '',
    country: '',
  });
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);

  // Validate and notify parent of changes
  useEffect(() => {
    const validation = validateVcard(formData);
    
    if (touched) {
      setError(validation.isValid ? '' : (validation.error || ''));
    }
    
    onDataChange(formData, validation.isValid);
  }, [formData, touched, onDataChange]);

  const handleFieldChange = (field: keyof VcardData, value: string) => {
    if (!touched) setTouched(true);
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      company: '',
      title: '',
      mobile: '',
      email: '',
      website: '',
      street: '',
      city: '',
      region: '',
      postal: '',
      country: '',
    });
    setError('');
    setTouched(false);
    onReset?.();
  };

  return (
    <div className="space-y-4">
      {/* Personal Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground">Personal Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label 
              htmlFor="firstName-input" 
              className="block text-sm font-medium text-foreground mb-2"
            >
              First Name
            </label>
            <input
              id="firstName-input"
              type="text"
              value={formData.firstName}
              onChange={(e) => handleFieldChange('firstName', e.target.value)}
              placeholder="John"
              className="input-field w-full"
            />
          </div>

          <div>
            <label 
              htmlFor="lastName-input" 
              className="block text-sm font-medium text-foreground mb-2"
            >
              Last Name
            </label>
            <input
              id="lastName-input"
              type="text"
              value={formData.lastName}
              onChange={(e) => handleFieldChange('lastName', e.target.value)}
              placeholder="Doe"
              className="input-field w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label 
              htmlFor="company-input" 
              className="block text-sm font-medium text-foreground mb-2"
            >
              Company
            </label>
            <input
              id="company-input"
              type="text"
              value={formData.company}
              onChange={(e) => handleFieldChange('company', e.target.value)}
              placeholder="Acme Corp"
              className="input-field w-full"
            />
          </div>

          <div>
            <label 
              htmlFor="title-input" 
              className="block text-sm font-medium text-foreground mb-2"
            >
              Job Title
            </label>
            <input
              id="title-input"
              type="text"
              value={formData.title}
              onChange={(e) => handleFieldChange('title', e.target.value)}
              placeholder="Software Engineer"
              className="input-field w-full"
            />
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground">Contact Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label 
              htmlFor="mobile-input" 
              className="block text-sm font-medium text-foreground mb-2"
            >
              Mobile Phone
            </label>
            <input
              id="mobile-input"
              type="tel"
              value={formData.mobile}
              onChange={(e) => handleFieldChange('mobile', e.target.value)}
              placeholder="+1-555-123-4567"
              className={`input-field w-full ${error && error.includes('phone') ? 'border-destructive' : ''}`}
            />
          </div>

          <div>
            <label 
              htmlFor="email-input" 
              className="block text-sm font-medium text-foreground mb-2"
            >
              Email Address
            </label>
            <input
              id="email-input"
              type="email"
              value={formData.email}
              onChange={(e) => handleFieldChange('email', e.target.value)}
              placeholder="john@example.com"
              className={`input-field w-full ${error && error.includes('email') ? 'border-destructive' : ''}`}
            />
          </div>
        </div>

        <div>
          <label 
            htmlFor="website-input" 
            className="block text-sm font-medium text-foreground mb-2"
          >
            Website
          </label>
          <input
            id="website-input"
            type="url"
            value={formData.website}
            onChange={(e) => handleFieldChange('website', e.target.value)}
            placeholder="https://johndoe.com"
            className={`input-field w-full ${error && error.includes('website') ? 'border-destructive' : ''}`}
          />
        </div>
      </div>

      {/* Address Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground">Address</h3>
        
        <div>
          <label 
            htmlFor="street-input" 
            className="block text-sm font-medium text-foreground mb-2"
          >
            Street Address
          </label>
          <input
            id="street-input"
            type="text"
            value={formData.street}
            onChange={(e) => handleFieldChange('street', e.target.value)}
            placeholder="123 Main St"
            className="input-field w-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label 
              htmlFor="city-input" 
              className="block text-sm font-medium text-foreground mb-2"
            >
              City
            </label>
            <input
              id="city-input"
              type="text"
              value={formData.city}
              onChange={(e) => handleFieldChange('city', e.target.value)}
              placeholder="New York"
              className="input-field w-full"
            />
          </div>

          <div>
            <label 
              htmlFor="region-input" 
              className="block text-sm font-medium text-foreground mb-2"
            >
              State/Region
            </label>
            <input
              id="region-input"
              type="text"
              value={formData.region}
              onChange={(e) => handleFieldChange('region', e.target.value)}
              placeholder="NY"
              className="input-field w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label 
              htmlFor="postal-input" 
              className="block text-sm font-medium text-foreground mb-2"
            >
              Postal Code
            </label>
            <input
              id="postal-input"
              type="text"
              value={formData.postal}
              onChange={(e) => handleFieldChange('postal', e.target.value)}
              placeholder="10001"
              className="input-field w-full"
            />
          </div>

          <div>
            <label 
              htmlFor="country-input" 
              className="block text-sm font-medium text-foreground mb-2"
            >
              Country
            </label>
            <input
              id="country-input"
              type="text"
              value={formData.country}
              onChange={(e) => handleFieldChange('country', e.target.value)}
              placeholder="United States"
              className="input-field w-full"
            />
          </div>
        </div>
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

      {/* Help Text */}
      <div className="bg-muted/50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-foreground mb-2">vCard Information:</h4>
        <p className="text-xs text-muted-foreground mb-2">
          Fill in any fields you want to include in your contact card. At least one field is required.
        </p>
        <button
          type="button"
          onClick={() => {
            setFormData({
              firstName: 'John',
              lastName: 'Doe',
              company: 'Acme Corp',
              title: 'Software Engineer',
              mobile: '+1-555-123-4567',
              email: 'john@example.com',
              website: 'https://johndoe.com',
              street: '123 Main St',
              city: 'New York',
              region: 'NY',
              postal: '10001',
              country: 'United States',
            });
          }}
          className="text-sm text-primary hover:underline focus:outline-none focus:underline"
        >
          Fill with example data
        </button>
      </div>
    </div>
  );
}