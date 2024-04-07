'use client'
import { useFormState } from 'react-dom'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

import { toggleFavorite } from '@/actions/albumPage'

import PendingButton from '../common/PendingButton'

export default function AddFavoriteButton(props) {
  const { id, isFavorite } = props

  const t = useTranslations('')
  const [state, formAction] = useFormState(toggleFavorite, { ok: null })

  useEffect(() => {
    if (state.ok === null) return
    if (state.ok)
      toast.success(t(isFavorite ? 'Favorite_Added' : 'Favorite_Removed'))
    else {
      console.log(state.error)
      toast.error(t(`Favorite_Error_${isFavorite ? 'Remove' : 'Add'}`))
    }
  }, [state])

  return (
    <form action={formAction}>
      <input hidden name='id' value={id} required readOnly />
      <input
        hidden
        name='current'
        type='checkbox'
        checked={isFavorite}
        required
        readOnly
      />
      <PendingButton
        type='submit'
        className='w-100 rounded-3 btn-outline-light'
      >
        {t(isFavorite ? 'Favorite_Remove' : 'Favorite_Add')}
      </PendingButton>
    </form>
  )
}
