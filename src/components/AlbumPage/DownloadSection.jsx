import { Fragment } from 'react'
import { NextIntlClientProvider, useTranslations } from 'next-intl'
import clsx from 'clsx'
import Image from 'next/image'
import styles from '@/styles/DownloadSection.module.scss'

import { Link } from '@/next/utils/navigation'
import DirectButton from '../AlbumPage/DirectButton'
import { getMessageObject } from '@/next/utils/transl'

export default function DownloadSection(props) {
  const { downloads = [] } = props
  const t = useTranslations('albumPage.download')

  return downloads.map((download, di) => {
    const { links, title } = download

    return (
      <div className='row' key={di}>
        <div className='col'>
          <div className='row'>
            <div className='col col-md-12'>
              <h2 className='text-center download-txt mb-0'>{title}</h2>
            </div>
          </div>
          {links.map((link) => {
            const { id: linkId, url, provider, directUrl, url2 } = link

            return (
              <Fragment key={linkId}>
                {/* <div className='row mt-2'>
                  <div md={12}>
                    <h5 className='col col-md-12 text-center'>{provider}</h5>
                  </div>
                </div> */}
                <div className='d-flex mx-auto mb-3'>
                  <Image
                    sizes='40vw'
                    className='rounded'
                    width={30}
                    height={30}
                    alt={provider}
                    src={`/img/provider/${provider}.png`}
                  />
                  {/* {url2&&(
                    <div className='mx-2 w-100'>
                      <Link target='_blank' href={url2}>
                        <button
                          className={clsx('d-flex justify-content-center align-items-center btn btn-secondary', styles.download)}
                        >
                          <Image
                            className='rounded'
                            width={15}
                            height={15}
                            alt='fly'
                            src={`/img/provider/fly.png`}
                          />
                          {t('Download')}
                        </button>
                      </Link>
                    </div>
                  )} */}
                  <div className='mx-2 w-100'>
                    <Link target='_blank' href={url}>
                      <button
                        className={clsx('d-flex justify-content-center align-items-center btn btn-secondary', styles.download)}
                      >
                      <Image
                        className='rounded mr-1'
                        width={15}
                        height={15}
                        alt='ouo'
                        src={`/img/provider/ouo.png`}
                      />
                        {t('Download')}
                      </button>
                    </Link>
                  </div>
                  <div className='mx-2 w-100'>
                    <NextIntlClientProvider
                      messages={getMessageObject(t, [
                        'Become_Donator',
                        'Direct'
                      ])}
                    >
                      <DirectButton directUrl={directUrl} />
                    </NextIntlClientProvider>
                  </div>
                </div>
              </Fragment>
            )
          })}
          <hr />
        </div>
      </div>
    )
  })
}
