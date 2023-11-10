const forcedUri = process.env.FORCE_CLIENT_URI || ''
const isGithub = process.env.GITHUB_ACTIONS

export const isSSR = typeof window === 'undefined'
export const isDev = process.env.NODE_ENV === 'development'
export const graphQLUri = isGithub
  ? 'https://sittingonclouds.net/api/graphql'
  : forcedUri || 'http://localhost:3000/api/graphql'
