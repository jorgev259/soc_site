import classnames from 'classnames'

const size = '20px'

export default function SubmitButton (props) {
  const { loading = false, className, children, ...buttonProps } = props

  return (
    <button {...buttonProps} type='submit' className={classnames('btn btn-primary', className)} disabled={loading}>
      {loading
        ? (
          <>
            <span class="spinner-border spinner-border" aria-hidden="true" style={{ width: size, height: size }}></span>
            <span class="visually-hidden" role="status">Loading...</span>
          </>
        )
        : children}
    </button>
  )
}
