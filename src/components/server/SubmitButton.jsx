import classnames from 'classnames'
import loader from 'svg-loaders/svg-smil-loaders/oval.svg'
import Image from 'next/image'

export default function SubmitButton (props) {
  const { loading = false, className, children, ...buttonProps } = props

  return (
    <button {...buttonProps} type='submit' className={classnames('btn btn-primary', className, { 'py-0': loading })} disabled={loading}>
      {loading ? <Image alt='' src={loader.src} height={35} width={35} /> : children}
    </button>
  )
}
