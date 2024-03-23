'use server'
import { gql } from '@apollo/client'

import { serverMutate } from './graphql'

const addFavorite = gql`
  mutation AddFavorite($id: String!) {
    addFavorite(albumId: $id)
  }
`
const removeFavorite = gql`
  mutation RemoveFavorite($id: String!) {
    removeFavorite(albumId: $id)
  }
`

export async function toggleFavorite(currState: any, formData: FormData) {
  const id = formData.get('id')
  const isFavorite = formData.get('current') === 'on' ?? false
  const mutation = isFavorite ? removeFavorite : addFavorite

  return serverMutate({ mutation, variables: { id } })
}

const mutationRating = gql`
  mutation RateAlbum($id: ID!, $score: Int!) {
    rateAlbum(albumId: $id, score: $score)
  }
`

export async function setRating(id: string | number, score: number) {
  return serverMutate({ mutation: mutationRating, variables: { id, score } })
}
