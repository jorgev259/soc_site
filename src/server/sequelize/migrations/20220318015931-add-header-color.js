
module.exports = {
  async up (queryInterface, Sequelize) {
    const config = { type: Sequelize.DataTypes.STRING, defaultValue: '#ffffff' }

    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('ost', 'headerColor', config, { transaction: t }),
        queryInterface.addColumn('game', 'headerColor', config, { transaction: t }),
        queryInterface.addColumn('animation', 'headerColor', config, { transaction: t }),
        queryInterface.addColumn('series', 'headerColor', config, { transaction: t })
      ])
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('ost', 'headerColor', { transaction: t }),
        queryInterface.removeColumn('game', 'headerColor', { transaction: t }),
        queryInterface.removeColumn('animation', 'headerColor', { transaction: t }),
        queryInterface.removeColumn('series', 'headerColor', { transaction: t })
      ])
    })
  }
}
