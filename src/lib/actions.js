'use server'
import { gql } from '@apollo/client'
import bcrypt from 'bcrypt'

import { getClient } from './ApolloSSRClient'
import { getServerActionSession } from './session'
import db from '../server/sequelize/startDB'

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

const loginError = new Error('Incorrect username or password')

export async function login (formData) {
  const session = await getServerActionSession()
  const client = await getClient()

  const username = formData.get('username')
  const password = formData.get('password')

  const user = await db.models.user.findByPk(username)
  if (!user) throw loginError

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) throw loginError

  session.username = user.username
  await session.save()
  client.resetStore()
}

export async function logout () {
  const session = await getServerActionSession()
  const client = await getClient()

  await session.destroy()
  client.resetStore()
}
