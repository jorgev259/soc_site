'use server'
import { getPathname } from 'next-impl-getters/get-pathname'

import { getClient } from '../lib/ApolloSSRClient'
import { revalidatePath } from 'next/cache'

export async function serverMutate (...args: any[]) {
  const client = await getClient()
  const response = await client.mutate.apply(null, args)

  const pathname = getPathname()
  if (pathname) revalidatePath(pathname)

  return {
    ok: true,
    response
  }
}
