import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc'
import { setContext } from '@apollo/client/link/context'
import { cookies } from 'next/headers'

import { graphQLUri } from '../constants/env'
import sessionOptions from './sessionOptions'

const httpLink = new HttpLink({ uri: graphQLUri })
const authLink = setContext((_, context) => {
  const { headers } = context
  const cookieStore = cookies()
  const token = cookieStore.get(sessionOptions.cookieName)?.value

  if (token) {
    return {
      headers: { ...headers, authorization: token ? `Bearer ${token}` : '' }
    }
  } else {
    return headers
  }
})

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink)
  })
})
