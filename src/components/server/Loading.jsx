const size = '20px'

export default function Loading (props) {
  const { children, loading = false } = props

  return loading
    ? (
      <>
        <span className="spinner-border spinner-border" aria-hidden="true" style={{ width: size, height: size }}></span>
        <span className="visually-hidden" role="status">Loading...</span>
      </>
    )
    : children
}
