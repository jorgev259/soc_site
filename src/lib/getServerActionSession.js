'use server'
import { getServerActionIronSession } from 'iron-session-v8'
import { cookies } from 'next/headers'
import sessionOptions from './sessionOptions'

const getServerActionSession = async () => {
  const session = getServerActionIronSession(sessionOptions, cookies())
  return session
}

export default getServerActionSession
