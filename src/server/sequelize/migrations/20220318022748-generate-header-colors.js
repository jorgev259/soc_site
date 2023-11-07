const path = require('path')
const fs = require('fs-extra')
const sharp = require('sharp')

function colorToHex (color) {
  const hexadecimal = color.toString(16)
  return hexadecimal.length === 1 ? '0' + hexadecimal : hexadecimal
}

function convertRGBtoHex (red, green, blue) {
  return '#' + colorToHex(red) + colorToHex(green) + colorToHex(blue)
}

const getImgColor = async (filePath) => {
  const pathString = path.join('/var/www/soc_img/img', filePath)
  if (!await fs.exists(pathString)) return '#ffffff'

  const { dominant } = await sharp(pathString).stats()
  const { r, g, b } = dominant

  return convertRGBtoHex(r, g, b)
}

module.exports = {
  async up (queryInterface, Sequelize) {
    const [ostRows] = await queryInterface.sequelize.query('SELECT id FROM ost')
    const [animRows] = await queryInterface.sequelize.query('SELECT id FROM animation')
    const [gameRows] = await queryInterface.sequelize.query('SELECT slug FROM game')
    const [seriesRows] = await queryInterface.sequelize.query('SELECT slug FROM series')

    console.log('Updating ost images')
    await Promise.all(
      ostRows.map(async r =>
        queryInterface.sequelize.query('UPDATE ost SET headerColor=? WHERE id=?', { replacements: [await getImgColor(`album/${r.id}.png`), r.id] })
      )
    )

    console.log('Updating animation images')
    await Promise.all(
      animRows.map(async r =>
        queryInterface.sequelize.query('UPDATE animation SET headerColor=? WHERE id=?', { replacements: [await getImgColor(`anim/${r.id}.png`), r.id] })
      )
    )

    console.log('Updating game images')
    await Promise.all(
      gameRows.map(async r =>
        queryInterface.sequelize.query('UPDATE game SET headerColor=? WHERE slug=?', { replacements: [await getImgColor(`game/${r.slug}.png`), r.slug] })
      )
    )

    console.log('Updating series images')
    await Promise.all(
      seriesRows.map(async r =>
        queryInterface.sequelize.query('UPDATE series SET headerColor=? WHERE slug=?', { replacements: [await getImgColor(`series/${r.slug}.png`), r.slug] })
      )
    )
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
}
