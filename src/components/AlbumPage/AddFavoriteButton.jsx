import { gql } from '@apollo/client'
import { getTranslations } from 'next-intl/server'

import { getClient } from '@/next/lib/ApolloSSRClient'
import { toggleFavorite } from '@/actions/albumPage'

import FormLoading from '@/next/components/shared/FormLoading'

const favoriteQuery = gql`
  query IsFavorite ($id: ID!) {
    album(id: $id){
        isFavorite
    }
  }
`

export default async function AddFavoriteButton (props) {
  const { id } = props

  const { data } = await getClient().query({ query: favoriteQuery, variables: { id } })
  const t = await getTranslations('albumPage.favorite')

  const isFavorite = data.album.isFavorite ?? false

  return (
    <form action={toggleFavorite}>
      <input hidden name='id' value={id} required readOnly />
      <input hidden name='current' type='checkbox' checked={isFavorite} required readOnly />
      <button type="submit" className="w-100 rounded-3 btn btn-outline-light">
        <FormLoading>
          {t(isFavorite ? 'Favorite_Remove' : 'Favorite_Add')}
        </FormLoading>
      </button>
    </form>
  )
}
