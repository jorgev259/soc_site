import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { unsealData } from 'iron-session-v8'

import db from '@/next/server/sequelize/startDB'
import { sessionOptions } from '@/next/lib/session'
import { typeDefs, resolvers } from '@/next/lib/graphql'

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: process.env.NODE_ENV !== 'production'
})

const handler = startServerAndCreateNextHandler(server, {
  context: async (req, res) => {
    const token = req.headers.get('authorization')
    const common = { db, req, res }

    if (!token) return common

    const session = await unsealData(token, sessionOptions) || {}
    const { username } = session
    const user = username && await db.models.user.findByPk(username)

    return { ...common, username, user, session }
  }
})

export { handler as GET, handler as POST }
