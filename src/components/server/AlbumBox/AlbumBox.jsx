import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'

import styles from './AlbumBox.module.scss'

const getImageUrl = (id, type = 'album') => `https://cdn.sittingonclouds.net/${type}/${id}.png`

export default function AlbumBox (props) {
  const { id, title, type = 'album', status, placeholder, style, className } = props
  const coming = status === 'coming'
  const loading = status === 'loading'

  const commonContent = (
    <>
      <div className={classNames(styles.img, 'pt-1')}>
        <Image
          sizes="25vw"
          alt={title} src={getImageUrl(id, type)}
          placeholder='blur' blurDataURL={placeholder} quality={30} fill />
      </div>
      <div className='text-wrap text-center p-2'>
        {coming ? 'Coming Soon' : title}
      </div>
    </>
  )

  const content = coming
    ? commonContent
    : <Link href={`/${type}/${id}`}>{commonContent}</Link>

  return (
    <div className={classNames(styles.albumBoxContainer, styles[type], 'col px-1 mb-2', className)}>
      <div className={classNames(styles.albumBox, { [styles.coming]: coming, loadingAnim: loading })} style={style} >
        {loading ? null : content}
      </div>
    </div>
  )
}
