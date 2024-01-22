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

export async function toggleFavorite (prevState: any, formData: FormData) {
  const id = formData.get('id')
  const isFavorite = formData.get('current') === 'on' ?? false

  const mutation = isFavorite ? removeFavorite : addFavorite
  return serverMutate({ mutation, variables: { id } })
}
