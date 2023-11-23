import { cookies } from 'next/headers'
import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { getIronSession } from 'iron-session'

import db from '@/next/server/sequelize/startDB'
import sessionOptions from '@/next/lib/sessionOptions'
import { schema } from '@/next/lib/graphql'

const server = new ApolloServer({ schema, introspection: process.env.NODE_ENV !== 'production' })

const handler = startServerAndCreateNextHandler(server, {
  context: async (req, res) => {
    const cookieStore = cookies()
    const session = await getIronSession(cookieStore, sessionOptions)
    const { username } = session
    const user = username && await db.models.user.findByPk(username)

    return { db, username, user, session, req, res }
  }
})

export { handler as GET, handler as POST }
