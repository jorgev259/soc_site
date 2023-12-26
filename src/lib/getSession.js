'use server'
import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'

import sessionOptions from './sessionOptions'

const getSession = () => getIronSession(cookies(), sessionOptions)

export async function useSession () {
  const session = await getSession()
  const { username } = session
  const isFAU = username !== undefined

  return { session, isFAU }
}

export default getSession
