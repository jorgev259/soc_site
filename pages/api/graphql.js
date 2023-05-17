import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'
import { loadFilesSync } from '@graphql-tools/load-files'
import path from 'path'

import resolvers from '@/graphql/resolvers'
import db from '@/sequelize/startDB'
import { withSessionApiRoute } from '@/utils/session'

const schemas = loadFilesSync(path.join(process.cwd(), './server/graphql/schemas'))

const apolloServer = new ApolloServer({
  typeDefs: mergeTypeDefs(schemas),
  resolvers: mergeResolvers(resolvers)
})

export default startServerAndCreateNextHandler(apolloServer, {
  context: withSessionApiRoute(async (req, res) => {
    const { username } = req.session
    return { db, req, res, username, user: username && await db.models.user.findByPk(username) }
  })
})
