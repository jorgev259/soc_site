
import path from 'path'
import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'
import { makeExecutableSchema } from '@graphql-tools/schema'

import resolverArray from '@/server/graphql/resolvers'

const typeDefArray = loadFilesSync(path.join(process.cwd(), 'src/server/graphql/schemas'))

export const resolvers = mergeResolvers(resolverArray)
export const typeDefs = mergeTypeDefs(typeDefArray)
export const schema = makeExecutableSchema({ typeDefs, resolvers })
