import { getIronSession } from 'iron-session'
import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next'

const sessionOptions = {
  password: process.env.IRONCLAD,
  cookieName: 'socuser',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production'
  }
}

export const withSessionApiRoute = (handler) =>
  withIronSessionApiRoute(handler, sessionOptions)

export const withSessionSsr = (handler) =>
  withIronSessionSsr(handler, sessionOptions)

export const getSession = (req, res) =>
  getIronSession(req, res, sessionOptions)
