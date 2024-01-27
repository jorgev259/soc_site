import serialize from 'form-serialize'

export const PLACEHOLDER = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAECAIAAADETxJQAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAMUlEQVQImWN4fGrVhZ0z/v+5zZAc5yfOwGCtrsbg4em/f7ZvZ7w2Q15Vi6e1iggPAwBwDg7L//0+xAAAAABJRU5ErkJggg=='

export function getRandomInt (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const getImageUrl = (id, type = 'album') => `https://cdn.sittingonclouds.net/${type}/${id}.png`
export const skipAds = user => user && user.permissions.includes('SKIP_ADS')
export const getFullPageList = (count, limit) => [...Array(Math.ceil(count / limit))].map((v, i) => i + 1)
export const getPageList = (fullPageList, pageLimit, page) => {
  const pageList = [[]]

  fullPageList.forEach(n => {
    pageList[pageList.length - 1].push(n)
    if (n % pageLimit === 0) pageList.push([])
  })

  const currentListIndex = pageList.findIndex(l => l.includes(parseInt(page)))
  const currentList = pageList[currentListIndex]

  return { pageList, currentList, currentListIndex }
}

export function clearKeys (keys, baseIds) {
  const remove = keys.reduce((acum, key) => {
    const values = baseIds.map(baseId => document.getElementById(`${baseId}${key}`).value)
    if (values.every(value => !value)) acum.push(key)
    return acum
  }, [])

  return keys.filter(k => !remove.includes(k))
}

export const prepareForm = e => {
  const data = serialize(e.target, { hash: true })
  data.releaseDate = new Date(data.releaseDate).toISOString().substring(0, 10)

  if (data.artists) data.artists = data.artists.split(',').map(e => e.trim())

  data.discs = data.discs.map((d, i) => {
    const payload = d
    payload.number = i
    return payload
  })
  if (data.downloads) data.downloads.forEach(link => { link.small = link.small === 'on' })
  if (e.target.elements.cover.files[0] !== undefined) data.cover = e.target.elements.cover.files[0]

  return data
}
