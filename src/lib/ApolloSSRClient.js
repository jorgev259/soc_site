'use server'
import { HttpLink } from '@apollo/client'
import { NextSSRInMemoryCache, NextSSRApolloClient } from '@apollo/experimental-nextjs-app-support/ssr'
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc'

import { graphQLUri } from '../constants/env'

const httpLink = new HttpLink({ uri: graphQLUri })

export const { getClient } = registerApolloClient(() => {
  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: httpLink
  })
})
