import { getTranslations } from 'next-intl/server'
import type { ReactNode } from 'react'

export default async function Layout({ children }: { children: ReactNode }) {
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
