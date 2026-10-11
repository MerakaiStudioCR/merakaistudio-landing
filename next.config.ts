import { PHASE_PRODUCTION_BUILD } from 'next/constants'
import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://maps.googleapis.com https://maps.gstatic.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: blob: https://maps.googleapis.com https://maps.gstatic.com https://*.googleusercontent.com https://*.tile.openstreetmap.org",
  "font-src 'self' data: https://fonts.gstatic.com",
  "connect-src 'self' https://maps.googleapis.com https://*.googleapis.com https://*.tile.openstreetmap.org",
  "frame-src 'self' https://maps.googleapis.com",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'"
].join('; ')

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(self)'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains'
  },
  { key: 'Content-Security-Policy', value: contentSecurityPolicy }
]

export default (phase: string) => {
  const nextConfig: NextConfig = {
    poweredByHeader: false,
    experimental: {
      // Dev-only persistent Turbopack cache — left on during `next build`,
      // it panics with "Dependency tracking is disabled so invalidation is
      // not allowed" because the build pipeline turns dependency tracking
      // off entirely (it's a one-shot compile, not a watched dev server).
      ...(phase === PHASE_PRODUCTION_BUILD
        ? {}
        : { turbopackFileSystemCacheForDev: true })
    },
    compiler: {
      removeConsole: process.env.NODE_ENV === 'production'
    },
    async headers() {
      return [
        {
          source: '/:path*',
          headers: securityHeaders
        }
      ]
    }
  }

  return withNextIntl(nextConfig)
}
