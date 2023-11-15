import { getIronSession, getServerActionIronSession } from 'iron-session-v8'
import { cookies } from 'next/headers'

export const sessionOptions = {
  password: process.env.IRONCLAD,
  cookieName: 'socuser',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production'
  }
}

export const getSession = async (req, res) => {
  const session = getIronSession(req, res, sessionOptions)
  return session
}

export const getServerActionSession = async () => {
  const session = getServerActionIronSession(sessionOptions, cookies())
  return session
}
