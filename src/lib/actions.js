'use server'
import { gql } from '@apollo/client'
import { getClient } from './ApolloSSRClient'
import { getServerActionSession } from './session'

const pagesQuery = gql`
  query getPages{
    me {
      pages {
        url
      }
    }
  }
`

export async function getPages () {
  const client = getClient()
  const { data: pagesData } = await client.query({ query: pagesQuery })

  return pagesData
}

export async function login (username) {
  const session = await getServerActionSession()
  const client = await getClient()

  session.username = username
  await session.save()
  client.resetStore()
}

export async function logout () {
  const session = await getServerActionSession()
  const client = await getClient()

  await session.destroy()
  client.resetStore()
}
