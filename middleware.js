// /middleware.ts
import { NextResponse } from 'next/server'
import { getIronSession } from 'iron-session/edge'

// app.use(ironSession({ password: process.env.IRONCLAD, cookieName: 'socuser' }))

export const middleware = async (req) => {
  const res = NextResponse.next()
  const session = await getIronSession(req, res, {
    cookieName: 'socuser',
    password: process.env.IRONCLAD,
    cookieOptions: { secure: process.env.NODE_ENV === 'production' }
  })

  return res
}

export const config = {
  // matcher: "/admin",
}
