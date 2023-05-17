export const isSSR = typeof window === 'undefined'
export const isDev = process.env.NODE_ENV === 'development'
