const withNextIntl = require('next-intl/plugin')('./i18n.js')

module.exports = withNextIntl({
  eslint: { ignoreDuringBuilds: true },
  images: {
    imageSizes: [16, 32, 48, 64, 96, 128, 250, 256, 384],
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sittingonclouds.net', pathname: '/**' },
      { protocol: 'https', hostname: 'sittingonclouds.net', pathname: '/_next/image/**' }
    ]
  }
})
