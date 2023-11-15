import { HttpLink } from '@apollo/client'
import { NextSSRInMemoryCache, NextSSRApolloClient } from '@apollo/experimental-nextjs-app-support/ssr'
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc'
import { setContext } from '@apollo/client/link/context'
import { sealData } from 'iron-session-v8'
// import { SchemaLink } from '@apollo/client/link/schema'

import { graphQLUri } from '../constants/env'
import getServerActionSession from './getServerActionSession'
import sessionOptions from './sessionOptions'
// import { schema } from './graphql'

const httpLink = new HttpLink({ uri: graphQLUri, credentials: 'same-origin' })
// const schemaLink = new SchemaLink({ schema })
const authLink = setContext(async (_, { headers }) => {
  const session = await getServerActionSession()
  const seal = await sealData(session, sessionOptions)
  const authorization = seal || ''

  return { headers: { ...headers, authorization } }
})

export const { getClient } = registerApolloClient(() => {
  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: authLink.concat(httpLink)
  })
})
