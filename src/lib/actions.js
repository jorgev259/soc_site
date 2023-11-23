'use server'
import db from '../server/sequelize/startDB'

export async function getBanner () {
  const { value } = await db.models.config.findByPk('banner')
  return value
}
