'use client'
import { gql, useApolloClient } from '@apollo/client'
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { useState } from 'react'
import { toast } from 'react-toastify'

import Loading from '@/next/components/server/Loading'
import useRefresh from '@/next/utils/useRefresh'

const favoriteQuery = gql`
  query IsFavorite($id: ID!) {
    album(id: $id) {
      isFavorite
    }
  }
`

const favoriteTemplate = (query) => gql`
  mutation ${query}Favorite ($id: String!) {
    ${query}Favorite(albumId: $id)
  }
`
const addFavorite = favoriteTemplate('add')
const removeFavorite = favoriteTemplate('remove')

export default function AddFavoriteButton(props) {
  const { id, t } = props

  const [loadingMutate, setLoading] = useState(false)
  const { data, loading: loadingQuery } = useQuery(favoriteQuery, {
    variables: { id }
  })
  const client = useApolloClient()
  const refresh = useRefresh()

  const loading = loadingQuery || loadingMutate
  const isFavorite = data?.album?.isFavorite ?? false

  function submitFavorite() {
    setLoading(true)

    client
      .mutate({
        mutation: isFavorite ? removeFavorite : addFavorite,
        variables: { id }
      })
      .then(() =>
        toast.success(t[isFavorite ? 'Favorite_Removed' : 'Favorite_Added'])
      )
      .catch((err) => {
        console.log(err)
        toast.error('Query failed')
      })
      .finally(() => {
        setLoading(false)
        refresh()
      })
  }

  return (
    <button
      type='button'
      disabled={loading}
      className='w-100 rounded-3 btn btn-outline-light'
      onClick={submitFavorite}
    >
      <Loading loading={loading}>
        {t[isFavorite ? 'Favorite_Remove' : 'Favorite_Add']}
      </Loading>
    </button>
  )
}
