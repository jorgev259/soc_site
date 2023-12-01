export function hideModal (selector) {
  const element = document.querySelector(selector)
  const modal = bootstrap.Modal.getInstance(element)
  modal.hide()
}

export function showModal (selector) {
  const element = document.querySelector(selector)
  const modal = bootstrap.Modal.getOrCreateInstance(element)
  modal.show()
}
