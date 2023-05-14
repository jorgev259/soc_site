import Sequelize from 'sequelize'

import relations from '../sequelize/relations'
import models from './models/*'

const db = new Sequelize(process.env.GITHUB_ACTIONS ? 'sqlite::memory:' : JSON.parse(process.env.SEQUELIZE))

Object.values(models).forEach(model => model(db))
relations(db)

export default db
