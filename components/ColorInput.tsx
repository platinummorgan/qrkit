'use client';

interface ColorInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (color: string) => void;
  className?: string;
}

export default function ColorInput({ id, label, value, onChange, className = '' }: ColorInputProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <label htmlFor={id} className="block text-sm font-medium text-foreground">
        {label}
      </label>
      <div className="flex items-center space-x-3">
        <input
          id={id}
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-12 h-10 border border-border rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="#000000"
          className="input-field flex-1 font-mono text-sm"
          pattern="^#[0-9A-Fa-f]{6}$"
        />
      </div>
    </div>
  );
}