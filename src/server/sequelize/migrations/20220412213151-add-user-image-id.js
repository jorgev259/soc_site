'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn('users', 'imgId', { type: Sequelize.DataTypes.STRING })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('users', 'imgId')
  }
}
