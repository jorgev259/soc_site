import { HttpLink } from '@apollo/client'
import { NextSSRInMemoryCache, NextSSRApolloClient } from '@apollo/experimental-nextjs-app-support/ssr'
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc'
import { setContext } from '@apollo/client/link/context'
import { sealData } from 'iron-session'

import { graphQLUri } from '@/utils/constants'
import { getServerActionSession, sessionOptions } from './session'

const httpLink = new HttpLink({ uri: graphQLUri, credentials: 'same-origin' })
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
