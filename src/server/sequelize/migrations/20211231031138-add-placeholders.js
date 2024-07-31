const { DataTypes } = require('sequelize')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('ost', 'placeholder', { type: DataTypes.TEXT }),
        queryInterface.addColumn('animation', 'placeholder', { type: DataTypes.TEXT }),
        queryInterface.addColumn('game', 'placeholder', { type: DataTypes.TEXT })
      ])
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('ost', 'placeholder'),
        queryInterface.removeColumn('animation', 'placeholder'),
        queryInterface.removeColumn('game', 'placeholder')
      ])
    })
  }
}
