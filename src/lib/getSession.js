'use server'
import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'

import sessionOptions from './sessionOptions'

export const getSession = () => getIronSession(cookies(), sessionOptions)
export async function getUser (db) {
  const session = await getSession()
  const { username = null } = session

  return username ? db.models.user.findByPk(username) : null
}

export default async function getSessionInfo () {
  const session = await getSession()
  const { username } = session
  const isFAU = username !== undefined

  return { session, isFAU }
}
