import classNames from 'classnames'

import Portal from '../client/Portal'

const getSelector = selector => selector[0] === '#' ? selector : `#${selector}`
const getElement = selector => document.querySelector(getSelector(selector))

export function hideModal (selector) {
  const element = getElement(selector)
  const modal = bootstrap.Modal.getInstance(element)
  modal.hide()
}

export function showModal (selector) {
  const element = getElement(selector)
  const modal = bootstrap.Modal.getOrCreateInstance(element)
  modal.show()
}

export default function Modal (props) {
  const { id, children, className } = props

  return (
    <div id={id} className="modal fade" tabIndex="-1">
      <div className={classNames('modal-dialog', className)}>
        {children}
      </div>
    </div>
  )
}

export function ModalPortal (props) {
  const { id, children, className, ...rest } = props

  return (
    <Portal selector="#modal">
      <Modal id={id} className={classNames(className, 'modal-dialog-centered')} {...rest}>
        {children}
      </Modal>
    </Portal>
  )
}

export function ModalTemplate (props) {
  const { id, children, ...rest } = props

  return (
    <ModalPortal id={id} {...rest}>
      <div className="modal-content">
        <div className="modal-body m-3">
          {children}
        </div>
      </div>
    </ModalPortal>
  )
}
