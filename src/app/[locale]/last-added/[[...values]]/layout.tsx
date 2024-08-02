import type { LayoutContext } from '@/next/types'
// eslint-disable-next-line camelcase
import { unstable_setRequestLocale, getTranslations } from 'next-intl/server'

export default async function Layout(context: LayoutContext) {
  const { children, params } = context
  const { locale } = params

  unstable_setRequestLocale(locale)

  const t = await getTranslations('header')

  return (
    <>
      <div className='row'>
        <div className='col py-3'>
          <div>
            <h1 className='text-center headerTitle'>{t('Last Added')}</h1>
          </div>
        </div>
      </div>
      {children}
    </>
  )
}
