import { Fragment } from 'react'
// eslint-disable-next-line camelcase
import { unstable_setRequestLocale } from 'next-intl/server'

import { AlbumBoxList } from '@/components/AlbumBoxes'
import LetterList from '@/next/components/common/LetterList'

import { gql } from '@/next/__generated__'
import { getClient } from '@/next/utils/ApolloSSRClient'
import type { PageContext } from '@/next/types'

const query = gql(`
  query AnimList {
    animations {
      id
      title
      subTitle
      placeholder
    }
  }
`)

export const dynamic = 'force-dynamic'

export default async function AnimList(context: PageContext) {
  const { params } = context
  const { locale } = params

  unstable_setRequestLocale(locale)

  const client = await getClient()
  const { data } = await client.query({ query })
  const { animations } = data

  const sorted = {}
  animations.forEach((animation) => {
    if (!animation) return

    const title = animation.title ?? ''
    const letter = title[0].toUpperCase()

    if (!sorted[letter]) sorted[letter] = [animation]
    else sorted[letter].push(animation)

    if (animation.subTitle) {
      const letter2 = animation.subTitle[0].toUpperCase()
      if (letter !== letter2) {
        if (!sorted[letter2]) sorted[letter2] = [animation]
        else sorted[letter2].push(animation)
      }
    }
  })

  const letters = Object.keys(sorted).sort()

  return (
    <div className='bg-dark col p-3'>
      <div className='row'>
        <div className='col'>
          <LetterList letters={letters} />
        </div>
      </div>
      {letters.map((letter) => (
        <Fragment key={letter}>
          <div className='row mt-3'>
            <div className='col col-12'>
              <div className='divider' />
              <h2 id={letter} className='py-2 m-0'>
                {letter.toUpperCase()}
              </h2>
              <div className='divider' />
            </div>
          </div>

          <div className='row justify-content-center py-2'>
            <AlbumBoxList
              type='anim'
              height={150}
              width={100}
              colProps={{ md: 2, xs: 6 }}
              items={sorted[letter].map(
                ({ id, title, subTitle, placeholder }) => ({
                  id,
                  title: title[0].toUpperCase() === letter ? title : subTitle,
                  placeholder
                })
              )}
            />
          </div>
        </Fragment>
      ))}
    </div>
  )
}
