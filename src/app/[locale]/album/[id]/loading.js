import classNames from 'classnames'
import Image from 'next/image'

import styles from './AlbumPage.module.scss'
import cover from '@/img/album/default.png'

import { PLACEHOLDER } from '@/next/constants'

export default function Loading () {
  return (
    <>
      <div className='row px-0 px-md-5'>
        <div className='col col-12 col-lg-5 d-flex align-items-center px-lg-2 mb-3 mb-lg-0'>
          <HeroCover />
        </div>
        <div className='col col-12 col-lg-7'>
          <div className='blackBox'>
            <div className='loadingAnim' style={{ height: '350px' }} />
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
    </>
  )
}

function HeroCover () {
  return (
    <div className={styles.coverContainer}>
      <Image quality={80} sizes ='40vw' className='rounded' fill alt='Album cover' src={cover} placeholder='blur' blurDataURL={PLACEHOLDER} />
    </div>
  )
}
