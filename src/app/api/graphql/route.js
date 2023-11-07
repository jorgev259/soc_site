import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'
import { loadFilesSync } from '@graphql-tools/load-files'
import path from 'path'
import { unsealData } from 'iron-session'

import resolvers from '@/server/graphql/resolvers'
import db from '@/server/sequelize/startDB'
import { sessionOptions } from '@/lib/session'

const schemas = loadFilesSync(path.join(process.cwd(), 'src/server/graphql/schemas'))
const server = new ApolloServer({
  typeDefs: mergeTypeDefs(schemas),
  resolvers: mergeResolvers(resolvers),
  introspection: process.env.NODE_ENV !== 'production'
})

const handler = startServerAndCreateNextHandler(server, {
  context: async (req, res) => {
    const token = req.headers.get('authorization')
    const session = await unsealData(token, sessionOptions) || {}
    const { username } = session
    const user = username && await db.models.user.findByPk(username)

    return { db, req, res, username, user, session }
  }
})

export { handler as GET, handler as POST }
