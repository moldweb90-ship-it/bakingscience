import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '6px',
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Cupcake wrapper */}
          <path
            d="M7 14l-1 6h12l-1-6H7z"
            fill="white"
            fillOpacity="0.85"
          />
          {/* Wrapper lines */}
          <line x1="9" y1="14" x2="8.5" y2="20" stroke="white" strokeOpacity="0.5" strokeWidth="0.5" />
          <line x1="12" y1="14" x2="12" y2="20" stroke="white" strokeOpacity="0.5" strokeWidth="0.5" />
          <line x1="15" y1="14" x2="15.5" y2="20" stroke="white" strokeOpacity="0.5" strokeWidth="0.5" />
          {/* Frosting swirl */}
          <path
            d="M6 14c0-3 2.5-6 6-6s6 3 6 6H6z"
            fill="white"
            fillOpacity="0.95"
          />
          {/* Cherry on top */}
          <circle cx="12" cy="7" r="2" fill="white" fillOpacity="0.9" />
          <path d="M12 5c0-1 1-2 2-2" stroke="white" strokeOpacity="0.7" strokeWidth="0.5" fill="none" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
