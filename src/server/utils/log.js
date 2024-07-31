import { getSession } from '@/next/utils/getSession'

export const createLog = async (db, action, data, transaction) => db.models.log.create({ action, data: JSON.stringify(data), username: await getSession().username }, { transaction })
export const createUpdateLog = async (db, action, row) => createLog(db, action, { old: row._previousDataValues, new: row.dataValues })
