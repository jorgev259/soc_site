import { ToastContainer } from 'react-toastify'
import { notFound } from 'next/navigation'
// import { NextIntlClientProvider } from 'next-intl'

import Header from '@/components/Header'
// import { ApolloWrapper } from '@/components/ApolloClientProvider'
import locales from '@/next/locales/langs.json'

import '@/styles/layout.scss'

export function generateStaticParams () {
  return locales.map(locale => ({ locale }))
}

async function Layout (props) {
  const { children, params: { locale } } = props
  /* let messages
  try {
    messages = (await import(`@/locales/langs/${locale}.json`)).default
  } catch (error) {
    notFound()
  } */

  return (
    <html lang="en">
      <body>
        <ToastContainer newestOnTop />
        {/* <ApolloWrapper>
          <NextIntlClientProvider locale={locale} messages={messages} timeZone='Europe/Berlin'> */}
        {/* <Header locale={locale} /> */}

        {/* <Container fluid className='flex-grow-1'>
              {children}
            </Container>
          </NextIntlClientProvider>
  </ApolloWrapper>  */}
      </body>
    </html>
  )
}

export default Layout
