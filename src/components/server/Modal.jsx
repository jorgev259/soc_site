import Portal from '../client/Portal'

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

export function ModalTemplate (props) {
  const { id, children } = props
  return (
    <Portal selector="#modal">
      <Modal id={id}>
        <div className="modal-content">
          <div className="modal-body m-3">
            {children}
          </div>
        </div>
      </Modal>
    </Portal>
  )
}
