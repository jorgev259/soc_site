import createMiddleware from 'next-intl/middleware'

import locales from './locales/langs.json'
import { localePrefix } from '@/next/utils/navigation'

export default createMiddleware({
  locales,
  defaultLocale: 'en',
  localeDetection: false,
  localePrefix
})

export const config = {
  // Skip all paths that should not be internationalized. This example skips
  // certain folders and all pathnames with a dot (e.g. favicon.ico)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}
