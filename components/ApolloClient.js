import { useMemo } from 'react'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'

let apolloClient
const isSSR = typeof window === 'undefined'
const forcedUri = process.env.FORCE_CLIENT_URI || ''
const isGithub = process.env.GITHUB_ACTIONS
const isDev = process.env.NODE_ENV === 'development'
const graphQLUri = isGithub
  ? 'https://sittingonclouds.net/api'
  : forcedUri || (isSSR || isDev || window.origin === 'http://localhost:3000' ? 'http://localhost:3000/api' : `${window.origin}/api`)

function createApolloClient () {
  return new ApolloClient({
    ssrMode: isSSR,
    link: createUploadLink({ uri: graphQLUri, credentials: 'include' }),
    cache: new InMemoryCache()
  })
}

export function initializeApollo (initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient()

  if (initialState) _apolloClient.cache.restore(initialState)

  // For SSG and SSR always create a new Apollo Client
  if (isSSR) return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function useApollo (initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState])
  return store
}
