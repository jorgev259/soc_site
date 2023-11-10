import { ToastContainer } from 'react-toastify'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'

// import Header from '@/components/Header'
import { ApolloWrapper } from '@/next/components/ApolloClientProvider'
import locales from '@/next/locales/langs.json'

import '@/styles/layout.scss'

export function generateStaticParams () {
  return locales.map(locale => ({ locale }))
}

async function Layout (props) {
  const { children, params: { locale } } = props
  let messages
  try {
    messages = (await import(`@/next/locales/langs/${locale}.json`)).default
  } catch (error) {
    notFound()
  }

  return (
    <html lang="en">
      <body>
        <NextIntlClientProvider locale={locale} messages={messages} timeZone='Europe/Berlin'>
          <ApolloWrapper>
            <ToastContainer newestOnTop />
            {/* <Header locale={locale} /> */}
            <div className='flex-grow-1 container-fluid'>
              {children}
            </div>
          </ApolloWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export default Layout
