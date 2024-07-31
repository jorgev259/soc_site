import sharp from 'sharp'
import fs from 'fs-extra'
import path from 'path'

function colorToHex (color) {
  const hexadecimal = color.toString(16)
  return hexadecimal.length === 1 ? '0' + hexadecimal : hexadecimal
}

function convertRGBtoHex (red, green, blue) {
  return '#' + colorToHex(red) + colorToHex(green) + colorToHex(blue)
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
