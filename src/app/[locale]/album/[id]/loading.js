import classNames from 'classnames'
import NextIntlClientProvider, { useMessages } from 'next-intl'
import { pick } from 'lodash'

import styles from './AlbumPage.module.scss'

import HeroCover from '@/next/components/client/AlbumPage/HeroCover'
import { UserButtons } from './page'
import CommentCarrousel from '@/next/components/client/CommentCarrousel/CommentCarrousel'
import Related from '@/next/components/client/AlbumPage/Related'

export default function Loading (context) {
  const { params } = context
  const { id } = params

  const messages = useMessages()

  return (
    <NextIntlClientProvider messages={pick(messages, 'albumPage')}>
      <div className='row px-0 px-md-5'>
        <div className='col col-12 col-lg-5 d-flex align-items-center px-lg-2 mb-3 mb-lg-0'>
          <HeroCover id={id} />
        </div>
        <div className='col col-12 col-lg-7'>
          <div className='blackBox'>
            <div className='loadingAnim' style={{ height: '350px' }} />
            <UserButtons id={id} />
          </div>
        </div>
      </div>
      <hr />
      <div className='row'>
        <div className={classNames('col col-12 col-lg-6', styles.trackList)}>
          <div className='blackBox h-100 d-flex flex-column loadingAnim'>
            <div className='row px-3 flex-grow-1 '>
              <div className='col d-flex flex-column'>
                <div style={{ height: '400px' }} />
              </div>
            </div>
          </div>
        </div>

        <div className='col mt-3 mt-lg-0 col-12 col-lg-6'>
          <div className='blackBox loadingAnim'>
            <div style={{ height: '400px' }} />
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='col my-3'>
          <CommentCarrousel isFAU={false} id={id} />
        </div>
      </div>

      <Related id={id} />
    </NextIntlClientProvider>
  )
}
