import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import locales from '../../locales/langs.json'

export { locales }
export const localePrefix = 'as-needed'

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales, localePrefix })
