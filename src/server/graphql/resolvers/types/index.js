import merge from 'lodash.merge'

import album from './album'
import search from './search'
import user from './user'

const types = merge(album, search, user)

export default types
