import serialize from 'form-serialize'

export function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function clearKeys(keys, baseIds) {
  const remove = keys.reduce((acum, key) => {
    const values = baseIds.map(
      (baseId) => document.getElementById(`${baseId}${key}`).value
    )
    if (values.every((value) => !value)) acum.push(key)
    return acum
  }, [])

  return keys.filter((k) => !remove.includes(k))
}

export const prepareForm = (e) => {
  const data = serialize(e.target, { hash: true })
  data.releaseDate = new Date(data.releaseDate).toISOString().substring(0, 10)

  if (data.artists) data.artists = data.artists.split(',').map((e) => e.trim())

  data.discs = data.discs.map((d, i) => {
    const payload = d
    payload.number = i
    return payload
  })
  if (data.downloads)
    data.downloads.forEach((link) => {
      link.small = link.small === 'on'
    })
  if (e.target.elements.cover.files[0] !== undefined)
    data.cover = e.target.elements.cover.files[0]

  return data
}
