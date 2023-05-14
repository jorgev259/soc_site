const { DataTypes } = require('sequelize')

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('series', 'placeholder', { type: DataTypes.TEXT }),

  down: async (queryInterface, Sequelize) =>
    queryInterface.removeColumn('series', 'placeholder')
}
