import classNames from 'classnames'
import Link from 'next/link'
import Image from 'next/image'

import logo from '@/img/assets/winterlogo.png'
import logoES from '@/img/assets/logo_es.png'

import NavigationBar from './NavigationBar'
import LoginBar from './LoginBar'
// import LangSelector from './LangSelector'

import styles from './Header.module.scss'
import { getBanner } from '@/next/lib/actions'
import getSession from '@/next/lib/getSession'

async function LogoCol (props) {
  const { locale } = props
  const banner = await getBanner()

  return (
    <>
      <div className={classNames(styles.bgImage)}>
        <Image
          fill priority alt=''
          src={`https://cdn.sittingonclouds.net/live/${banner}.png`}
          quality={50}
          style={{ objectFit: 'cover' }}/>
      </div>
      <div className='col-12 col-sm-auto d-flex justify-content-center'>
        <Link className='ps-sm-5 ms-sm-4' href="/">
          <Image alt='SOC Logo' src={locale === 'es' ? logoES : logo} height={150} width={265} />
        </Link>
      </div>
    </>
  )
}

export default async function Header (props) {
  const { locale } = props
  const session = await getSession()
  const { username } = session
  const isFAU = username !== undefined

  return (
    <div className='container-fluid'>
      <div className={classNames('row', styles.logoRow)}>
        <LogoCol locale={locale} />
        {/* <LangSelector /> */}
        <LoginBar />
      </div>
      <div className='row'>
        <div className='col px-0'>
          <NavigationBar isFAU={isFAU} username={username} />
        </div>
      </div>
    </div>
  )
}
