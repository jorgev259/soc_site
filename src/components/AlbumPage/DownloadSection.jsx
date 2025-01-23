import { Fragment } from 'react'
import { NextIntlClientProvider, useTranslations } from 'next-intl'
import clsx from 'clsx'

import Image from 'next/image'
import fly from '@/img/provider/fly.png'
import ouo from '@/img/provider/ouo.png'

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
            const { id: linkId, url, url2, provider, directUrl } = link

            return (
              <Fragment key={linkId}>
                <div className='row d-flex gap-2 my-2'>
                  <div className='col-auto'>
                    <Image
                      className='rounded'
                      width={30}
                      height={30}
                      alt={provider}
                      src={`/img/provider/${provider}.png`}
                    />
                  </div>
                  {/* {url2 && (
                    <div className='col'>
                      <Link target='_blank' href={url2}>
                        <button
                          className={clsx(
                            'd-flex justify-content-center align-items-center btn btn-secondary',
                            styles.download
                          )}
                        >
                          <Image
                            className='rounded'
                            width={20}
                            height={20}
                            alt='fly'
                            src={fly}
                          />
                          {t('Download')}
                        </button>
                      </Link>
                    </div>
                  )} */}
                  <div className='col'>
                    <Link target='_blank' href={url}>
                      <button
                        className={clsx(
                          'd-flex justify-content-center align-items-center btn btn-secondary',
                          styles.download
                        )}
                      >
                        <Image
                          className='rounded mr-1'
                          width={15}
                          height={15}
                          alt='ouo'
                          src={ouo}
                        />
                        {t('Download')}
                      </button>
                    </Link>
                  </div>
                  <div className='col'>
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
