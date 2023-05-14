import { withIronSessionSsr, withIronSessionApiRoute } from 'iron-session/next'

const options = {
  password: process.env.IRONCLAD,
  cookieName: 'socuser'
}

export const withSessionApi = handler =>
  withIronSessionApiRoute(handler, options)

export const withSessionSsr = handler =>
  withIronSessionSsr(handler, options)
