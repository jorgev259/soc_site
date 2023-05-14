
import mutations from './mutations/*'
import queries from './queries/*'
import types from './types/*'

const listResolvers = obj => Object.entries(obj).map(([_, value]) => value)

const resolvers = [...listResolvers(mutations), ...listResolvers(queries), ...listResolvers(types)]

export default resolvers
