import createMiddleware from 'next-intl/middleware'
// import locales from '@/locales/langs.json'

export default createMiddleware({
  locales: ['en'],
  defaultLocale: 'en',
  localeDetection: false,
  localePrefix: 'as-needed'
})

export const config = {
  // Skip all paths that should not be internationalized. This example skips
  // certain folders and all pathnames with a dot (e.g. favicon.ico)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}
