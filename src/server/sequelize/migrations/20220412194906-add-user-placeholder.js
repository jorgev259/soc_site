'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn('users', 'placeholder', { type: Sequelize.DataTypes.TEXT })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('users', 'placeholder')
  }
}
