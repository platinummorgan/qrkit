import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'QR Kit - Instant QR Codes';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
          fontSize: 32,
          fontWeight: 600,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 40,
          }}
        >
          {/* QR Code Icon */}
          <div
            style={{
              width: 120,
              height: 120,
              backgroundColor: '#000000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 40,
              borderRadius: 12,
            }}
          >
            <div
              style={{
                width: 80,
                height: 80,
                backgroundColor: '#ffffff',
                display: 'grid',
                gridTemplateColumns: 'repeat(8, 1fr)',
                gridTemplateRows: 'repeat(8, 1fr)',
                gap: 2,
                padding: 8,
              }}
            >
              {/* Simple QR pattern */}
              {Array.from({ length: 64 }, (_, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: Math.random() > 0.5 ? '#000000' : '#ffffff',
                    width: '100%',
                    height: '100%',
                  }}
                />
              ))}
            </div>
          </div>
          
          {/* Title */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                fontSize: 72,
                fontWeight: 800,
                color: '#000000',
                lineHeight: 1,
                marginBottom: 8,
              }}
            >
              QR Kit
            </div>
            <div
              style={{
                fontSize: 32,
                color: '#666666',
                fontWeight: 400,
              }}
            >
              Free QR Code Generator
            </div>
          </div>
        </div>
        
        {/* Features */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 60,
            fontSize: 24,
            color: '#888888',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: 8 }}>🔗</span>
            <span>URLs</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: 8 }}>📶</span>
            <span>Wi-Fi</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: 8 }}>👤</span>
            <span>vCard</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: 8 }}>🛡️</span>
            <span>Privacy First</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}