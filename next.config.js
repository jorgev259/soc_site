module.exports = {
  eslint: { ignoreDuringBuilds: true },
  images: {
    domains: ['cdn.sittingonclouds.net']
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
}
