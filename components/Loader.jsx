import Image from 'next/legacy/image'
import clsx from 'clsx'
import { Button } from 'react-bootstrap'

import loader from 'svg-loaders/svg-smil-loaders/oval.svg'
import styles from '@/styles/Search.module.scss'
import logo from '../public/img/assets/clouds.png'

export default function Loader(props) {
  const { className = '', style = {}, size = 150 } = props
  return (
    <div
      className={clsx(className, styles.spin)}
      style={{ ...style, height: size, width: size }}
    >
      <Image
        layout='responsive'
        height={size}
        width={size}
        alt='loading'
        src={logo}
      />
    </div>
  )
}

export const ButtonLoader = (props) => {
  const { loading, children } = props

  const buttonProps = { ...props }
  delete buttonProps.loading

  return (
    <Button style={{ position: 'relative' }} {...buttonProps}>
      {loading && (
        <div
          className='h-100 w-100'
          style={{ position: 'absolute', top: 0, left: 0 }}
        >
          <div className='h-100 w-100' style={{ position: 'relative' }}>
            <Image
              layout='fill'
              objectFit={'contain'}
              {...loader}
              alt='loading'
            />
          </div>
        </div>
      )}

      <div style={{ visibility: loading ? 'hidden' : 'visible' }}>
        {children}
      </div>
    </Button>
  )
}
