'use client'
import { ApolloClient, ApolloLink, HttpLink, SuspenseCache } from '@apollo/client'
import { ApolloNextAppProvider, NextSSRInMemoryCache, SSRMultipartLink } from '@apollo/experimental-nextjs-app-support/ssr'

import { isSSR, graphQLUri } from '@/utils/shared/constants'

function makeClient () {
  const httpLink = new HttpLink({
    uri: graphQLUri,
    fetchOptions: { cache: 'no-store' }
  })

  return new ApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: isSSR
      ? ApolloLink.from([new SSRMultipartLink({ stripDefer: true }), httpLink])
      : httpLink
  })
}

// also have a function to create a suspense cache
function makeSuspenseCache () {
  return new SuspenseCache()
}

// you need to create a component to wrap your app in
export function ApolloWrapper ({ children }) {
  return (
    <ApolloNextAppProvider makeClient={makeClient} makeSuspenseCache={makeSuspenseCache}>
      {children}
    </ApolloNextAppProvider>
  )
}
