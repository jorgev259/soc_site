// eslint-disable-next-line camelcase
import { unstable_setRequestLocale } from 'next-intl/server'

import Sidebar from '@/next/components/common/Sidebar'
import type { LayoutContext } from '@/next/types'

export default function ALbumListLayout(context: LayoutContext) {
  const { params, children } = context
  const { locale } = params

  unstable_setRequestLocale(locale)

  return (
    <div className='row px-0'>
      {children}
      <Sidebar />
    </div>
  )
}
