import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import locales from '@/locales/langs.json'

export const { Link, useRouter, usePathname, redirect } = createSharedPathnamesNavigation({ locales })
