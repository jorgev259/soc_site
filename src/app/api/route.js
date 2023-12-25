import { cookies } from 'next/headers'
import { ApolloServer, HeaderMap } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { getIronSession } from 'iron-session'
import { processRequest } from 'graphql-upload-minimal'
import { Readable } from 'stream'

import db from '@/next/server/sequelize/startDB'
import sessionOptions from '@/next/lib/sessionOptions'
import { schema } from '@/next/lib/graphql'

const server = new ApolloServer({ schema, introspection: process.env.NODE_ENV !== 'production' })

async function context (req, res) {
  const cookieStore = cookies()
  const session = await getIronSession(cookieStore, sessionOptions)
  const { username } = session
  const user = username && await db.models.user.findByPk(username)

  return { db, username, user, session, req, res }
}

const handler = startServerAndCreateNextHandler(server, { context })

async function createGraphqlRequest (req, res) {
  const readStream = Readable.fromWeb(req.body)
  readStream.headers = Object.fromEntries(req.headers.entries())

  const body = await processRequest(readStream, res)
  const headers = new HeaderMap()

  for (const [key, value] of req.headers.entries()) {
    if (value !== undefined) {
      headers.set(key, Array.isArray(value) ? value.join(', ') : value)
    }
  }

  const url = new URL(req.url)
  const httpGraphQLRequest = {
    body,
    headers,
    method: req.method || 'POST',
    search: url.search ?? ''
  }

  return httpGraphQLRequest
}

async function createHttpResponse (req, res) {
  const httpGraphQLResponse = await server.executeHTTPGraphQLRequest({
    httpGraphQLRequest: await createGraphqlRequest(req, res),
    context: () => context(req, res)
  })

  const bodyArray = []
  if (httpGraphQLResponse.body.kind === 'complete') {
    bodyArray.push(httpGraphQLResponse.body.string)
  } else {
    for await (const chunk of httpGraphQLResponse.body.asyncIterator) {
      bodyArray.push(chunk)
    }
  }

  const headers = {}
  for (const [key, value] of httpGraphQLResponse.headers) {
    headers[key] = value
  }

  const body = bodyArray.join('')
  const response = new Response(body, { headers, status: httpGraphQLResponse.status || 200 })

  return response
}

export async function POST (req, res) {
  const cookieStore = cookies()

  const contentType = req.headers.get('content-type')
  if (contentType && contentType.includes('multipart/form-data')) {
    const response = await createHttpResponse(req, res)
    return response
  } else {
    return handler(req, res)
  }
}

export { handler as GET }
