const withNextIntl = require('next-intl/plugin')(
  // This is the default (also the `src` folder is supported out of the box)
  './i18n.js'
)

module.exports = withNextIntl({
  eslint: { ignoreDuringBuilds: true },
  images: {
    domains: ['cdn.sittingonclouds.net'],
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sittingonclouds.net', pathname: '/live/**' },
      { protocol: 'https', hostname: 'sittingonclouds.net', pathname: '/_next/image/**' }
    ]
  }

  /* webpack: config => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader'
    })

    return config
  },
  swcMinify: true,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'de', 'it', 'pt-br', 'pt-pt', 'fr', 'ca', 'id'],
    localeDetection: false
  },
  experimental: {
    newNextLinkBehavior: true
  } */
})
