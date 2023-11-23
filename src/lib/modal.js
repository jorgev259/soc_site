export function hideModal (selector) {
  const element = document.querySelector(selector)
  const modal = bootstrap.Modal.getInstance(element)
  modal.hide()
}
