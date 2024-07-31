'use strict'

const tables = [
  'Ost_Animation',
  'Ost_Category',
  'Ost_Classification',
  'Ost_Game',
  'Ost_Platform',
  'Ost_Type',
  'Ost_Artist',
  'ostHistories',
  'related_ost'
]

const columns = [
  'availables',
  'comments',
  'discs',
  'downloads',
  'favorites',
  'linkCategories',
  'ratings',
  'stores',

  ...tables
]

const replaceName = name => name.replace('ost', 'album').replace('Ost', 'Album')

module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.sequelize.transaction(async transaction => {
      for (const tableName of columns) {
        await queryInterface.renameColumn(tableName, 'ostId', 'albumId', { transaction })
      }

      await queryInterface.renameTable('ost', 'albums', { transaction })
      for (const tableName of tables) {
        await queryInterface.renameTable(tableName, replaceName(tableName), { transaction })
      }
    })
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.renameTable('albums', 'ost', { transaction })

      for (const tableName of tables) {
        await queryInterface.renameTable(replaceName(tableName), tableName, { transaction })
      }

      for (const tableName of columns) {
        await queryInterface.renameColumn(tableName, 'albumId', 'ostId', { transaction })
      }
    })
  }
}
