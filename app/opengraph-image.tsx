import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#FDF6E3',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 'bold', color: '#0f172a' }}>
          Baking Conversions Done Right
        </div>
        <div style={{ fontSize: 32, color: '#64748b' }}>
          Precision baking measurements for everyone
        </div>
        <div style={{ fontSize: 24, color: '#f97316', marginTop: 16 }}>
          bakingscience.io
        </div>
      </div>
    ),
    { ...size }
  );
}
