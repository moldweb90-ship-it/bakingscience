import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #FDF6E3 0%, #FFEDD5 50%, #F97316 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 60,
        }}
      >
        {/* Top icon row */}
        <div style={{ display: 'flex', gap: 20, marginBottom: 30 }}>
          <div style={{ fontSize: 64 }}>🧁</div>
          <div style={{ fontSize: 64 }}>🔬</div>
          <div style={{ fontSize: 64 }}>📐</div>
        </div>

        {/* Main title */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 'bold',
            color: '#0f172a',
            textAlign: 'center',
            lineHeight: 1.1,
            marginBottom: 20,
          }}
        >
          Baking Conversions Done Right
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 28,
            color: '#64748b',
            textAlign: 'center',
            marginBottom: 30,
          }}
        >
          Not &quot;roughly&quot; — exactly. 20+ ingredients, 3 methods.
        </div>

        {/* URL badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            background: '#F97316',
            color: 'white',
            fontSize: 24,
            fontWeight: 'bold',
            padding: '12px 32px',
            borderRadius: 12,
          }}
        >
          <span>🧪</span>
          <span>bakingconverter.com</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
