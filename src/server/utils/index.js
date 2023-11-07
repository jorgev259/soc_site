import slugifyFn from 'slugify'
import serialize from 'form-serialize'
import fs from 'fs-extra'
import path from 'path'
import sharp from 'sharp'

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

export const slugify = text => slugifyFn(text, { lower: true, strict: true })

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

function colorToHex (color) {
  const hexadecimal = color.toString(16)
  return hexadecimal.length === 1 ? '0' + hexadecimal : hexadecimal
}

function convertRGBtoHex (red, green, blue) {
  return '#' + colorToHex(red) + colorToHex(green) + colorToHex(blue)
}

export const getImgColor = async filePath => {
  const pathString = path.join('/var/www/soc_img/img', `${filePath}.png`)
  if (!await fs.exists(pathString)) return null

  const { dominant } = await sharp(pathString).stats()
  const { r, g, b } = dominant

  return convertRGBtoHex(r, g, b)
}

export const img = async (streamItem, folder, id) => {
  const { createReadStream } = await streamItem
  const pathString = path.join('/var/www/soc_img/img', folder)
  const fullPath = path.join(pathString, `${id}.png`)

  await fs.ensureDir(pathString)

  return new Promise((resolve, reject) => {
    const writeStream = fs.createWriteStream(fullPath)

    createReadStream().pipe(writeStream)
      .on('finish', async () => resolve(await processImage(fullPath)))
      .on('error', reject)
  })
}

export async function processImage (imagePath) {
  const sharpImg = sharp(imagePath)
  const meta = await sharpImg.metadata()
  const placeholderImgWidth = 20
  const imgAspectRatio = meta.width / meta.height
  const placeholderImgHeight = Math.round(placeholderImgWidth / imgAspectRatio)

  const buffer = await sharpImg
    .resize(placeholderImgWidth, placeholderImgHeight)
    .toBuffer()

  return `data:image/${meta.format};base64,${buffer.toString('base64')}`
}

export const createLog = (db, action, data, username, transaction) => db.models.log.create({ action, data: JSON.stringify(data), username }, { transaction })
export const createUpdateLog = (db, action, row, username) => createLog(db, action, { old: row._previousDataValues, new: row.dataValues }, username)
