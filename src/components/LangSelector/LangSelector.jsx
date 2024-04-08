'use client'
import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/next/utils/navigation'
import clsx from 'clsx'

import styles from './LangSelector.module.scss'

export default function LangSelector() {
  const pathname = usePathname()
  const router = useRouter()
  const locale = useLocale()

  const handleLocaleChange = (event) => {
    const { value } = event.target
    router.replace(pathname, { locale: value })
  }

  return (
    <div
      className={clsx(
        styles.login,
        styles.main,
        'col-auto ms-sm-auto mb-sm-5 py-2'
      )}
    >
      <select onChange={handleLocaleChange} value={locale}>
        <option value='en'>🇺🇸 English</option>
        <option value='es'>🇪🇸 Español</option>
        <option value='de'>🇩🇪 Deutsch</option>
        <option value='pt-pt'>🇵🇹 Português</option>
        <option value='pt-br'>🇧🇷 Português</option>
        <option value='it'>🇮🇹 Italiano</option>
        <option value='fr'>🇫🇷 Français</option>
        <option value='ca'>🇨🇦 Canadian</option>
        <option value='id'>🇮🇩 Indonesian</option>
      </select>
    </div>
  )
}
