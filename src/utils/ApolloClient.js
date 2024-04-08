import { useMemo } from 'react'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs'

import { isSSR, graphQLUri } from '../constants/env'

let apolloClient

const httpLink = createUploadLink({
  uri: graphQLUri,
  credentials: 'include',
  headers: { 'Apollo-Require-Preflight': true }
})

function createApolloClient() {
  return new ApolloClient({
    ssrMode: isSSR,
    link: httpLink,
    cache: new InMemoryCache()
  })
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient()

  if (initialState) _apolloClient.cache.restore(initialState)

  // For SSG and SSR always create a new Apollo Client
  if (isSSR) return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState])
  return store
}
