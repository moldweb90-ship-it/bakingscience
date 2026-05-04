import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  trailingSlash: true,

  images: {
    formats: ['image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
    ],
  },

  // Keep dev/build stable on Windows: this optimization intermittently
  // breaks chunk resolution in Next 15 + webpack dev mode.

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://pagead2.googlesyndication.com https://mc.yandex.ru",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https://images.pexels.com https://pagead2.googlesyndication.com https://mc.yandex.ru",
              "font-src 'self'",
              "connect-src 'self' https://www.google-analytics.com https://mc.yandex.ru",
              "frame-src https://googleads.g.doubleclick.net",
            ].join('; '),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
