import clsx from 'clsx';

import styles from './AlbumPage.module.scss'

export default function Loading () {
  return (
    <div className={clsx('row', styles.container)}>
      <div className={clsx('col px-0 px-md-5 pt-3', styles.content, styles.loading)}>
        <div className='row px-0 px-md-5'>
          <div className='col col-12 col-lg-5 d-flex align-items-center px-lg-2 mb-3 mb-lg-0' />
          <div className='col col-12 col-lg-7'>
            <div className='blackBox'>
              <div className='loadingAnim' style={{ height: '350px' }} />
            </div>
          </div>
        </div>
        <hr />
        <div className='row'>
          <div className={clsx('col col-12 col-lg-6', styles.trackList)}>
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
      </div>
    </div>
  )
}
