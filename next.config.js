const withNextIntl = require('next-intl/plugin')('./i18n.js')
const { withPlugins, optional } = require('next-compose-plugins')

module.exports = withPlugins(
  [
    [optional(() => require('@next/bundle-analyzer')), { enabled: true }, [process.env.ANALYZE === 'true']],
    [withNextIntl]
  ],
  {
    eslint: { ignoreDuringBuilds: true },
    images: {
      imageSizes: [16, 32, 48, 64, 96, 128, 250, 256, 384],
      remotePatterns: [
        { protocol: 'https', hostname: 'cdn.sittingonclouds.net', pathname: '/**' },
        { protocol: 'https', hostname: 'sittingonclouds.net', pathname: '/_next/image/**' }
      ]
    },
    webpack: (config, { isServer }) => {
      config.module.rules.push({
        test: /\.node$/,
        loader: 'node-loader'
      })

      return config
    }
  }
)
