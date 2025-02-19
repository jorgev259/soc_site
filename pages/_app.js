import 'normalize.css/normalize.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/fontawesome.css'
import '@fortawesome/fontawesome-free/css/solid.css'
import '@fortawesome/fontawesome-free/css/regular.css'
import '@fortawesome/fontawesome-free/css/brands.css'

import '@/styles/globals.scss'
import '@/styles/anim.css'
import 'react-toastify/dist/ReactToastify.css'

import Head from 'next/head'
import { ToastContainer } from 'react-toastify'
import { useEffect, useRef } from 'react'
import { ApolloProvider } from '@apollo/client'
import { useRouter, withRouter } from 'next/router'
import ReactGA from 'react-ga'
import { Settings } from 'luxon'
import App from 'next/app'
import { NextIntlClientProvider } from 'next-intl'
import Script from 'next/script'

import { useApollo } from '@/next/utils/ApolloClient'
import useUser from '@/next/utils/useUser'
import { skipAds } from '@/server/utils/skipAds'
import Header from '@/components/Header'
import { isDev } from '@/next/constants/env'

// import SpookyGhosts from '../components/SpookyGhosts'

Settings.defaultLocale = 'en-US'

function Analytics() {
  const router = useRouter()
  const { asPath: page } = router

  useEffect(() => {
    ReactGA.set({ page })
    ReactGA.pageview(page)
  }, [page])

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Mode: Dev')
      ReactGA.initialize('UA-106185794-1')
    } else {
      console.log('Mode: Prod')
      const domains = [
        'www.sittingonclouds.net',
        'www.sittingonclouds.com',
        'www.sittingonclouds.org',
        'www.sittingonclouds.to',
        'www.sittingonclouds.top'
      ].filter((url) => url !== window.location.host)
      console.log('Link domains: ', domains)

      ReactGA.initialize('UA-106185794-1', { gaOptions: { allowLinker: true } })
      ReactGA.ga('require', 'linker')
      ReactGA.ga('linker:autoLink', domains)
    }

    ReactGA.set({ page })
    ReactGA.pageview(page)
  }, [])

  return null
}

async function getTranslation(locale = 'en') {
  const bundle = await import(`../locales/langs/${locale}.json`)
  return bundle.default || bundle
}

async function getInitialProps(context) {
  const ctx = await App.getInitialProps(context)

  const { router } = context
  const locale = router.query?.locale ?? 'en'
  const messages = await getTranslation(locale)

  return { ...ctx, messages }
}

function MyApp(context) {
  const { Component, pageProps, router, messages } = context

  const client = useApollo()
  const locale = router.query?.locale ?? 'en'

  return (
    <NextIntlClientProvider
      messages={messages}
      locale={locale}
      timeZone='Europe/Berlin'
      onError={(error) => {
        if (error.code === 'MISSING_TRANSLATION') return
        console.error(error)
      }}
    >
      <Head>
        <title>Sitting on Clouds</title>
        <meta property='og:type' content='website' />
        <meta property='og:site_name' content='Sitting on Clouds' />

        <meta key='color' name='theme-color' content='#ffffff'></meta>
        <meta key='url' property='og:url' content='/' />
        <meta
          key='title'
          property='og:title'
          content='Sitting on Clouds — High Quality soundtrack library'
        />
        <meta
          key='desc'
          property='og:description'
          content='Largest Video Game & Animation Soundtrack サウンドトラック Archive'
        />
        <meta
          key='image'
          property='og:image'
          content='/img/assets/clouds_thumb.png'
        />
      </Head>
      <Analytics />
      <ToastContainer newestOnTop />

      <ApolloProvider client={client}>
        <div id='modal' />
        <Header />
        <div className='container-fluid flex-grow-1'>
          <Component {...pageProps} />
        </div>
        <FooterAd />
      </ApolloProvider>
      <Script
        src={isDev ? '/js/bootstrap.bundle.js' : '/js/bootstrap.bundle.min.js'}
      />
    </NextIntlClientProvider>
  )
}

function FooterAd() {
  const { user } = useUser()
  const iframeRef = useRef(null)

  useEffect(() => {
    window.tyche = {
      mode: 'tyche',
      config: '//config.playwire.com/1023181/v2/websites/71145/banner.json'
    }
  }, [])

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    let t = ''
    t += window.location
    t = t
      .replace(/#.*$/g, '')
      .replace(/^.*:\/*/i, '')
      .replace(/\./g, '[dot]')
      .replace(/\//g, '[obs]')
      .replace(/-/g, '[dash]')
    t = encodeURIComponent(encodeURIComponent(t))
    iframe.src = iframe.src.replace('iframe_banner', t)
  }, [iframeRef])

  return (
    !skipAds(user) && (
      <div className='footer'>
        <iframe
          ref={iframeRef}
          id='id01_62693'
          title='id01_62693'
          src='https://www.play-asia.com/38/190%2C000000%2Cnone%2C0%2C0%2C0%2C0%2CFFFFFF%2C000000%2Cleft%2C0%2C0-391-76a-707gw6-062-782i-29466-901vq93-33iframe_banner-401-4450'
          style={{
            borderStyle: 'none',
            borderWidth: 0,
            borderColor: '#FFFFFF',
            padding: 0,
            height: '220px',
            width: '100%'
          }}
          scrolling='no'
        />
      </div>
    )
  )
}

MyApp.getInitialProps = getInitialProps
export default withRouter(MyApp)
