'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameTable('category', 'classification')
    await queryInterface.renameTable('Ost_Category', 'Ost_Classification')

    await queryInterface.renameTable('class', 'category')
    await queryInterface.renameTable('Ost_Class', 'Ost_Category')
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameTable('category', 'class')
    await queryInterface.renameTable('Ost_Category', 'Ost_Class')

    await queryInterface.renameTable('classification', 'category')
    await queryInterface.renameTable('Ost_Classification', 'Ost_Category')
  }
}
