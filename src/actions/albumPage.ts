'use server'
import { gql } from '@apollo/client'

import { serverMutate } from './graphql'

const favoriteTemplate = query => gql`
  mutation ${query}Favorite ($id: String!) {
    ${query}Favorite(albumId: $id)
  }
`
const addFavorite = favoriteTemplate('add')
const removeFavorite = favoriteTemplate('remove')

function removeEmpty (obj) {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null))
}

export async function toggleFavorite (currState:any, formData: FormData) {
  try {
    const id = formData.get('id')
    const isFavorite = formData.get('current') === 'on' ?? false

    const mutation = isFavorite ? removeFavorite : addFavorite
    const response = await serverMutate({ mutation, variables: { id } })

    return response
  } catch (error) {
    const { message, stack, clientErrors, GraphQLErrors, name, networkError, protocolErrors } = error

    return {
      ok: false,
      error: removeEmpty({ message, stack, clientErrors, GraphQLErrors, name, networkError, protocolErrors })
    }
  }
}