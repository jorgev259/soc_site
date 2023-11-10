const withNextIntl = require('next-intl/plugin')('./i18n.js')

module.exports = withNextIntl({
  eslint: { ignoreDuringBuilds: true },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sittingonclouds.net', pathname: '/**' },
      { protocol: 'https', hostname: 'sittingonclouds.net', pathname: '/_next/image/**' }
    ]
  }
})
