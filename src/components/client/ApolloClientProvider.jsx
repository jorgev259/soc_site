'use client'
import { ApolloLink } from '@apollo/client'
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs'
import {
  NextSSRApolloClient,
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  SSRMultipartLink
} from '@apollo/experimental-nextjs-app-support/ssr'

import { graphQLUri } from '@/next/constants/env'

const httpLink = createUploadLink({ uri: graphQLUri, headers: { 'Apollo-Require-Preflight': true } })
const ssrLink = ApolloLink.from([new SSRMultipartLink({ stripDefer: true }), httpLink])

function makeClient () {
  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: typeof window === 'undefined' ? ssrLink : httpLink
  })
}

export function ApolloWrapper ({ children }) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  )
}
