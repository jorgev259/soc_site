import { cookies, headers } from 'next/headers'
import { ApolloServer, HeaderMap } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { processRequest } from 'graphql-upload-minimal'
import { Readable } from 'stream'

import db from '@/server/sequelize/startDB'
import sessionOptions from '@/next/lib/sessionOptions'
import { schema } from '@/next/lib/graphql'

const server = new ApolloServer({ schema, introspection: process.env.NODE_ENV !== 'production' })
const context = (req, res) => ({ db, req, res })
// @ts-ignore
const handler = startServerAndCreateNextHandler(server, { context })

async function createGraphqlRequest (req, res) {
  const readStream = Readable.fromWeb(req.body)
  // @ts-ignore
  readStream.headers = Object.fromEntries(req.headers.entries())

  // @ts-ignore
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
    context: async () => context(req, res)
  })

  const bodyArray = []
  if (httpGraphQLResponse.body.kind === 'complete') {
    // @ts-ignore
    bodyArray.push(httpGraphQLResponse.body.string)
  } else {
    for await (const chunk of httpGraphQLResponse.body.asyncIterator) {
      // @ts-ignore
      bodyArray.push(chunk)
    }
  }

  const headers = {}
  // @ts-ignore
  for (const [key, value] of httpGraphQLResponse.headers) {
    headers[key] = value
  }

  const body = bodyArray.join('')
  const response = new Response(body, { headers, status: httpGraphQLResponse.status || 200 })

  return response
}

export async function POST (req, res) {
  const headerStore = headers()
  const cookieStore = cookies()
  const { cookieName } = sessionOptions

  if (headerStore.has('authorization')) {
    const token = (headerStore.get('authorization') ?? '').replace('Bearer ', '')
    cookieStore.set(cookieName, token)
  }

  const contentType = req.headers.get('content-type')
  if (contentType && contentType.includes('multipart/form-data')) {
    const response = await createHttpResponse(req, res)
    return response
  } else {
    return handler(req, res)
  }
}

export { handler as GET } // @ts-ignore
