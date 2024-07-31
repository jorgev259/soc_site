'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('Ost_Category', 'className', 'categoryName')
    await queryInterface.renameColumn('Ost_Classification', 'categoryName', 'classificationName')
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('Ost_Category', 'categoryName', 'className')
    await queryInterface.renameColumn('Ost_Classification', 'classificationName', 'categoryName')
  }
}
