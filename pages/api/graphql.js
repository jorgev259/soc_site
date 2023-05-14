import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'
import { loadFilesSync } from '@graphql-tools/load-files'
import path from 'path'

import resolvers from '@/graphql/resolvers'

const isProd = process.env.NODE_ENV === 'production'
const schemas = loadFilesSync(path.join(__dirname, './graphql/schemas'))

const apolloServer = new ApolloServer({
  typeDefs: mergeTypeDefs(schemas),
  resolvers: mergeResolvers(resolvers)
  /* plugins: [
    isProd
      ? ApolloServerPluginLandingPageDisabled()
      : ApolloServerPluginLandingPageGraphQLPlayground()
  ] */
})

export default startServerAndCreateNextHandler(apolloServer, {
  context: async (req, res) => {
    const { username } = req.session || {}
    return { /* db, */ req, res, username /* user: username && await db.models.user.findByPk(username) */ }
  }
})
