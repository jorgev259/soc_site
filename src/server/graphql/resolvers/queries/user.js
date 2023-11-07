import { UserInputError } from 'apollo-server-errors'
import bcrypt from 'bcrypt'
import { Op } from 'sequelize'
import { composeResolvers } from '@graphql-tools/resolvers-composition'

import info from '@/utils/config/info.json'
import { hasRole } from '../../../utils/resolvers'
import { getServerActionSession, getSession } from '@/components/session'

const { permissions } = info

async function getUser (db) {
  const session = await getServerActionSession()
  const { username } = session

  const user = username && await db.models.user.findByPk(username)
  return user
}

const resolversComposition = { 'Query.users': hasRole('MANAGE_USER') }
const resolvers = {
  Query: {
    login: async (parent, { username, password }, { db, req, res }) => {
      const user = await db.models.user.findByPk(username)
      if (!user) throw new UserInputError()

      const valid = await bcrypt.compare(password, user.password)
      if (!valid) throw new UserInputError()

      const session = await getServerActionSession()
      session.username = user.username
      session.permissions = (await user.getRoles()).map(r => r.permissions).flat()
      await session.save()

      const reqSession = await getSession(req, res)
      reqSession.username = user.username
      reqSession.permissions = (await user.getRoles()).map(r => r.permissions).flat()
      await reqSession.save()

      return 200
    },
    logout: async (parent, args, { req, res }) => {
      const session = await getServerActionSession()
      session.destroy()

      const reqSession = await getSession(req, res)
      reqSession.destroy()

      return 200
    },
    me: async (parent, args, { db, req, res }) => {
      const session = await getServerActionSession()
      const reqSession = await getSession(req, res)
      const user = await getUser(db)

      return user
    },
    permissions: () => permissions,
    roles: (parent, args, { db }) => db.models.role.findAll(),
    users: (parent, args, { db }) => {
      const search = args.search.trim()
      if (search.length < 3) return []

      return db.models.user.findAll({
        where: {
          [Op.or]: [
            { username: { [Op.like]: `%${search}%` } },
            { email: search }
          ]
        }
      })
    },
    user: (parent, { username }, { db }) => db.models.user.findByPk(username)
  }
}

export default composeResolvers(resolvers, resolversComposition)
