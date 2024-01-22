export function getMessageObject (t, names) {
  const result = names.reduce((acc, n) => {
    acc[n] = t(n)
    return acc
  }, {})

  return result
}
