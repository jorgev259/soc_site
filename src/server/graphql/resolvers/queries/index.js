import merge from 'lodash.merge'

import album from './album'
import requests from './requests'
import search from './search'
import site from './site'
import user from './user'

const queries = merge(album, requests, search, site, user)

export default queries
