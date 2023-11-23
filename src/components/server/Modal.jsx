export default function Modal (props) {
  const { id, children } = props

  return (
    <div id={id} className="modal fade" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        {children}
      </div>
    </div>
  )
}
