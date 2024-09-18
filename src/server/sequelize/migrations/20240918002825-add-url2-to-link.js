'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('links', 'url2', {
      type: Sequelize.DataTypes.STRING
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('links', 'url2')
  }
}
