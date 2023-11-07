import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'
import { loadFilesSync } from '@graphql-tools/load-files'
import path from 'path'

import resolvers from '@/server/graphql/resolvers'
import db from '@/server/sequelize/startDB'
import { getServerActionSession, getSession } from '@/components/session'

const schemas = loadFilesSync(path.join(process.cwd(), './server/graphql/schemas'))
const server = new ApolloServer({
  typeDefs: mergeTypeDefs(schemas),
  resolvers: mergeResolvers(resolvers)
})

const handler = startServerAndCreateNextHandler(server, {
  context: async (req, res) => {
    const newRes = {
      ...res,
      getHeader: (name) => res.headers?.get(name),
      setHeader: (name, value) => res.headers?.set(name, value)
    }

    return { db, req, res: newRes }
  }
})

export { handler as GET, handler as POST }
