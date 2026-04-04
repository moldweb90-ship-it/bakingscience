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
          {/* Beaker (science) */}
          <path
            d="M9 3h6v6l4 8c.5 1-.2 2-1.5 2h-11c-1.3 0-2-1-1.5-2l4-8V3z"
            fill="white"
            fillOpacity="0.9"
          />
          {/* Liquid level */}
          <path
            d="M7 15h10l2-4H5l2 4z"
            fill="white"
            fillOpacity="0.5"
          />
          {/* Bubbles */}
          <circle cx="9" cy="12" r="1" fill="white" fillOpacity="0.7" />
          <circle cx="12" cy="10" r="0.8" fill="white" fillOpacity="0.7" />
          <circle cx="14" cy="13" r="0.6" fill="white" fillOpacity="0.7" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
