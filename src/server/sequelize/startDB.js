import mysql2 from 'mysql2'
import Sequelize from 'sequelize'

import relations from './relations'
import models from './models'

const options = process.env.GITHUB_ACTIONS ? 'sqlite::memory:' : JSON.parse(process.env.SEQUELIZE)
if (!process.env.GITHUB_ACTIONS && options.dialect === 'mysql') options.dialectModule = mysql2

const db = new Sequelize(options)

Object.values(models).forEach(model => model(db))
relations(db)

export default db
