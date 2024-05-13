'use server'
import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'

import sessionOptions from '../constants/sessionOptions'
import type { SessionData } from '../server/types'

export const getSession = () =>
  getIronSession<SessionData>(cookies(), sessionOptions)

export async function getUser(db) {
  const session = await getSession()
  const { username = null } = session

  return username ? db.models.user.findByPk(username) : null
}

export default async function getSessionInfo() {
  const session = await getSession()
  const { username } = session
  const isFAU = username !== undefined

  return { session, isFAU }
}
