'use client'
import { HttpLink, ApolloLink } from '@apollo/client'
import {
  NextSSRApolloClient,
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  SSRMultipartLink
} from '@apollo/experimental-nextjs-app-support/ssr'

import { graphQLUri } from '../../constants/env'

function makeClient () {
  const httpLink = new HttpLink({ uri: graphQLUri })

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: typeof window === 'undefined'
      ? ApolloLink.from([new SSRMultipartLink({ stripDefer: true }), httpLink])
      : httpLink
  })
}

export function ApolloWrapper ({ children }) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  )
}
