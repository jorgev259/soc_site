import { Col } from 'react-bootstrap'
import classNames from 'classnames'
import Image from 'next/legacy/image'
import { Link } from '@/next/lib/navigation'

import styles from '@/styles/AlbumBoxes.module.scss'

import { PLACEHOLDER, getImageUrl } from './utils'

export default function AlbumBox (props) {
  const { id, title, type = 'album', status, height = 300, width = 300, placeholder, style, quality } = props
  const coming = status === 'coming'
  const blurDataURL = placeholder || PLACEHOLDER

  const BoxContent = () => (
    <>
      <div className={styles.img}>
        <Image alt={title}src={getImageUrl(id, type)} layout='responsive' width={width} height={height} placeholder='blur' blurDataURL={blurDataURL} quality={quality} />
      </div>
      <div className='text-wrap text-center p-2'>
        {coming ? 'Coming Soon' : title}
      </div>
    </>
  )

  return (
    <div className={classNames(styles.albumBox, { [styles.coming]: coming })} style={style} >
      {coming
        ? <BoxContent />
        : (
          <Link href={`/${type}/${id}`}>
            <BoxContent />
          </Link>
        )
      }
    </div>
  )
}

export function AlbumBoxList (props) {
  const { items, type, width, height, style, colProps = {}, quality } = props

  return items.map(albumProps => (
    <Col {...colProps} key={albumProps.id} className={classNames(styles.albumBoxContainer, styles[type], 'px-1 mb-2')}>
      <AlbumBox {...albumProps} style={style} type={type} width={width} height={height} quality={quality} />
    </Col>
  ))
}
