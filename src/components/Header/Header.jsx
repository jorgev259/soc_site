import clsx from 'clsx'
import { Link } from '@/next/utils/navigation'
import Image from 'next/image'
import { getLocale } from 'next-intl/server'

import logo from '@/img/assets/winterlogo.png'
import logoES from '@/img/assets/logo_es.png'

import NavigationBar from './NavigationBar'
import LoginBar from './LoginBar'
// import LangSelector from './LangSelector'

import styles from './Header.module.scss'
import { gql } from '@apollo/client'
import { getClient } from '@/next/utils/ApolloSSRClient'

const bannerQuery = gql`
  query GetBanner {
    config(name: "banner") {
      value
    }
  }
`

async function LogoCol() {
  const client = await getClient()
  const { data } = await client.query({ query: bannerQuery })
  const locale = await getLocale()

  const banner = data.config.value

  return (
    <>
      <div className={clsx(styles.bgImage)}>
        <Image
          fill
          priority
          alt=''
          src={`https://cdn.sittingonclouds.net/live/${banner}.png`}
          quality={50}
        />
      </div>
      <div className='col-12 col-sm-auto d-flex justify-content-center'>
        <Link className='ps-sm-5 ms-sm-4' href='/'>
          <Image
            alt='SOC Logo'
            src={locale === 'es' ? logoES : logo}
            height={150}
            width={265}
          />
        </Link>
      </div>
    </>
  )
}

export default async function Header(props) {
  return (
    <header>
      <div className='container-fluid'>
        <div className={clsx('row', styles.logoRow)}>
          <LogoCol />
          {/* <LangSelector /> */}
          <LoginBar />
        </div>
        <div className='row'>
          <div className='col px-0'>
            <NavigationBar />
          </div>
        </div>
      </div>
    </header>
  )
}
