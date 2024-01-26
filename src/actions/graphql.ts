'use server'
import { getPathname } from 'next-impl-getters/get-pathname'

import { getClient } from '../lib/ApolloSSRClient'
import { revalidatePath } from 'next/cache'

function removeEmpty (obj) {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null))
}

function handleError (error) {
  const { message, stack, clientErrors, GraphQLErrors, name, networkError, protocolErrors } = error

  return {
    ok: false,
    error: removeEmpty({ message, stack, clientErrors, GraphQLErrors, name, networkError, protocolErrors })
  }
}

export async function serverMutate (...args: any[]) {
  try {
    const client = await getClient()
    const response = await client.mutate.apply(null, args)

    const pathname = getPathname()
    if (pathname) revalidatePath(pathname)

    return {
      ok: true,
      response
    }
  } catch (error) {
    return handleError(error)
  }
}
