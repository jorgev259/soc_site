export const isSSR = typeof window === 'undefined'
export const isDev = process.env.NODE_ENV === 'development'

const origin = isSSR ? 'http://127.0.0.1:3000' : window.origin
export const graphQLUri = `${origin}/api`
