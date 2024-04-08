import { gql } from '@apollo/client'
import { NextIntlClientProvider } from 'next-intl'
import { getTranslations } from 'next-intl/server'

import { getClient } from '@/next/utils/ApolloSSRClient'
import { getMessageObject } from '@/next/utils/transl'

import AddFavoriteButton from './AddFavoriteButton'

const favoriteQuery = gql`
  query IsFavorite($id: ID!) {
    album(id: $id) {
      isFavorite
    }
  }
`

export default async function FavoriteSection(props) {
  const { id } = props
  const { data } = await getClient().query({
    query: favoriteQuery,
    variables: { id }
  })
  const tFav = await getTranslations('albumPage.favorite')
  const isFavorite = data.album.isFavorite ?? false

  return (
    <NextIntlClientProvider
      messages={getMessageObject(tFav, [
        'Favorite_Add',
        'Favorite_Remove',
        'Favorite_Added',
        'Favorite_Removed',
        'Favorite_Error_Add',
        'Favorite_Error_Remove'
      ])}
    >
      <AddFavoriteButton id={id} isFavorite={isFavorite} />
    </NextIntlClientProvider>
  )
}
