import { ToastContainer } from 'react-toastify'
import { useLocale } from 'next-intl'
import Script from 'next/script'

import Header from '@/next/components/server/Header'
import { ApolloWrapper } from '@/next/components/client/ApolloClientProvider'
import Ad from '@/next/components/server/Ad'

import '@/styles/layout.scss'

export const metadata = {
  metadataBase: new URL('https://sittingonclouds.net'),
  title: 'Sitting on Clouds',
  description: 'Largest Video Game & Animation Soundtrack サウンドトラック Archive',
  default: {
    title: 'Sitting on Clouds'
  },
  openGraph: {
    type: 'website',
    url: '/',
    title: 'Sitting on Clouds — High Quality soundtrack library',
    description: 'Largest Video Game & Animation Soundtrack サウンドトラック Archive',
    images: [
      { url: '/img/assets/clouds_thumb.png' }
    ]
  }
}

async function Layout (props) {
  const { children } = props
  const locale = useLocale()

  return (
    <html lang={locale} data-bs-theme="dark">
      <body>
        <ApolloWrapper>
          <ToastContainer newestOnTop />
          <div id="modal" />
          <Header locale={locale} />
          <div className='flex-grow-1 container-fluid'>
            {children}
          </div>
          <Footer />
        </ApolloWrapper>
        <Script src='/js/bootstrap.bundle.js' />
      </body>
    </html>
  )
}

function Footer () {
  return (
    <Ad>
      <footer>
        <iframe
          id='id01_62693' title='id01_62693'
          src='https://www.play-asia.com/38/190%2C000000%2Cnone%2C0%2C0%2C0%2C0%2CFFFFFF%2C000000%2Cleft%2C0%2C0-391-76a-707gw6-062-782i-29466-901vq93-33iframe_banner-401-4450'
        />
      </footer>
      <Script src='/js/footerAd.js' />
    </Ad>
  )
}

export default Layout
