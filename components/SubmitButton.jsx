import { Button } from 'reactstrap'
import classnames from 'classnames'
import loader from 'svg-loaders/svg-smil-loaders/oval.svg'
import Image from 'next/image'

export default function SubmitButton (props) {
  const { loading = false, className, children, ...buttonProps } = props

  return (
    <Button {...buttonProps} type='submit' color='primary' className={classnames(className, { 'py-0': loading })} disabled={loading}>
      {loading ? <Image alt='' src={loader.src} height={35} width={35} /> : children}
    </Button>
  )
}
