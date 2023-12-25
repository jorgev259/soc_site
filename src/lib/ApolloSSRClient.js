'use server'
import { NextSSRInMemoryCache, NextSSRApolloClient } from '@apollo/experimental-nextjs-app-support/ssr'
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc'
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs'

import { graphQLUri } from '../constants/env'

const httpLink = createUploadLink({ uri: graphQLUri, headers: { 'Apollo-Require-Preflight': true }, credentials: 'include' })

export const { getClient } = registerApolloClient(() => {
  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: httpLink
  })
})
