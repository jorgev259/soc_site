'use client'
import { ApolloLink } from '@apollo/client'
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs'
import {
  NextSSRApolloClient,
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  SSRMultipartLink
} from '@apollo/experimental-nextjs-app-support/ssr'

import { graphQLUri, isSSR } from '@/next/constants/env'

function makeClient () {
  const httpLink = createUploadLink({ uri: graphQLUri, headers: { 'Apollo-Require-Preflight': true }, credentials: 'include' })
  const ssrLink = ApolloLink.from([new SSRMultipartLink({ stripDefer: true }), httpLink])

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: isSSR ? ssrLink : httpLink
  })
}

export function ApolloWrapper ({ children }) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  )
}
