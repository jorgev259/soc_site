import { ToastContainer } from 'react-toastify'
import Script from 'next/script'
// eslint-disable-next-line camelcase
import { unstable_setRequestLocale } from 'next-intl/server'

import Header from '@/next/components/Header'
import { ApolloWrapper } from '@/next/components/common/ApolloClientProvider'
import Ad from '@/next/components/common/Ad'
import { isDev } from '@/next/constants/env'
import { locales } from '@/next/utils/navigation'

import '@/styles/layout.scss'
import type { LayoutContext } from '@/next/types'

export const metadata = {
  metadataBase: new URL('https://sittingonclouds.net'),
  title: 'Sitting on Clouds',
  description:
    'Largest Video Game & Animation Soundtrack サウンドトラック Archive',
  default: {
    title: 'Sitting on Clouds'
  },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'Sitting on Clouds',
    title: 'Sitting on Clouds — High Quality soundtrack library',
    description:
      'Largest Video Game & Animation Soundtrack サウンドトラック Archive',
    images: [{ url: '/img/assets/clouds_thumb.png', width: 250, height: 250 }]
  },
  twitter: {
    card: 'summary'
  }
}

export const viewport = {
  themeColor: '#ffffff',
  colorScheme: 'dark'
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export const dynamic = 'force-dynamic'

async function Layout(context: LayoutContext) {
  const { children, params } = context
  const { locale } = params

  unstable_setRequestLocale(locale)

  return (
    <html lang={locale} data-bs-theme='dark'>
      <body>
        <ApolloWrapper>
          <ToastContainer newestOnTop />
          <div id='modal' />

          <Header />
          <main>
            <div className='container-fluid'>{children}</div>
          </main>
          <Footer />
        </ApolloWrapper>
        <Script
          src={
            isDev ? '/js/bootstrap.bundle.js' : '/js/bootstrap.bundle.min.js'
          }
        />
      </body>
    </html>
  )
}

function Footer() {
  return (
    <footer>
      <Ad>
        <iframe
          id='id01_62693'
          title='id01_62693'
          src='https://www.play-asia.com/38/190%2C000000%2Cnone%2C0%2C0%2C0%2C0%2CFFFFFF%2C000000%2Cleft%2C0%2C0-391-76a-707gw6-062-782i-29466-901vq93-33iframe_banner-401-4450'
        />

        <Script src='/js/footerAd.js' />
      </Ad>
    </footer>
  )
}

export default Layout
