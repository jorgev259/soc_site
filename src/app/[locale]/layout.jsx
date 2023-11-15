import { ToastContainer } from 'react-toastify'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import Script from 'next/script'

import Header from '@/next/components/server/Header'
import { ApolloWrapper } from '@/next/components/client/ApolloClientProvider'
import locales from '@/locales/langs.json'

import '@/styles/layout.scss'

export function generateStaticParams () {
  return locales.map(locale => ({ locale }))
}

async function Layout (props) {
  const { children, params: { locale } } = props
  let messages
  try {
    messages = (await import(`@/locales/langs/${locale}.json`)).default
  } catch (error) {
    notFound()
  }

  return (
    <html lang="en" data-bs-theme="dark">
      <body>
        <NextIntlClientProvider locale={locale} messages={messages} timeZone='Europe/Berlin'>
          <ApolloWrapper>
            <ToastContainer newestOnTop />
            <div id="modal" />
            <Header locale={locale} />
            <div className='flex-grow-1 container-fluid'>
              {children}
            </div>
          </ApolloWrapper>
        </NextIntlClientProvider>
        <Script src='/js/bootstrap.bundle.js' />
      </body>
    </html>
  )
}

export default Layout
